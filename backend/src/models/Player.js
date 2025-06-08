import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ra: { type: String, required: true, unique: true },
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
