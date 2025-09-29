import { useState } from "react";

interface Props {
  attributionText?: string | null;
  lang: "fr" | "en";
}

function AttributionImage({ attributionText, lang }: Props) {
  const [showNotice, setShowNotice] = useState(false);

  const text =
    attributionText && attributionText.trim() !== ""
      ? attributionText
      : lang === "fr"
      ? "Libre de droit"
      : "Royalty free";

  return (
    <span className="attributionWrapper">
      <button
        className="infoPhotoButton"
        onClick={() => setShowNotice((prev) => !prev)}
        title={lang === "fr" ? "Informations" : "Information"}
      >
        ?
      </button>

      {showNotice && (
        <span className="tooltip">{text}</span>
      )}
    </span>
  );
}

export default AttributionImage;
