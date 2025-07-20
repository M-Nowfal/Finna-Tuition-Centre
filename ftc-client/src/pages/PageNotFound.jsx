import { ArrowLeft } from "lucide-react";
import Button from "../components/ui/Button";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-sky-50">
      <div className="flex flex-col items-center gap-3">
        <span className="text-5xl font-bold text-red-500">404</span>
        <span className="text-3xl font-semibold">Page Not Found</span>
        <Link to={"/"}>
          <Button variant="contained" size="sm" className="mt-5 shadow-xl">
            <ArrowLeft className="size-4 me-3" />
            Go back to home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
