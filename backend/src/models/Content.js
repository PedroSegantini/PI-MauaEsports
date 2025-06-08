import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
  containerId: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
  },
  subtitulo: {
    type: String,
  },
  paragrafo: {
    type: String,
  },
});

const Content = mongoose.model("Content", contentSchema, "contents");

export default Content;
