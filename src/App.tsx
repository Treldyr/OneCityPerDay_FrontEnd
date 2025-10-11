import { useEffect, useState } from "react";

import type { City } from "./interfaces/City";

import logo from "./assets/icon_website_white.png";
import flagFr from "./assets/fr.png";
import flagEn from "./assets/en.png";

import CityCard from "./component/CityCard";
import CityMenu from "./component/CityMenu";
import Footer from "./component/Footer";
import BackgroundImage from "./component/BackgroundImage";

import { backendURL } from "./objects/config.ts";

import "./style.css";
import type { CityDate } from "./interfaces/CityDates.ts";
import LoadingScreen from "./component/LoadingScreen.tsx";
import ErrorPage from "./component/ErrorPage.tsx";

type Lang = "fr" | "en";

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [dates, setDates] = useState<CityDate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lang, setLang] = useState<Lang>("en");
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    fetch(`${backendURL}/datesAvailable`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur réseau : " + res.status);
        return res.json();
      })
      .then((data: CityDate[]) => {
        setDates(data);
        if (data.length > 0) {
          const lastCityId = data[data.length - 1].id;
          return fetch(`${backendURL}/${lastCityId}`)
            .then((res) => {
              if (!res.ok) throw new Error("Erreur réseau : " + res.status);
              return res.json();
            })
            .then((city: City) => setSelectedCity(city));
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorPage errorMsg={error} />;
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
            <button className="infoButton" onClick={() => setShowInfo(true)}>?</button>
            <button className="langButton" onClick={() => setLang(lang === "fr" ? "en" : "fr")}>
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
                {lang === "fr"
                  ? "Le but de ce site est de présenter une ville chaque jour, avec ses curiosités et ses photos. J'espère que cela vous donnera des idées de voyage !"
                  : "The goal of this site is to present one city each day, with its curiosities and pictures. I hope this will give you travel ideas !"}
              </p>
              <button className="closeButton" onClick={() => setShowInfo(false)}>✖</button>
            </div>
          </div>
        )}

        <CityMenu
          lang={lang}
          dates={dates}
          selectedId={selectedCity ? selectedCity.id : null}
          onCityChange={setSelectedCity}
        />

        <div className="selectedCityContainer">
          <CityCard city={selectedCity} lang={lang} />
        </div>

        <Footer lang={lang} />
      </div>
    </div>
  );
}


export default App;