const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const projetsRouter = require('./routes/projets')
const authRouter = require('./routes/auth')
const notificationsRouter = require('./routes/notifications')
const adminRouter = require('./routes/admin')

const app = express()
const PORT = process.env.PORT || 5000

// Middlewares
app.use(cors())
app.use(express.json())

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connecté !'))
  .catch((err) => console.error('❌ Erreur MongoDB :', err))

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenue sur le serveur Doumé Innove ! 🌍' })
})
app.use('/api/projets', projetsRouter)
app.use('/api/auth', authRouter)
app.use('/api/notifications', notificationsRouter)
app.use('/api/admin', adminRouter)

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`)
})