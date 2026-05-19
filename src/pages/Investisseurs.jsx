export default function Investisseurs() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>
      
      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827" }}>
          Investissez dans l'avenir de <span style={{ color: "#16A34A" }}>Doumé</span>
        </h1>
        <p style={{ color: "#4B5563", fontSize: 18, maxWidth: 600, margin: "16px auto" }}>
          Rejoignez notre communauté d'investisseurs et soutenez les entrepreneurs locaux de la région de l'Est Cameroun.
        </p>
      </section>

      {/* AVANTAGES */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>Pourquoi investir à Doumé ?</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { img: "https://cdn-icons-png.flaticon.com/512/2227/2227679.png", titre: "Secteur agricole porteur", desc: "Cacao, huile de palme, élevage — des filières rentables avec fort potentiel." },
            { img: "https://cdn-icons-png.flaticon.com/512/2920/2920277.png", titre: "Rendements attractifs", desc: "Des projets sélectionnés avec soin offrant des retours sur investissement compétitifs." },
            { img: "https://cdn-icons-png.flaticon.com/512/1256/1256650.png", titre: "Impact social réel", desc: "Chaque investissement crée des emplois et améliore les conditions de vie locales." },
            { img: "https://cdn-icons-png.flaticon.com/512/2956/2956744.png", titre: "Projets vérifiés", desc: "Tous les projets sont validés par l'équipe Doumé Innove avant publication." },
            { img: "https://cdn-icons-png.flaticon.com/512/854/854878.png", titre: "Région en développement", desc: "La région de l'Est est l'une des plus prometteuses du Cameroun." },
            { img: "https://cdn-icons-png.flaticon.com/512/3281/3281289.png", titre: "Accompagnement dédié", desc: "Notre équipe vous accompagne à chaque étape de votre investissement." },
          ].map((item, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 16, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
              <img src={item.img} alt={item.titre} style={{ width: 60, height: 60, marginBottom: 12 }} />
              <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#111827" }}>{item.titre}</h3>
              <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INVESTISSEURS */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>Nos investisseurs</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { nom: "Jean-Pierre Mbarga", ville: "Yaoundé", montant: "5 000 000 FCFA", secteur: "Agriculture", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
            { nom: "Marie-Claire Fouda", ville: "Douala", montant: "3 500 000 FCFA", secteur: "Elevage", img: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png" },
            { nom: "Paul Essama", ville: "Bertoua", montant: "8 000 000 FCFA", secteur: "Agro-alimentaire", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
            { nom: "Sophie Nkomo", ville: "Paris", montant: "12 000 000 FCFA", secteur: "Tourisme", img: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png" },
          ].map((inv, i) => (
            <div key={i} style={{ background: "#F9FAFB", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <img src={inv.img} alt={inv.nom} style={{ width: 60, height: 60, borderRadius: "50%", marginBottom: 12 }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{inv.nom}</h3>
              <p style={{ color: "#6B7280", fontSize: 13, marginBottom: 4 }}>📍 {inv.ville}</p>
              <p style={{ color: "#16A34A", fontWeight: 700, fontSize: 14 }}>{inv.montant}</p>
              <p style={{ color: "#9CA3AF", fontSize: 12 }}>{inv.secteur}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FORMULAIRE */}
      <section style={{ maxWidth: 600, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 8 }}>Devenir investisseur</h2>
        <p style={{ textAlign: "center", color: "#6B7280", marginBottom: 32 }}>Remplissez ce formulaire et notre équipe vous contactera sous 48h.</p>
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          {["Nom complet", "Email", "Téléphone", "Ville"].map((label, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>{label}</label>
              <input style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 15, outline: "none", boxSizing: "border-box" }} placeholder={`Votre ${label.toLowerCase()}`} />
            </div>
          ))}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Secteur d'intérêt</label>
            <select style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 15, outline: "none", boxSizing: "border-box" }}>
              <option>Agriculture</option>
              <option>Elevage</option>
              <option>Artisanat</option>
              <option>Agro-alimentaire</option>
              <option>Tourisme</option>
              <option>Numérique</option>
            </select>
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 14, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Budget d'investissement</label>
            <select style={{ width: "100%", padding: "10px 14px", borderRadius: 8, border: "1.5px solid #D1D5DB", fontSize: 15, outline: "none", boxSizing: "border-box" }}>
              <option>Moins de 1 000 000 FCFA</option>
              <option>1 000 000 - 5 000 000 FCFA</option>
              <option>5 000 000 - 10 000 000 FCFA</option>
              <option>Plus de 10 000 000 FCFA</option>
            </select>
          </div>
          <button style={{ width: "100%", background: "#16A34A", color: "#fff", border: "none", borderRadius: 8, padding: "12px 20px", fontWeight: 700, cursor: "pointer", fontSize: 16 }}>
            Envoyer ma candidature
          </button>
        </div>
      </section>

    </div>
  )
}