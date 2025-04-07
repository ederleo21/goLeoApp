import { useState, useContext } from "react";
import { TournamentCard } from "./TournamentCard";
import { Pagination } from "../utils/Pagination";
import { TournamentTypeModal } from "./TournamentTypeModal";
import { FiltersTournaments } from "./FiltersTournaments";
import { UserContext } from "../../context/userContext";

export const TournamentsContainer = ({ tournaments }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState("");
  const [filterType, setFilterType] = useState(""); 
  const { user } = useContext(UserContext);

  const tournamentsPerPage = 3;

  const filteredTournaments = tournaments.filter((tournament) => {
    const nameMatch = tournament.name.toLowerCase().includes(filterName.toLowerCase());
    const typeMatch = filterType ? tournament.type === filterType : true;
    return nameMatch && typeMatch;
  });

  const totalPages = Math.ceil(filteredTournaments.length / tournamentsPerPage);
  const indexOfLastTournament = currentPage * tournamentsPerPage;
  const indexOfFirstTournament = indexOfLastTournament - tournamentsPerPage;
  const currentTournaments = filteredTournaments.slice(indexOfFirstTournament, indexOfLastTournament);

  const handleFilterChange = (value) => {
    setFilterName(value);
    setCurrentPage(1); 
  };

  const handleTypeChange = (value) => {
    setFilterType(value);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="py-8 px-4 font-[Poppins]">
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-6">
        {user?.permissions.add_tournament && 
          <button
            onClick={() => setShowModal(true)}
            className="bg-indigo text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition"
          >
            Crear Torneo
          </button>
        }
        <FiltersTournaments 
          setFilterName={handleFilterChange} 
          setFilterType={handleTypeChange}  
        />
      </div>

      {showModal && <TournamentTypeModal onClose={() => setShowModal(false)} />}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-xl mx-auto">
        {currentTournaments.length > 0 ? (
          currentTournaments.map((tournament) => (
            <TournamentCard key={tournament.id} tournament={tournament} />
          ))
        ) : (
          <p className="text-center text-red-600 font-semibold col-span-3">No hay torneos disponibles.</p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          maxPageNumbersToShow={5}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};
