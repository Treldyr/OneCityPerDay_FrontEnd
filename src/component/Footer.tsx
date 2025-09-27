import logo from "../assets/icon_website.png";

interface Props {
  lang: "fr" | "en";
}

const Footer = ({ lang }: Props) => {
  return (
    <footer
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 32px",
        backgroundColor: "#dfdedeff",
        marginTop: "40px",
        borderTop: "2px solid #333",
        flexWrap: "wrap",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ height: "40px", objectFit: "contain" }}
        />
        <span style={{ fontWeight: "bold", fontSize: "1.2em" }}>
          {lang === "fr" ? "Une Ville Par Jour" : "One City Per Day"}
        </span>
      </div>

      {/* Crédits */}
      <div style={{ fontSize: "0.9em", textAlign: "right" }}>
        <p style={{ margin: 0 }}>{lang === "fr" ? "© 2025 Une Ville Par Jour" : "© 2025 One City Per Day"}</p>
        <p style={{ margin: 0 }}>{lang === "fr" ? "Développé par Y.Gasc" : "Developped by Y.Gasc"}</p>
      </div>
    </footer>
  );
};

export default Footer;
