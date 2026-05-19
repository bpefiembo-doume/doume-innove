export default function APropos() {
  return (
    <div style={{ fontFamily: "Segoe UI, sans-serif", background: "#F9FAFB", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #DCFCE7 0%, #F0FDF4 100%)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ fontSize: 36, fontWeight: 900, color: "#111827" }}>
          À propos de <span style={{ color: "#16A34A" }}>Doumé Innove</span>
        </h1>
        <p style={{ color: "#4B5563", fontSize: 18, maxWidth: 600, margin: "16px auto" }}>
          Une plateforme numérique au service des entrepreneurs de la ville de Doumé, Région de l'Est, Cameroun.
        </p>
      </section>

      {/* MISSION */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#16A34A", marginBottom: 16 }}>🎯 Notre Mission</h2>
          <p style={{ color: "#4B5563", fontSize: 16, lineHeight: 1.8 }}>
            Doumé Innove est une plateforme numérique qui connecte les entrepreneurs locaux de Doumé avec des investisseurs nationaux et internationaux. Notre mission est de valoriser le potentiel économique de la région de l'Est du Cameroun en rendant les projets entrepreneuriaux visibles et finançables.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#16A34A", marginBottom: 16 }}>👁️ Notre Vision</h2>
          <p style={{ color: "#4B5563", fontSize: 16, lineHeight: 1.8 }}>
            Faire de Doumé un pôle d'excellence entrepreneuriale en Afrique Centrale, où chaque idée innovante trouve le financement et l'accompagnement nécessaire pour se transformer en entreprise prospère.
          </p>
        </div>

        <div style={{ background: "#fff", borderRadius: 20, padding: 40, boxShadow: "0 2px 12px rgba(0,0,0,0.07)", marginBottom: 32 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#16A34A", marginBottom: 16 }}>💚 Nos Valeurs</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { titre: "Transparence", desc: "Nous croyons en la clarté et l'honnêteté dans toutes nos interactions." },
              { titre: "Innovation", desc: "Nous encourageons les solutions créatives aux défis locaux." },
              { titre: "Solidarité", desc: "Nous croyons en la force du collectif pour avancer ensemble." },
              { titre: "Excellence", desc: "Nous visons la qualité dans chaque projet que nous soutenons." },
            ].map((v, i) => (
              <div key={i} style={{ background: "#F0FDF4", borderRadius: 12, padding: 20, borderLeft: "4px solid #16A34A" }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: "#15803D", marginBottom: 8 }}>{v.titre}</h3>
                <p style={{ color: "#4B5563", fontSize: 13, lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EQUIPE */}
      <section style={{ background: "#fff", padding: "48px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>Notre Équipe</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 24, maxWidth: 1100, margin: "0 auto" }}>
          {[
            { nom: "Rita Bayang", role: "Fondatrice & CEO", ville: "Doumé", img: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png" },
            { nom: "Jean Essomba", role: "Responsable Technique", ville: "Bertoua", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
            { nom: "Marie Abanda", role: "Chargée des Projets", ville: "Doumé", img: "https://cdn-icons-png.flaticon.com/512/3135/3135789.png" },
            { nom: "Paul Ngono", role: "Responsable Finances", ville: "Yaoundé", img: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png" },
          ].map((membre, i) => (
            <div key={i} style={{ background: "#F9FAFB", borderRadius: 16, padding: 24, textAlign: "center" }}>
              <img src={membre.img} alt={membre.nom} style={{ width: 70, height: 70, borderRadius: "50%", marginBottom: 12 }} />
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{membre.nom}</h3>
              <p style={{ color: "#16A34A", fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{membre.role}</p>
              <p style={{ color: "#9CA3AF", fontSize: 13 }}>📍 {membre.ville}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section style={{ maxWidth: 700, margin: "0 auto", padding: "48px 24px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 32 }}>Nous Contacter</h2>
        <div style={{ background: "#fff", borderRadius: 16, padding: 32, boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
            <div style={{ textAlign: "center", padding: 20, background: "#F0FDF4", borderRadius: 12 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📧</div>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>Email</p>
              <p style={{ color: "#16A34A", fontSize: 14 }}>contact@doumeinnove.cm</p>
            </div>
            <div style={{ textAlign: "center", padding: 20, background: "#F0FDF4", borderRadius: 12 }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>📞</div>
              <p style={{ fontWeight: 700, marginBottom: 4 }}>Téléphone</p>
              <p style={{ color: "#16A34A", fontSize: 14 }}>+237 686842085</p>
            </div>
          </div>
          <div style={{ textAlign: "center", padding: 20, background: "#F0FDF4", borderRadius: 12 }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📍</div>
            <p style={{ fontWeight: 700, marginBottom: 4 }}>Adresse</p>
            <p style={{ color: "#16A34A", fontSize: 14 }}>Ville de Doumé, Région de l'Est, Cameroun</p>
          </div>
        </div>
      </section>

    </div>
  )
}