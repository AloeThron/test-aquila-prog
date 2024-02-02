import Feature from "../components/feature/feature";
import Shopbtn from "../components/footer/shopbtn";
import Hero from "../components/hero";
import Contact from "./contact/page";

export default function Web() {




  return (
    <div className="container mx-auto">
      <div className="relative flex flex-col">
        <Hero />
        <Feature />
        <Contact />
        <Shopbtn />
      </div></div>
  );
}
