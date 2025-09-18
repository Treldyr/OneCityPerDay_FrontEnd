import type { City } from "../interfaces/City";

interface Props {
  city: City;
  lang: "fr" | "en";
}

// Mapping des pays vers leurs codes ISO pour Flagcdn
const countryCodes: Record<string, string> = {
  France: "fr",
  Portugal: "pt",
  Germany: "de",
  Spain: "es",
  Italy: "it",
  Canada: "ca",
  Japan: "jp",
  China: "cn",
  Uzbekistan: "uz",
  Tanzania: "tz",
};


function CityCard({ city, lang }: Props) {
  const countryName = lang === "fr" ? city.countryNameFr : city.countryNameEn;
  const cityName = lang === "fr" ? city.cityNameFr : city.cityNameEn;

  // Récupère le code ISO ou undefined
  const countryCode = countryCodes[city.countryNameEn.toString()];

  // URL du drapeau si disponible
  const flagUrl = countryCode
    ? `https://flagcdn.com/w80/${countryCode}.png`
    : undefined;

  return (
    <div className="cityCardContainer">

      {/* Nom de la ville avec drapeaux */}
      <div className="cityNameFlags">
        {flagUrl && <img src={flagUrl} alt={countryName} />}
        <h1>{cityName}</h1>
        {flagUrl && <img src={flagUrl} alt={countryName} />}
      </div>

      {/* Nom du pays */}
      <h2 className="countryName">{countryName}</h2>

      {/* Bloc texte + photos */}
      <div className="cityContent">
        <div className="cityText">
          <p>{lang === "fr" ? city.descriptionFr : city.descriptionEn}</p>
        </div>

        <div className="cityPhotos">
          {city.photos.map((photo, index) => (
            <div key={index}>
              <img src={photo.url} alt={photo.caption} />
              <p>{photo.caption}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Curiosités */}
      <div className="curiositiesSection">
        <h3>{lang === "fr" ? "Curiosités" : "Curiosities"}</h3>
        <div className="curiositiesContainer">
          {city.curiosities.map((curiosity, index) => (
            <div key={index} className="curiosityCard">
              {curiosity.urlPhoto && (
                <img
                  src={curiosity.urlPhoto}
                  alt={lang === "fr" ? curiosity.titleFr : curiosity.titleEn}
                />
              )}
              <strong>
                {lang === "fr" ? curiosity.titleFr : curiosity.titleEn}
              </strong>
              <p>{lang === "fr" ? curiosity.detailFr : curiosity.detailEn}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CityCard;
