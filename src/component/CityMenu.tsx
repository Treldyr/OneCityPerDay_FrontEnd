import { useEffect, useRef } from "react";
import type { City } from "../interfaces/City";

interface Props {
  cities: City[];
  selectedCity: City;
  onSelect: (city: City) => void;
  lang: "fr" | "en";
}

const CityMenu = ({ cities, selectedCity, onSelect, lang }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const formatMonth = (dateStr: string) => {
    const date = new Date(dateStr);
    const monthIndex = date.getMonth();
    const frMonths = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"];
    const enMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Augu", "Sep", "Oct", "Nov", "Dec"];
    return lang === "fr" ? frMonths[monthIndex] : enMonths[monthIndex];
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = containerRef.current.scrollWidth;
    }
  }, [cities]);

  return (
    <div ref={containerRef} className="cityMenuContainer">
      {cities.map((city) => {
        const day = new Date(city.date).getDate();
        const month = formatMonth(city.date);
        const isSelected = selectedCity.id === city.id;

        return (
          <div
            key={city.id}
            className={`cityCard ${isSelected ? "selected" : ""}`}
            onClick={() => onSelect(city)}
          >
            <span className="day">{day}</span>
            <span className="month">{month}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CityMenu;
