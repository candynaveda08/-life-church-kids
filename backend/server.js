/* global process */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import Lesson from "./models/Lesson.js";
import User from "./models/User.js";

dotenv.config();
const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;
const app = express();


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Life Church Kids API funcionando");
});

// Obtener todas las lecciones
app.get("/api/lessons", async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({
      createdAt: -1,
    });

    res.json(lessons);
  } catch (error) {
    console.error("ERROR OBTENIENDO LECCIONES:", error);

    res.status(500).json({
      message: "Error obteniendo las lecciones",
    });
  }
});

// Generar una lección completa con IA
app.post("/api/generate-lesson", async (req, res) => {
  try {
    const { title, theme } = req.body;

    const topic = theme || title;

    if (!topic) {
      return res.status(400).json({
        message: "Escribe un tema o versículo para preparar la lección",
      });
    }

    const prompt = `
Eres un maestro cristiano especializado en ministerio infantil.

Prepara una lección bíblica completa basada EXCLUSIVAMENTE en estos datos:

TÍTULO DE LA LECCIÓN:
${title}

TEMA PRINCIPAL:
${theme}

REGLAS IMPORTANTES:
- Respeta exactamente el título escrito por el maestro.
- Respeta el tema principal escrito por el maestro.
- Toda la historia bíblica debe corresponder al título.
- NO cambies la historia por otra historia bíblica.
- Si el título menciona un personaje bíblico, usa ese personaje.
- El versículo, historia, explicación, preguntas, actividad y oración deben estar relacionados con esa misma lección.
- Cada semana el título y el tema pueden ser diferentes. Usa siempre los datos recibidos actualmente.
- Usa lenguaje sencillo y apropiado para niños.

Devuelve SOLAMENTE JSON válido con esta estructura:

{
  "title": "Título de la lección",
  "theme": "Tema principal",
  "verse": "Versículo para memorizar",
  "bibleStory": "Historia bíblica explicada para niños",
  "explanation": "Explicación sencilla para los niños",
  "questions": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4"
  ],
  "activity": "Actividad o juego relacionado con la historia",
  "prayer": "Oración corta para finalizar"
}
`;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    const text =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";

    const generatedLesson = JSON.parse(text);

    res.json({
      title: generatedLesson.title || "",
      theme: generatedLesson.theme || "",
      verse: generatedLesson.verse || "",
      bibleStory: generatedLesson.bibleStory || "",
      explanation: generatedLesson.explanation || "",
      questions: Array.isArray(generatedLesson.questions)
        ? generatedLesson.questions
        : [],
      activity: generatedLesson.activity || "",
      prayer: generatedLesson.prayer || "",
    });
  } catch (error) {
    console.error("ERROR GENERANDO CON GEMINI:", error);

    res.status(500).json({
      message: "No se pudo generar la lección con IA",
    });
  }
});
// Generar un dibujo bíblico para colorear
app.post("/api/generate-coloring", async (req, res) => {
  try {
    const { title, theme, bibleStory } = req.body;

    if (!openai) {
      return res.status(503).json({
        message: "Falta configurar OPENAI_API_KEY en el servidor.",
      });
    }

    const tema = bibleStory || theme || title;

    if (!tema) {
      return res.status(400).json({
        message: "Escribe el tema de la lección.",
      });
    }

    const resultado = await openai.images.generate({
      model: "gpt-image-1",
      prompt: `
        Crea una página para colorear para niños de una iglesia cristiana.
        Historia bíblica: ${tema}.
        Dibujo educativo, líneas negras gruesas,
        fondo completamente blanco, sin colores,
        sin sombras, sin letras y sin texto.
        Diseño sencillo para niños de 4 a 10 años.
      `,
      size: "1024x1024",
    });

    const imagen = resultado.data?.[0]?.b64_json;

    if (!imagen) {
      throw new Error("No se recibió el dibujo.");
    }

    res.json({
      dibujo: `data:image/png;base64,${imagen}`,
    });
  } catch (error) {
    console.error("Error generando dibujo:", error);
    res.status(500).json({
      message: "No se pudo generar el dibujo.",
    });
  }
});

// Guardar una nueva lección

app.post("/api/lessons", async (req, res) => {
  try {
    console.log("Datos recibidos:", req.body);

    const newLesson = new Lesson({
      date: req.body.date,
      teacher: req.body.teacher,
      title: req.body.title,

      theme: req.body.theme || "",
      fullLessonText: req.body.fullLessonText || "",

      bibleStory: req.body.bibleStory || "",

      verse: req.body.verse || "",

      explanation: req.body.explanation || "",

      questions: req.body.questions || [],

      activity: req.body.activity || "",

      prayer: req.body.prayer || "",

      video: req.body.video || "",

      songs: req.body.songs || [],

      dibujo: req.body.dibujo || "",
    });

    const savedLesson = await newLesson.save();

    res.status(201).json(savedLesson);
  } catch (error) {
    console.error("ERROR GUARDANDO LECCION:", error);

    res.status(500).json({
      message: "Error guardando la lección",
      error: error.message,
    });
  }
});

const PORT = process.env.PORT || 5001;
app.delete("/api/lessons/:id", async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);

    if (!lesson) {
      return res.status(404).json({ error: "Lección no encontrada" });
    }

    res.json({ message: "Lección eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose
  
  // LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Usuario incorrecto",
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Clave incorrecta",
      });
    }

    res.json({
      success: true,
      message: "Acceso correcto",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
});

// CAMBIAR CLAVE
app.post("/api/change-password", async (req, res) => {
  try {
    const { username, currentPassword, newPassword } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Usuario no encontrado",
      });
    }

    if (user.password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: "La clave actual es incorrecta",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Clave cambiada correctamente",
    });
  } catch {
    res.status(500).json({
      success: false,
      message: "Error en el servidor",
    });
  }
});

// GUARDAR O ACTUALIZAR CUENTA
app.post("/api/register", async (req, res) => {
  console.log("ENTRO A /api/register");
  try {
    const { username, email, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Usuario y clave son obligatorios.",
      });
    }

    let user = await User.findOne({ username });

    if (user) {
      user.email = email;
      user.password = password;
      await user.save();

      return res.json({
        success: true,
        message: "Cuenta actualizada correctamente.",
      });
    }

    user = new User({
      username,
      email,
      password,
    });

    await user.save();

    res.json({
      success: true,
      message: "Cuenta guardada correctamente.",
    });
  } catch (error) {
    console.error("Error guardando cuenta:", error);

    res.status(500).json({
      success: false,
      message: "Error en el servidor.",
    });
  }
});
  mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado");

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error conectando a MongoDB:", error);
  });