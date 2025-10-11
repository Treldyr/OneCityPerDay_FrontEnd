import { BeatLoader } from "react-spinners";
import icon from "../assets/icon_website_white.png";
import "../css/ErrorPage.css";

interface Props {
  errorMsg: string;
}

const ErrorPage = ({errorMsg} : Props) => {
  return (
    <div className="error-page-container appContainer">
      <div className="headerLogoTitle">
        <img src={icon} alt="Logo" />
        <h1>Oops !</h1>
      </div>

      <h2>An error has occurred</h2>
      <p className="error-description">
        It seems that the page you’re looking for doesn’t exist or that an unexpected error has occurred.
      </p>
      <p className="error-description">
        Error : {errorMsg}
      </p>
      <BeatLoader color="#ffffffff" size={12} />
    </div>
  );
};

export default ErrorPage;
