import React, { useState } from 'react';
import { MatchCard } from '../tournaments/MatchCard';
import { FiltersMatches } from '../tournaments/FiltersMatches';
import { filterMatches } from '../tournaments/utils/filterMatches';

export const MatchContainerPerformances = ({ matches, tournament }) => {
  const [filterClub, setFilterClub] = useState("");
  const [filterNumberRound, setFilterNumberRound] = useState("");
  const type = tournament?.type; 
  let isLeague = false
  if(type == "LEAGUE") isLeague = true

  let filteredMatches = [];
  if(matches && matches.length > 0) {
    filteredMatches = filterMatches(matches, "", filterClub, isLeague, filterNumberRound);
  }

  return (
    <div> 

      <FiltersMatches 
        clubs={tournament.clubs}
        filterClub={filterClub}
        setFilterClub={setFilterClub}
        isLeague={type === "LEAGUE" && true}
        filterNumberRound={filterNumberRound}
        setFilterNumberRound={setFilterNumberRound}
      />

      <div className="max-h-[550px] font-[Poppins] overflow-y-auto grid grid-cols-1 mx-12 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 border-b-2 py-2 px-2">
        {filteredMatches.length > 0 ? (
          filteredMatches.map((match) => (
            type === "LEAGUE" ? (
              <MatchCard key={match.id} match={match} isFiltered={true} />
            ) : type === "FRIENDLY" && (
              <MatchCard key={match.id} match={match} />
            )
          ))
        ) : (
          <div className="col-span-full flex justify-center">
            <p className="text-gray-500 text-center text-base font-semibold">
              No hay partidos completados en este torneo
            </p>
          </div>  
        )}
      </div>
    </div>
  );
};