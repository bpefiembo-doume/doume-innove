import { useEffect, useRef } from 'react'
import L from 'leaflet'

const PROJECTS = [
  { id: 1, title: "Ferme Avicole Modernisee", entrepreneur: "Marie Abanda", location: "Quartier Kempong", lat: 4.2320, lng: 13.4470 },
  { id: 2, title: "Plantation de Cacao Bio", entrepreneur: "Paul Ngono", location: "Nkoum", lat: 4.2180, lng: 13.4350 },
  { id: 3, title: "Atelier de Menuiserie", entrepreneur: "Francoise Bella", location: "Doume-centre", lat: 4.2253, lng: 13.4456 },
  { id: 4, title: "Transformation Huile de Palme", entrepreneur: "Jean Essomba", location: "Quartier Mbama1", lat: 4.2290, lng: 13.4500 },
  { id: 5, title: "Cybercafe et Formation", entrepreneur: "Alice Mendo", location: "Centre-Doume", lat: 4.2253, lng: 13.4456 },
  { id: 6, title: "Ecotourisme Foret Est", entrepreneur: "Robert Biya", location: "Loumbou", lat: 4.2150, lng: 13.4600 },
]

export default function Map() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (mapInstanceRef.current) return

    mapInstanceRef.current = L.map(mapRef.current).setView([4.2253, 13.4456], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap'
    }).addTo(mapInstanceRef.current)

    PROJECTS.forEach(project => {
      L.marker([project.lat, project.lng])
        .addTo(mapInstanceRef.current)
        .bindPopup(`
          <b>${project.title}</b><br>
          👤 ${project.entrepreneur}<br>
          📍 ${project.location}
        `)
    })

    return () => {
      mapInstanceRef.current.remove()
      mapInstanceRef.current = null
    }
  }, [])

  return <div ref={mapRef} style={{ height: '450px', width: '100%', borderRadius: '12px' }} />
}