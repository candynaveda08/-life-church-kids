/* global process */

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";
import Lesson from "./models/Lesson.js";

dotenv.config();

const app = express();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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

    if (!title || !theme) {
      return res.status(400).json({
        message: "El título y el tema son obligatorios",
      });
    }

    const response = await openai.responses.create({
      model: "gpt-5.6-luna",

      input: `
Eres un maestro cristiano especializado en ministerio infantil.

Debes preparar una lección bíblica completa, sencilla,
alegre y apropiada para niños.

Título:
${title}

Tema principal:
${theme}

La lección debe ser fácil de enseñar en una iglesia.

Devuelve solamente JSON válido usando exactamente esta estructura:

{
  "verse": "Versículo bíblico completo con su referencia",
  "bibleStory": "Historia bíblica clara para niños, aproximadamente 250 a 400 palabras",
  "explanation": "Explicación sencilla de lo que los niños deben aprender de esta historia",
  "questions": [
    "Pregunta 1",
    "Pregunta 2",
    "Pregunta 3",
    "Pregunta 4"
  ],
  "activity": "Una actividad o juego sencillo relacionado con la lección",
  "prayer": "Una oración corta que los niños puedan repetir"
}

No uses Markdown.
No agregues texto antes ni después del JSON.
      `,
    });

    const text = response.output_text.trim();

    let generatedLesson;

    try {
      generatedLesson = JSON.parse(text);
    } catch (parseError) {
      console.error("ERROR LEYENDO JSON DE IA:", text);
      throw parseError;
    }

    res.json({
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
    console.error("ERROR GENERANDO CON IA:", error);

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