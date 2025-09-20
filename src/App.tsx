import { useEffect, useState } from "react";

import type { City } from "./interfaces/City";

import logo from "./assets/icon_website_white.png";
import flagFr from "./assets/fr.png";
import flagEn from "./assets/en.png";


import CityCard from "./component/CityCard";
import CityMenu from "./component/CityMenu";
import Footer from "./component/Footer";
import BackgroundImage from "./component/BackgroundImage";

import {backendURL} from "./objects/config.ts"

import "./style.css"

type Lang = "fr" | "en";

function App() {
  const [cities, setCities] = useState<City[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("fr");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch(`${backendURL}/pastOrToday`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau : " + res.status);
        return res.json();
      })
      .then((data: City[]) => {
        const sorted = data.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        setCities(sorted);
        if (sorted.length > 0) setSelectedCity(sorted[sorted.length - 1]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error}</p>;
  if (!selectedCity) return <p>No cities available</p>;

  return (
    <div className="appContainer">
    <BackgroundImage />

    <div className="mainContent">
      <div className="headerContainer">
        <div className="headerLogoTitle">
          <img src={logo} alt="Logo" />
          <h1>{lang === "fr" ? "Une Ville Par Jour" : "One City Per Day"}</h1>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          {/* Bouton info */}
          <button className="infoButton" onClick={() => setShowInfo(true)}>?</button>

          {/* Bouton changement de langue */}
          <button
            className="langButton"
            onClick={() => setLang(lang === "fr" ? "en" : "fr")}
          >
            <img
              src={lang === "fr" ? flagEn : flagFr}
              alt={lang === "fr" ? "English" : "Français"}
              style={{ width: "32px", height: "32px" }}
            />
          </button>
        </div>
      </div>

      {showInfo && (
        <div className="infoOverlay" onClick={() => setShowInfo(false)}>
          <div className="infoBox">
            <h2>{lang === "fr" ? "À propos du site" : "About the site"}</h2>
            <p>
              {lang === "fr" ? "Le but de ce site est de présenter une ville par jour, avec ses curiosités et ses photos."
              : "The goal of this site is to present one city per day, with its curiosities and photos."}
              
            </p>
            <button className="closeButton" onClick={() => setShowInfo(false)}>✖</button>
          </div>
        </div>
      )}

      <CityMenu
        cities={cities}
        selectedCity={selectedCity}
        onSelect={(city) => setSelectedCity(city)}
        lang={lang}
      />

      <div className="selectedCityContainer">
        <CityCard city={selectedCity} lang={lang} />
      </div>

      <Footer
        lang={lang}
      />
    </div>
  </div>
);
}

export default App;