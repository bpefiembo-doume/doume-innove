import { useState, useEffect } from 'react'
import { getProjets } from './api'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Carte from './pages/Carte'
import Soumettre from './pages/Soumettre'
import Projet from './pages/Projet'
import Investisseurs from './pages/Investisseurs'
import APropos from './pages/APropos'
import Map from './components/Map';
const SECTORS = ["Tous", "Agriculture", "Elevage", "Artisanat", "Commerce", "Agro-alimentaire", "Services", "Tourisme", "Numerique"];

const STATUS_CONFIG = {
  "En recherche de financement": { color: "#F97316", bg: "#FFF7ED" },
  "Partiellement finance":       { color: "#3B82F6", bg: "#EFF6FF" },
  "Finance":                     { color: "#22C55E", bg: "#F0FDF4" },
  "En cours de realisation":     { color: "#A855F7", bg: "#FAF5FF" },
};

const PROJECTS = [
  {
    id: 1,
    title: "Ferme Avicole Modernisee",
    entrepreneur: "Marie Abanda",
    sector: "Elevage",
    status: "En recherche de financement",
    amount: 2500000,
    summary: "Elevage de 5 000 poulets de chair avec equipements modernes d alimentation automatique.",
    views: 142,
    interests: 8,
    location: "Quartier Kempong", lat: 4.2320, lng: 13.4470,
  },
  {
    id: 2,
    title: "Plantation de Cacao Bio",
    entrepreneur: "Paul Ngono",
    sector: "Agriculture",
    status: "Partiellement finance",
    amount: 4800000,
    summary: "5 hectares de cacao certifie biologique destine a l exportation vers l Europe.",
    views: 289,
    interests: 14,
   location: "Nkoum", lat: 4.2180, lng: 13.4350,
  },
  {
    id: 3,
    title: "Atelier de Menuiserie",
    entrepreneur: "Francoise Bella",
    sector: "Artisanat",
    status: "Finance",
    amount: 1200000,
    summary: "Fabrication de meubles traditionnels et modernes avec essences locales de la foret.",
    views: 96,
    interests: 5,
    location: "Doume-centre", lat: 4.2253, lng: 13.4456,
  },
  {
    id: 4,
    title: "Transformation Huile de Palme",
    entrepreneur: "Jean Essomba",
    sector: "Agro-alimentaire",
    status: "En cours de realisation",
    amount: 3200000,
    summary: "Mini-huilerie artisanale produisant 500 litres par jour d huile de palme rouge.",
    views: 211,
    interests: 11,
    location: "Quartier Mbama1", lat: 4.2290, lng: 13.4500,
  },
  {
    id: 5,
    title: "Cybercafe et Formation",
    entrepreneur: "Alice Mendo",
    sector: "Numerique",
    status: "En recherche de financement",
    amount: 950000,
    summary: "Espace numerique avec 10 postes et formations bureautique pour les jeunes.",
    views: 178,
    interests: 9,
    location: "Centre-Doume", lat: 4.2253, lng: 13.4456,
  },
  {
    id: 6,
    title: "Ecotourisme Foret Est",
    entrepreneur: "Robert Biya",
    sector: "Tourisme",
    status: "En recherche de financement",
    amount: 6500000,
    summary: "Circuits guides en foret tropicale avec hebergement en lodges ecologiques.",
    views: 334,
    interests: 19,
    location: "Loumbou", lat: 4.2150, lng: 13.4600,
  },
];

function formatFCFA(n) {
  return n.toLocaleString("fr-FR") + " FCFA";
}

export default function App() {
  var searchState = useState("");
  var search = searchState[0];
  var setSearch = searchState[1];

  var sectorState = useState("Tous");
  var sector = sectorState[0];
  var setSector = sectorState[1];

  var selectedState = useState(null);
  var selected = selectedState[0];
  var setSelected = selectedState[1];

  var showFormState = useState(false);
  const [showCarte, setShowCarte] = useState(false)
const [showInvestisseurs, setShowInvestisseurs] = useState(false)
const [showAPropos, setShowAPropos] = useState(false)
  var showForm = showFormState[0];
  var setShowForm = showFormState[1];

  var stepState = useState(1);
  var step = stepState[0];
  var setStep = stepState[1];

  var formDataState = useState({ name: "", phone: "", email: "", projectName: "", sectorForm: "", description: "", amount: "", location: "" });
  var formData = formDataState[0];
  var setFormData = formDataState[1];

  var submittedState = useState(false);
  var submitted = submittedState[0];
  var setSubmitted = submittedState[1];

  var filtered = PROJECTS.filter(function(p) {
    var matchSector = sector === "Tous" || p.sector === sector;
    var matchSearch = p.title.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
      p.entrepreneur.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    return matchSector && matchSearch;
  });

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.successBox}>
          <h2 style={styles.successTitle}>Projet soumis avec succes !</h2>
          <p style={styles.successSub}>Votre numero de suivi :</p>
          <div style={styles.trackingNum}>DI-2025-1234</div>
          <p style={{ color: "#6B7280", marginBottom: 24 }}>
            Vous recevrez une confirmation apres validation.
          </p>
          <button style={styles.btnPrimary} onClick={function() { setSubmitted(false); setShowForm(false); setStep(1); }}>
            Retour accueil
          </button>
        </div>
      </div>
    );
  }

  if (showForm) {
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.logo}>Doume Innove</div>
          <button style={styles.btnOutline} onClick={function() { setShowForm(false); setStep(1); }}>
            Retour
          </button>
        </header>
        <div style={styles.formContainer}>
          <h2 style={styles.formTitle}>Soumettre votre projet</h2>
          <div style={styles.stepBar}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= 1 ? "#16A34A" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>1</div>
            <div style={{ width: 40, height: 2, background: step > 1 ? "#16A34A" : "#E5E7EB" }} />
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= 2 ? "#16A34A" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>2</div>
            <div style={{ width: 40, height: 2, background: step > 2 ? "#16A34A" : "#E5E7EB" }} />
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= 3 ? "#16A34A" : "#E5E7EB", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700 }}>3</div>
          </div>

          {step === 1 && (
            <div style={styles.formStep}>
              <label style={styles.label}>Nom complet</label>
              <input style={styles.input} placeholder="Ex: Marie Abanda" value={formData.name} onChange={function(e) { setFormData({ name: e.target.value, phone: formData.phone, email: formData.email, projectName: formData.projectName, sectorForm: formData.sectorForm, description: formData.description, amount: formData.amount, location: formData.location }); }} />
              <label style={styles.label}>Telephone</label>
              <input style={styles.input} placeholder="+237 686842085" value={formData.phone} onChange={function(e) { setFormData({ name: formData.name, phone: e.target.value, email: formData.email, projectName: formData.projectName, sectorForm: formData.sectorForm, description: formData.description, amount: formData.amount, location: formData.location }); }} />
              <label style={styles.label}>Email</label>
              <input style={styles.input} placeholder="votre@email.com" value={formData.email} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: e.target.value, projectName: formData.projectName, sectorForm: formData.sectorForm, description: formData.description, amount: formData.amount, location: formData.location }); }} />
              <button style={{ background: "#16A34A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, cursor: "pointer", fontSize: 14, marginTop: 16 }} onClick={function() { setStep(2); }}>Continuer</button>
            </div>
          )}

          {step === 2 && (
            <div style={styles.formStep}>
              <label style={styles.label}>Nom du projet</label>
              <input style={styles.input} placeholder="Ex: Ferme Avicole" value={formData.projectName} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: formData.email, projectName: e.target.value, sectorForm: formData.sectorForm, description: formData.description, amount: formData.amount, location: formData.location }); }} />
              <label style={styles.label}>Secteur</label>
              <select style={styles.input} value={formData.sectorForm} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: formData.email, projectName: formData.projectName, sectorForm: e.target.value, description: formData.description, amount: formData.amount, location: formData.location }); }}>
                <option value="">-- Choisir --</option>
                {SECTORS.slice(1).map(function(s) { return <option key={s} value={s}>{s}</option>; })}
              </select>
              <label style={styles.label}>Description</label>
              <textarea style={{ padding: "10px 14px", borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box", height: 100 }} placeholder="Decrivez votre projet..." value={formData.description} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: formData.email, projectName: formData.projectName, sectorForm: formData.sectorForm, description: e.target.value, amount: formData.amount, location: formData.location }); }} />
              <label style={styles.label}>Montant (FCFA)</label>
              <input style={styles.input} type="number" placeholder="Ex: 2500000" value={formData.amount} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: formData.email, projectName: formData.projectName, sectorForm: formData.sectorForm, description: formData.description, amount: e.target.value, location: formData.location }); }} />
              <label style={styles.label}>Localisation</label>
              <input style={styles.input} placeholder="Ex: Quartier Mvan" value={formData.location} onChange={function(e) { setFormData({ name: formData.name, phone: formData.phone, email: formData.email, projectName: formData.projectName, sectorForm: formData.sectorForm, description: formData.description, amount: formData.amount, location: e.target.value }); }} />
              <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
                <button style={styles.btnOutline} onClick={function() { setStep(1); }}>Retour</button>
                <button style={styles.btnPrimary} onClick={function() { setStep(3); }}>Continuer</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={styles.formStep}>
              <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 12, padding: 20, marginBottom: 16 }}>
                <h4 style={{ margin: "0 0 12px", color: "#16A34A" }}>Recapitulatif</h4>
                <p><b>Nom :</b> {formData.name || "---"}</p>
                <p><b>Telephone :</b> {formData.phone || "---"}</p>
                <p><b>Projet :</b> {formData.projectName || "---"}</p>
                <p><b>Secteur :</b> {formData.sectorForm || "---"}</p>
                <p><b>Montant :</b> {formData.amount ? formatFCFA(+formData.amount) : "---"}</p>
                <p><b>Localisation :</b> {formData.location || "---"}</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <button style={styles.btnOutline} onClick={function() { setStep(2); }}>Retour</button>
                <button style={styles.btnPrimary} onClick={function() { setSubmitted(true); }}>Soumettre</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (selected) {
    var cfg = STATUS_CONFIG[selected.status] || { color: "#374151", bg: "#F3F4F6" };
    return (
      <div style={styles.page}>
        <header style={styles.header}>
          <div style={styles.logo}>Doume Innove</div>
          <button style={styles.btnOutline} onClick={function() { setSelected(null); }}>Retour</button>
        </header>
        <div style={{ maxWidth: 780, margin: "0 auto", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
              <span style={{ background: "#F3F4F6", color: "#374151", padding: "2px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{selected.sector}</span>
              <span style={{ background: cfg.bg, color: cfg.color, padding: "2px 10px", borderRadius: 20, fontSize: 13, fontWeight: 600 }}>{selected.status}</span>
            </div>
            <h1 style={{ fontSize: 30, fontWeight: 900, margin: "0 0 8px" }}>{selected.title}</h1>
            <p style={{ color: "#6B7280", marginBottom: 20 }}>{selected.entrepreneur} - {selected.location}</p>
            <p style={{ color: "#4B5563", lineHeight: 1.7, marginBottom: 24 }}>{selected.summary}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#16A34A" }}>{formatFCFA(selected.amount)}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Investissement</div>
              </div>
              <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#16A34A" }}>{selected.views}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Vues</div>
              </div>
              <div style={{ background: "#F9FAFB", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 800, color: "#16A34A" }}>{selected.interests}</div>
                <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>Interets</div>
              </div>
            </div>
            <button style={styles.btnPrimary}>Manifester mon interet</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/carte" element={<Carte />} />
  <Route path="/soumettre" element={<Soumettre />} />
  <Route path="/projet/:id" element={<Projet />} />
</Routes>
      <header style={styles.header}>
        <div style={styles.logo}>Doume Innove</div>
        <nav style={{ display: "flex", gap: 24 }}>
          <a style={styles.navLink} href="#">Projets</a>
         <Link style={styles.navLink} to="/carte">Carte</Link>
          <a style={styles.navLink} href="#" onClick={(e) => { e.preventDefault(); setShowInvestisseurs(!showInvestisseurs); }}>Investisseurs</a>
          <a style={styles.navLink} href="#" onClick={(e) => { e.preventDefault(); setShowAPropos(!showAPropos); }}>A propos</a>
        </nav>
        <button style={styles.btnPrimary} onClick={function() { setShowForm(true); }}>+ Soumettre un projet</button>
      </header>
      {showCarte && <div style={{ padding: 24 }}><Map /></div>}
{showInvestisseurs && <Investisseurs />}
{showAPropos && <APropos />}

      <section style={{ background: "linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 60%, #fff 100%)", padding: "72px 24px", textAlign: "center" }}>
        <div style={{ display: "inline-block", background: "#BBF7D0", color: "#15803D", padding: "4px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, marginBottom: 20 }}>Region de l Est - Cameroun</div>
        <h1 style={{ fontSize: 42, fontWeight: 900, lineHeight: 1.15, margin: "0 0 16px" }}>
          Les entrepreneurs de Doume<br />
          <span style={{ color: "#16A34A" }}>meritent d etre vus</span>
        </h1>
        <p style={{ color: "#4B5563", fontSize: 18, maxWidth: 560, margin: "0 auto 40px" }}>
          Decouvrez, soutenez et financez les projets entrepreneuriaux de la ville de Doume.
        </p>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#fff", borderRadius: 16, padding: "20px 32px", maxWidth: 480, margin: "0 auto", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" }}>
            <b style={{ fontSize: 28, color: "#16A34A" }}>6</b>
            <span style={{ fontSize: 13, color: "#6B7280" }}>Projets publies</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#E5E7EB" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" }}>
            <b style={{ fontSize: 28, color: "#16A34A" }}>8</b>
            <span style={{ fontSize: 13, color: "#6B7280" }}>Secteurs couverts</span>
          </div>
          <div style={{ width: 1, height: 40, background: "#E5E7EB" }} />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 24px" }}>
            <b style={{ fontSize: 28, color: "#16A34A" }}>66</b>
            <span style={{ fontSize: 13, color: "#6B7280" }}>Marques d interet</span>
          </div>
        </div>
      </section>

      <section style={{ padding: "24px 24px 0", maxWidth: 1100, margin: "0 auto" }}>
        <input
          style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 10, border: "1.5px solid #E5E7EB", fontSize: 15, marginBottom: 16, outline: "none" }}
          placeholder="Rechercher un projet, un entrepreneur..."
          value={search}
          onChange={function(e) { setSearch(e.target.value); }}
        />
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
          {SECTORS.map(function(s) {
            return (
              <button
                key={s}
                style={sector === s ? { padding: "6px 16px", borderRadius: 20, border: "1.5px solid #16A34A", background: "#16A34A", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#fff" } : { padding: "6px 16px", borderRadius: 20, border: "1.5px solid #E5E7EB", background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 500, color: "#374151" }}
                onClick={function() { setSector(s); }}
              >
                {s}
              </button>
            );
          })}
        </div>
      </section>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24, padding: "24px", maxWidth: 1100, margin: "0 auto" }}>
        {filtered.length === 0 ? (
          <div style={{ gridColumn: "1/-1", textAlign: "center", color: "#9CA3AF", padding: 48, fontSize: 16 }}>Aucun projet trouve.</div>
        ) : (
          filtered.map(function(p) {
            var c = STATUS_CONFIG[p.status] || { color: "#374151", bg: "#F3F4F6" };
            return (
              <div key={p.id} style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", cursor: "pointer" }} onClick={function() { setSelected(p); }}>
                <div style={{ padding: "20px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                    <span style={{ background: "#F3F4F6", color: "#374151", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{p.sector}</span>
                    <span style={{ background: c.bg, color: c.color, padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{p.status}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 800, margin: "0 0 4px", color: "#111827" }}>{p.title}</h3>
                  <p style={{ fontSize: 13, color: "#6B7280", margin: "0 0 10px" }}>{p.entrepreneur} - {p.location}</p>
                  <p style={{ fontSize: 14, color: "#4B5563", lineHeight: 1.5, margin: "0 0 16px" }}>{p.summary}</p>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #F3F4F6", paddingTop: 12 }}>
                    <span style={{ fontWeight: 700, color: "#16A34A", fontSize: 14 }}>{formatFCFA(p.amount)}</span>
                    <span style={{ color: "#9CA3AF", fontSize: 13 }}>{p.views} vues - {p.interests} interets</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      <footer style={{ textAlign: "center", padding: "40px 24px", borderTop: "1px solid #E5E7EB", marginTop: 40 }}>
        <div style={styles.logo}>Doume Innove</div>
        <p style={{ color: "#9CA3AF", fontSize: 13, margin: "8px 0 0" }}>Ville de Doume - Region de l Est - Cameroun - Version 1.0 - 2025</p>
      </footer>
    </div>
  );
}

const styles = {
  page: { fontFamily: "Segoe UI, sans-serif", background: "#F9FAFB", minHeight: "100vh", color: "#111827" },
  header: { background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 },
  logo: { fontWeight: 800, fontSize: 20, color: "#15803D" },
  navLink: { color: "#374151", textDecoration: "none", fontSize: 15, fontWeight: 500 },
  btnPrimary: { background: "#16A34A", color: "#fff", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  btnOutline: { background: "transparent", color: "#374151", border: "1.5px solid #D1D5DB", borderRadius: 8, padding: "10px 20px", fontWeight: 600, cursor: "pointer", fontSize: 14 },
  formContainer: { maxWidth: 600, margin: "0 auto", padding: 24 },
  formTitle: { fontSize: 24, fontWeight: 800, marginBottom: 24, color: "#111827" },
  stepBar: { display: "flex", alignItems: "center", gap: 8, marginBottom: 32 },
  formStep: { display: "flex", flexDirection: "column", gap: 4 },
  label: { fontSize: 14, fontWeight: 600, color: "#374151", marginTop: 12 },
  input: { padding: "10px 14px", borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 15, outline: "none", width: "100%", boxSizing: "border-box" },
  successBox: { maxWidth: 480, margin: "80px auto", background: "#fff", borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  successTitle: { fontSize: 26, fontWeight: 800, color: "#111827", margin: "16px 0 8px" },
  successSub: { color: "#6B7280", marginBottom: 8 },
  trackingNum: { fontSize: 28, fontWeight: 900, color: "#16A34A", letterSpacing: 2, background: "#F0FDF4", borderRadius: 12, padding: "12px 24px", margin: "0 0 16px" },
};