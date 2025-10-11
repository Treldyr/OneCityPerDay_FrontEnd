import { BeatLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <BeatLoader color="#007bff" size={15} />
    </div>
  );
}

export default Spinner;
