import Button from "./ui/Button";
import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

const Header = ({ home }) => {

  return (
    <header className="flex justify-between items-center px-5 py-3 gap-5 bg-white shadow">
      <div className="flex items-center gap-2">
        <GraduationCap className="text-sky-600 size-10" />
        <span className="text-2xl font-bold">Finna Tuition Centre</span>
      </div>
      {home && <nav className="hidden md:flex items-center gap-5 lg:gap-10">
        <a href="#about" className="hover:text-sky-600">About</a>
        <a href="#achievements" className="hover:text-sky-600">Achievements</a>
        <a href="#reviews" className="hover:text-sky-600">Reviews</a>
        <a href="#contact" className="hover:text-sky-600">Contact</a>
      </nav>}
      <div>
        <Link to="/login">
          <Button 
            variant="contained"
            size="sm"
          >Login</Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
