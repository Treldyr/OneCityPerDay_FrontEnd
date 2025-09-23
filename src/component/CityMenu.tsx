import { useEffect, useState, useRef } from "react";
import type { City } from "../interfaces/City";
import { backendURL } from "../objects/config.ts";
import type { CityDate } from "../interfaces/CityDates.ts";

interface Props {
  lang: "fr" | "en";
  onCityChange: (city: City) => void;
}

const CityMenu = ({ lang, onCityChange }: Props) => {
  const [dates, setDates] = useState<CityDate[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loadingCity, setLoadingCity] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    const monthIndex = date.getMonth();
    const frMonths = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return lang === "fr" ? frMonths[monthIndex] : enMonths[monthIndex];
  };

  useEffect(() => {
    // Charger la liste des dates
    fetch(`${backendURL}/datesAvailable`)
      .then((res) => res.json())
      .then((data: CityDate[]) => {
        setDates(data);
        if (data.length > 0) {
          const lastCity = data[data.length - 1];
          loadCity(lastCity.id); // charge directement la dernière ville
        }
      });
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [dates]);

  const loadCity = (id: number) => {
    setLoadingCity(true);
    setSelectedId(id);

    fetch(`${backendURL}/${id}`)
      .then((res) => res.json())
      .then((city: City) => {
        onCityChange(city);
        setLoadingCity(false);
      })
      .catch(() => {
        setLoadingCity(false);
      });
  };

  return (
    <div className="cityMenuWrapper">
      <div ref={containerRef} className="cityMenuContainer">
        {dates.map((d) => {
          const day = new Date(d.date).getDate();
          const month = formatMonth(d.date);
          const isSelected = d.id === selectedId;

          return (
            <div
              key={d.id}
              className={`cityCard ${isSelected ? "selected" : ""}`}
              onClick={() => loadCity(d.id)}
            >
              <span className="day">{day}</span>
              <span className="month">{month}</span>
            </div>
          );
        })}
      </div>

      {/* Spinner affiché quand une ville charge */}
      {loadingCity && (
        <div className="loadingOverlay">
          <div className="spinner"></div>
          <p>{lang === "fr" ? "Chargement de la ville..." : "Loading city..."}</p>
        </div>
      )}
    </div>
  );
};

export default CityMenu;
