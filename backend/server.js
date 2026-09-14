/* global process */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import Lesson from "./models/Lesson.js";

dotenv.config();

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