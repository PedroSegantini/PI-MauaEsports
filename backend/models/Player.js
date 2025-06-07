// import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// const playerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   ra: { type: String, required: true, unique: true },
//   discordId: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: {
//     type: String,
//     enum: ['player', 'captain', 'admin'],
//     default: 'player'
//   }
// });

// // Criptografa a senha antes de salvar o usuário
// playerSchema.pre('save', async function(next) {
//   if (!this.isModified('password')) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// // Método para comparar a senha enviada com a senha no banco de dados
// playerSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// const Player = mongoose.model('Player', playerSchema);

// export default Player;