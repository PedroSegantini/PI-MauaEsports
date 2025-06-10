import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: false },
  ra: { type: String, required: true, unique: true },
  modalityId: { type: String, required: true },
  discordId: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["player", "captain", "admin"],
    default: "player",
  },
  email: { type: String, required: true, unique: true },
});

const Player = mongoose.model("Player", playerSchema);

export default Player;
