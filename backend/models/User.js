const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['entrepreneur', 'investisseur', 'admin'], default: 'entrepreneur' },
  statut: { type: String, enum: ['en_attente', 'approuve', 'rejete'], default: 'en_attente' },
}, { timestamps: true })

module.exports = mongoose.model('User', UserSchema)