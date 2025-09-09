import { isMobile } from "react-device-detect";
import DesktopPortfolio from "./layouts/DesktopPortfolio";
import MobilePortfolio from "./layouts/MobilePortfolio";

export default function App() {
  return (
    <>
      {isMobile ? <MobilePortfolio /> : <DesktopPortfolio />}
    </>
  );
}


