import StudentCard from "../../components/cards/StudentCard";

const Students = () => {



  return (
    <div className="mt-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {[1, 2, 3, 4].map(_ => (
        <StudentCard />
      ))}
    </div>
  );
}

export default Students;