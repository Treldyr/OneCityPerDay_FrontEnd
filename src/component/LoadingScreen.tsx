import BackgroundImage from "./BackgroundImage.tsx";
import Spinner from "./Spinner.tsx";

const LoadingScreen = () => {
  return (
    <div>
        <BackgroundImage />
        <Spinner />
    </div>
  );
}

export default LoadingScreen;