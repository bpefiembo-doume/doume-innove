const mongoose = require('mongoose')

const ProjetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  entrepreneur: { type: String, required: true },
  sector: { type: String, required: true },
  status: { type: String, enum: ['En recherche de financement', 'Partiellement finance', 'Finance', 'En cours de realisation'], default: 'En recherche de financement' },
  amount: { type: Number, required: true },
  summary: { type: String },
  location: { type: String },
  lat: { type: Number },
  lng: { type: Number },
  views: { type: Number, default: 0 },
  interests: { type: Number, default: 0 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = mongoose.model('Projet', ProjetSchema)