import React, { useEffect, useState, useContext } from "react";
import { MatchCreateFormModal } from "./MatchCreateFormModal";
import { MatchCard } from "../MatchCard";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { FiltersMatches } from "../FiltersMatches";
import { filterMatches } from "../utils/filterMatches";
import { UserContext } from "../../../context/userContext";

export const FriendlyMatches = ({ matches: initialMatches, tournament }) => {
  const [matches, setMatches] = useState(initialMatches);
  const [openModal, setOpenModal] = useState(false);
  const [openMatches, setIsOpenMatches] = useState(JSON.parse(localStorage.getItem("openMatches") || false));
  const [filterState, setFilterState] = useState(localStorage.getItem("filterStateFriendly") ? JSON.parse(localStorage.getItem("filterStateFriendly")) : "");
  const [filterClub, setFilterClub] = useState(localStorage.getItem("filterClubFriendly") ? JSON.parse(localStorage.getItem("filterClubFriendly")) : "");
  const { user } = useContext(UserContext);

  useEffect(() => {
    localStorage.setItem("openMatches", JSON.stringify(openMatches));
    localStorage.setItem("filterStateFriendly", JSON.stringify(filterState));
    localStorage.setItem("filterClubFriendly", JSON.stringify(filterClub));
  }, [openMatches, filterState, filterClub]);

  const filteredMatches = filterMatches(matches, filterState, filterClub);

  return (
    <>
      {/* Section show matches */}
      <div className={`p-5 py-7 min-h-full font-[Poppins] ${!openMatches && "bg-slate-200 mx-4 my-2 rounded-2xl"}`}>

        <div className={`flex ${!openMatches && "flex-col"} gap-7 justify-center items-center`}>
          <h2 className="text-4xl text-center font-bold text-gray-900">
            Partidos
          </h2>
          <button 
            className="flex items-center gap-2 bg-indigo hover:bg-indigo_dark px-3 py-2 rounded font-semibold text-white"
            onClick={() => setIsOpenMatches(!openMatches)}
          >
            {!openMatches ? <BiSolidDownArrow/> : <BiSolidUpArrow/>}
            {!openMatches ? "Ver partidos" : "Ocultar partidos"}
          </button>
        </div>

        {openMatches && (
          <div>
            {/* Contenedor de filtros y botón Crear Partido */}
            <div className="flex flex-wrap justify-center items-center gap-4 p-4 rounded-lg">
              {user.permissions.add_match && 
                <button
                  className="bg-indigo hover:bg-indigo_dark text-white px-4 py-2 rounded-md font-semibold mt-4"
                  onClick={() => setOpenModal(true)}
                >
                  Crear Partido
                </button>
              }
              <FiltersMatches
                filterState={filterState}
                setFilterState={setFilterState}
                clubs={tournament.clubs}
                filterClub={filterClub}
                setFilterClub={setFilterClub}
              />
            </div>
        
            {/* Container of matches */}
            <div className="max-h-[550px] overflow-y-auto grid grid-cols-1 mx-12 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 border-b-2 py-2 px-2">
              {filteredMatches.length > 0 
              ? (
                  filteredMatches.map((match) => 
                    <MatchCard key={match.id} match={match} tournament={tournament}/>)
              ) : (
                <p className="text-gray-500 text-center col-span-full">
                    No hay partidos programados.
                </p>
              )}
            </div>
          </div>
        )}

        {openModal && (
          <MatchCreateFormModal
            onClose={() => setOpenModal(false)}
            tournament={tournament}
            setMatches={setMatches}
          />
        )}

        {!openMatches && (
          <div className="text-center mt-7 font-semibold text-gray-800">
            Aplasta el botón para desplegar todos los partidos de este torneo
          </div>
        )}

      </div>
    </>
  );
};
