import {
  Contact,
  GraduationCap,
  LinkIcon,
  Mail,
  MapPin,
  Phone,
  Table,
} from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-10">
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mx-5">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <GraduationCap className="text-sky-600 size-10" />
            <span className="text-2xl font-bold">FTC</span>
          </div>
          <p className="text-gray-300 xl:me-30">
            Empowering students to achieve academic excellence through
            personalized education.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <LinkIcon className="text-emerald-500 size-7" />
            <span className="text-2xl font-bold">Quick Links</span>
          </div>
          <nav className="flex flex-col gap-3">
            <a href="#about">About Us</a>
            <a href="#achievements">Achievements</a>
            <Link to="/login?role=staff">Staff Login</Link>
            <Link to="">Laern More</Link>
          </nav>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <Contact className="text-red-500 size-7" />
            <span className="text-2xl font-bold">Contact Info</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <Phone className="text-sky-500 size-5" />
              <span>+91 8610297319</span>
            </div>
            <div className="flex gap-2 items-center">
              <Mail className="text-sky-500 size-5" />
              <span>ftc@gamil.com</span>
            </div>
            <div className="flex gap-2 items-center">
              <MapPin className="text-sky-500 size-5" />
              <span>Azad Nagar, Karumbukkadai</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center mb-5">
            <Table className="text-amber-400 size-7" />
            <span className="text-2xl font-bold">Tuition Hours</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                For 9<sup>th</sup>
              </span>
              <p className="text-sm text-gray-300">
                Monday - Saturday: 7:00 PM - 9:30 PM
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                For 10<sup>th</sup>
              </span>
              <p className="text-sm text-gray-300">
                Monday - Saturday: 7:00 PM - 10:00 PM
              </p>
            </div>
            <div className="flex flex-col">
              <span className="text-md font-semibold">
                For 11<sup>th</sup> & 12<sup>th</sup>
              </span>
              <p className="text-sm text-gray-300">
                Monday - Saturday: 6:30 AM - 8:30 AM
              </p>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-600 w-[90%] m-auto my-5" />
      <div className="flex justify-center">
        <p>
          &copy; {new Date().getFullYear()} Finna Tuition Centre. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
