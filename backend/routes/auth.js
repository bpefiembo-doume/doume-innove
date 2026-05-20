const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// Middleware vérification admin
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'Non autorisé' })
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (decoded.role !== 'admin') return res.status(403).json({ message: 'Accès réservé à l\'admin' })
    req.user = decoded
    next()
  } catch {
    res.status(401).json({ message: 'Token invalide' })
  }
}

// POST inscription
router.post('/inscription', async (req, res) => {
  try {
    const { name, email, password, role } = req.body
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' })
    const hashedPassword = await bcrypt.hash(password, 12)
    const user = new User({ name, email, password: hashedPassword, role, statut: 'en_attente' })
    await user.save()
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, statut: user.statut } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// POST connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect' })
    if (user.statut === 'en_attente') return res.status(403).json({ message: 'Compte en attente d\'approbation par l\'administrateur' })
    if (user.statut === 'rejete') return res.status(403).json({ message: 'Votre compte a été rejeté' })
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role, statut: user.statut } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// GET tous les utilisateurs (admin)
router.get('/users', verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PUT approuver un utilisateur (admin)
router.put('/users/:id/approuver', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { statut: 'approuve' }, { new: true }).select('-password')
    res.json({ message: 'Utilisateur approuvé', user })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

// PUT rejeter un utilisateur (admin)
router.put('/users/:id/rejeter', verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, { statut: 'rejete' }, { new: true }).select('-password')
    res.json({ message: 'Utilisateur rejeté', user })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' })
  }
})

module.exports = router