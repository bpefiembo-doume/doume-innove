const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// POST inscription
router.post('/inscription', async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    // Vérifier si l'email existe déjà
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email déjà utilisé' })

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12)

    // Créer l'utilisateur
    const user = new User({ name, email, password: hashedPassword, role })
    await user.save()

    // Créer le token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

// POST connexion
router.post('/connexion', async (req, res) => {
  try {
    const { email, password } = req.body

    // Vérifier si l'utilisateur existe
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Email ou mot de passe incorrect' })

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ message: 'Email ou mot de passe incorrect' })

    // Créer le token JWT
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '24h' })

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur', error: err.message })
  }
})

module.exports = router