const express = require('express')
const router = express.Router()

let projets = [
  { id: 1, title: "Ferme Avicole Modernisee", entrepreneur: "Marie Abanda", sector: "Elevage", status: "En recherche de financement", amount: 2500000, location: "Quartier Kempong", lat: 4.2320, lng: 13.4470 },
  { id: 2, title: "Plantation de Cacao Bio", entrepreneur: "Paul Ngono", sector: "Agriculture", status: "Partiellement finance", amount: 4800000, location: "Nkoum", lat: 4.2180, lng: 13.4350 },
  { id: 3, title: "Atelier de Menuiserie", entrepreneur: "Francoise Bella", sector: "Artisanat", status: "Finance", amount: 1200000, location: "Doume-centre", lat: 4.2253, lng: 13.4456 },
  { id: 4, title: "Transformation Huile de Palme", entrepreneur: "Jean Essomba", sector: "Agro-alimentaire", status: "En cours de realisation", amount: 3200000, location: "Quartier Mbama1", lat: 4.2290, lng: 13.4500 },
  { id: 5, title: "Cybercafe et Formation", entrepreneur: "Alice Mendo", sector: "Numerique", status: "En recherche de financement", amount: 950000, location: "Centre-Doume", lat: 4.2253, lng: 13.4456 },
  { id: 6, title: "Ecotourisme Foret Est", entrepreneur: "Robert Biya", sector: "Tourisme", status: "En recherche de financement", amount: 6500000, location: "Loumbou", lat: 4.2150, lng: 13.4600 },
]

router.get('/', (req, res) => { res.json(projets) })
router.get('/:id', (req, res) => {
  const projet = projets.find(p => p.id === parseInt(req.params.id))
  if (!projet) return res.status(404).json({ message: 'Projet non trouvé' })
  res.json(projet)
})
router.post('/', (req, res) => {
  const newProjet = { id: projets.length + 1, ...req.body }
  projets.push(newProjet)
  res.status(201).json(newProjet)
})
router.put('/:id', (req, res) => {
  const index = projets.findIndex(p => p.id === parseInt(req.params.id))
  if (index === -1) return res.status(404).json({ message: 'Projet non trouvé' })
  projets[index] = { ...projets[index], ...req.body }
  res.json(projets[index])
})
router.delete('/:id', (req, res) => {
  projets = projets.filter(p => p.id !== parseInt(req.params.id))
  res.json({ message: 'Projet supprimé' })
})

module.exports = router