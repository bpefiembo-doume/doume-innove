import axios from 'axios'

const API = axios.create({
  baseURL: 'https://doume-innove-cm.vercel.app/api'
})

// Ajouter le token JWT automatiquement
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const getProjets = () => API.get('/projets')
export const getProjet = (id) => API.get(`/projets/${id}`)
export const createProjet = (data) => API.post('/projets', data)
export const inscription = (data) => API.post('/auth/inscription', data)
export const connexion = (data) => API.post('/auth/connexion', data)
export const getNotifications = () => API.get('/notifications')
export const lireNotification = (id) => API.put(`/notifications/${id}/lire`)

export default API