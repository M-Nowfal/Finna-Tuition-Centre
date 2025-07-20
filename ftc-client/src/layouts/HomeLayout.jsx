import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

const HomeLayout = () => {

  const [home, setHome] = useState(true);

  return (
    <div className="bg-gradient-to-br from-sky-50 to-green-50">
      <Header home={home} />
      <main>
        <Outlet context={{ setHome }} />
      </main>
      <Footer />
    </div>
  );
}

export default HomeLayout;