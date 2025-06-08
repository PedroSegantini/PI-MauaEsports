// src/controllers/content.controller.js

import Content from "../models/Content.js";

export const getAllContent = async (req, res) => {
  try {
    const allContent = await Content.find({});
    if (allContent.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum conteúdo encontrado na coleção." });
    }
    res.status(200).json(allContent);
  } catch (error) {
    res.status(500).json({
      message: "Erro no servidor ao buscar conteúdo.",
      error: error.message,
    });
  }
};

export const updateContent = async (req, res) => {
  try {
    const { containerId } = req.params;
    const updates = req.body;
    const updatedContent = await Content.findOneAndUpdate(
      { containerId: containerId },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!updatedContent) {
      return res.status(404).json({
        message: "Conteúdo não encontrado com o containerId fornecido.",
      });
    }
    res.status(200).json(updatedContent);
  } catch (error) {
    console.error("Erro ao atualizar conteúdo:", error);
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Erro de validação.", errors: error.errors });
    }
    res.status(500).json({
      message: "Erro interno do servidor ao atualizar o conteúdo.",
      error: error.message,
    });
  }
};
