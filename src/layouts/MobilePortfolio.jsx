import MNavbar from "../components/mobile/MNavbar";
import MHero from "../components/mobile/MHero";
import MAbout from "../components/mobile/MAbout";
import MProjects from "../components/mobile/MProjects";
import MSkills from "../components/mobile/MSkills";

export default function MobilePortfolio() {
  return (
    <div className="bg-white min-h-screen">
      <MNavbar />
      <MHero />
      <MAbout />
      <MProjects />
      <MSkills />
    </div>
  );
}
