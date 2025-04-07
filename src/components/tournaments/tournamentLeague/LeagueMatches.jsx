import React, { useEffect, useState, useRef } from "react";
import { MatchCard } from "../MatchCard";
import { BiSolidDownArrow } from "react-icons/bi";
import { BiSolidUpArrow } from "react-icons/bi";
import { FiltersMatches } from "../FiltersMatches";
import { filterMatches } from "../utils/filterMatches";
import { AdditionalMatchesContainer } from "./AdditionalMatchesContainer";

export const LeagueMatches = ({ matches, tournament }) => {
  const [openMatches, setIsOpenMatches] = useState(JSON.parse(localStorage.getItem("openMatches") || false));
  const [filterState, setFilterState] = useState(localStorage.getItem("filterStateLeague") ? JSON.parse(localStorage.getItem("filterStateLeague")) : "");
  const [filterClub, setFilterClub] = useState(localStorage.getItem("filterClubLeague") ? JSON.parse(localStorage.getItem("filterClubLeague")) : "");
  const [filterNumberRound, setFilterNumberRound] = useState(localStorage.getItem("filterNumberRound") ? JSON.parse(localStorage.getItem("filterNumberRound")) : "");

  useEffect(() => {
    localStorage.setItem("openMatches", JSON.stringify(openMatches));
    localStorage.setItem("filterStateLeague", JSON.stringify(filterState));
    localStorage.setItem("filterClubLeague", JSON.stringify(filterClub));
    localStorage.setItem("filterNumberRound", JSON.stringify(filterNumberRound));
  }, [openMatches, filterState, filterClub, filterNumberRound]);

  const groupedMatches = matches.reduce((acc, match) => {
    if (match.round > 0) {
        if (!acc[match.round]) {
            acc[match.round] = []; 
        }
        acc[match.round].push(match);
    }
    return acc;
    }, {});

  let filteredMatches = (filterClub || filterState || filterNumberRound) ? filterMatches(matches, filterState, filterClub, true, filterNumberRound) : [];

  return (
    <>
      {/* Section show matches */}
      <div className={`px-5 py-7 min-h-full font-[Poppins] ${!openMatches && "bg-slate-200 mx-4 my-2 rounded-2xl"}`}>

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

        {/* Container of matches */}
        {openMatches && (
          <div>
            <FiltersMatches
              filterState={filterState}
              setFilterState={setFilterState}
              clubs={tournament.clubs}
              filterClub={filterClub}
              setFilterClub={setFilterClub}
              isLeague={true}
              filterNumberRound={filterNumberRound}
              setFilterNumberRound={setFilterNumberRound}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 lg:mx-12 pt-2 pb-6 px-2 border-b-2">
              {(filterClub || filterState || filterNumberRound) ? (
                filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <MatchCard key={match.id} match={match} isFiltered={true}/>
                  ))
                ) : (
                  <div className="col-span-full flex justify-center">
                    <p className="text-gray-500 text-center text-lg font-semibold">
                      No hay partidos
                    </p>
                  </div>
                )
              ) : (
                Object.keys(groupedMatches).map((round) => (
                  <div
                    key={round}
                    className="border border-gray-300 rounded-lg p-6 shadow-lg"
                  >
                    <h2 className="text-3xl font-bold text-violet-900 mb-4 text-center">
                      Ronda {round}
                    </h2>
                
                    <div className="flex flex-col gap-4">
                      {groupedMatches[round].map((match) => (
                        <MatchCard key={match.id} match={match} tournament={tournament} />
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
            {!(filterClub || filterState || filterNumberRound) && (
              <AdditionalMatchesContainer matches={matches} tournament={tournament} />
            )}
          </div>
        )}

        {!openMatches && (
          <div className="text-center mt-7 font-semibold text-gray-800">
            Aplasta el botón para desplegar todos los partidos de este torneo
          </div>
        )}

      </div>
    </>
  );
}
