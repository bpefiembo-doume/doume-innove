const express = require('express')
const router = express.Router()
const Projet = require('../models/Projet')
const User = require('../models/User')
const Notification = require('../models/Notification')
const authMiddleware = require('../middleware/auth')

// Middleware admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Accès refusé' })
  next()
}

// GET tableau de bord
router.get('/dashboard', authMiddleware, isAdmin, async (req, res) => {
  try {
    const totalProjets = await Projet.countDocuments()
    const totalUsers = await User.countDocuments()
    const projetsEnAttente = await Projet.countDocuments({ status: 'En recherche de financement' })
    const projetsFinances = await Projet.countDocuments({ status: 'Finance' })

    res.json({ totalProjets, totalUsers, projetsEnAttente, projetsFinances })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// GET tous les projets (admin)
router.get('/projets', authMiddleware, isAdmin, async (req, res) => {
  try {
    const projets = await Projet.find().sort({ createdAt: -1 })
    res.json(projets)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// PUT approuver un projet
router.put('/projets/:id/approuver', authMiddleware, isAdmin, async (req, res) => {
  try {
    const projet = await Projet.findByIdAndUpdate(req.params.id, { status: 'Finance' }, { new: true })
    res.json({ message: 'Projet approuvé !', projet })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// PUT rejeter un projet
router.put('/projets/:id/rejeter', authMiddleware, isAdmin, async (req, res) => {
  try {
    const projet = await Projet.findByIdAndUpdate(req.params.id, { status: 'En recherche de financement' }, { new: true })
    res.json({ message: 'Projet rejeté', projet })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// GET tous les utilisateurs (admin)
router.get('/users', authMiddleware, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 })
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// DELETE supprimer un utilisateur
router.delete('/users/:id', authMiddleware, isAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.json({ message: 'Utilisateur supprimé' })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router