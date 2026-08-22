import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
    },

    teacher: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    theme: {
      type: String,
      default: "",
    },

    bibleStory: {
      type: String,
      default: "",
    },

    verse: {
      type: String,
      default: "",
    },

    explanation: {
      type: String,
      default: "",
    },

    questions: {
      type: [String],
      default: [],
    },

    activity: {
      type: String,
      default: "",
    },

    prayer: {
      type: String,
      default: "",
    },

    video: {
      type: String,
      default: "",
    },

    songs: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Lesson = mongoose.model("Lesson", lessonSchema);

export default Lesson;