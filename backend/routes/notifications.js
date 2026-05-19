const express = require('express')
const router = express.Router()
const Notification = require('../models/Notification')
const authMiddleware = require('../middleware/auth')

// GET toutes les notifications de l'utilisateur connecté
router.get('/', authMiddleware, async (req, res) => {
  try {
    const notifications = await Notification.find({ destinataire: req.user.id }).sort({ createdAt: -1 })
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// PUT marquer une notification comme lue
router.put('/:id/lire', authMiddleware, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(req.params.id, { lu: true }, { new: true })
    res.json(notification)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// PUT marquer toutes comme lues
router.put('/lire-tout', authMiddleware, async (req, res) => {
  try {
    await Notification.updateMany({ destinataire: req.user.id, lu: false }, { lu: true })
    res.json({ message: 'Toutes les notifications marquées comme lues' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router