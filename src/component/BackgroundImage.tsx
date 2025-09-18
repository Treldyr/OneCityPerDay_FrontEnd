import background from "./../assets/background.png";

const BackgroundImage = () => {
  return (
    <img
        src={background} // ton import ou chemin public
        alt="Fond"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",   // prend toute la largeur
          height: "300px", // hauteur fixe
        }}
    />
  );
};

export default BackgroundImage;
