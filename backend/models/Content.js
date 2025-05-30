// backend/models/contentModel.js
import mongoose from "mongoose";

// 1. Defina o Schema que corresponde aos seus dados existentes
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

// 2. Crie o Model. O Mongoose irá automaticamente vincular
// o modelo "Content" à coleção "contents" no banco de dados.
const Content = mongoose.model('Content', contentSchema, 'contents');

export default Content;