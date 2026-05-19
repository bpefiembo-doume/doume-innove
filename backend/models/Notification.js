const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  destinataire: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['approbation', 'rejet', 'mise_en_relation', 'rappel'], default: 'approbation' },
  lu: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model('Notification', NotificationSchema)