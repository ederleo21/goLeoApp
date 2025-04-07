import React, { useState } from "react";
import { TournamentDetailsHeader } from "../TournamentDetailsHeader";
import { ClubsPositionsTableModal } from "../ClubsPositionsTableModal";
import { SectionsMenu } from "../../performances/SectionsMenu";
  
export const LeagueDetails = ({ tournament, clubsStatistics }) => {
  const [openTableModal, setOpenTableModal] = useState(false);

  return (
    <>
      <TournamentDetailsHeader
      tournament={tournament}
      >
        {tournament.league && (
          <div className="grid grid-cols-1 gap-2 text-center max-w-xl">
            <div className="border border-gray-300 bg-gradient-to-r from-purple-100 to-purple-200 bg-neutral-200 font-bold px-6 py-2 rounded-lg text-sm md:text-lg shadow-lg">
              <p className="font-bold text-gray-900"><span className="font-semibold text-green-900">Victoria - </span>{tournament.league.points_system.victory} pts</p>
              <p className="font-bold text-gray-900"><span className="font-semibold text-blue-800">Empate - </span>{tournament.league.points_system.draw} pts</p>
              <p className="font-bold text-gray-900"><span className="font-semibold text-red-700">Derrota - </span>{tournament.league.points_system.loss} pts</p>
            </div>
            <div className="border border-gray-300 bg-gradient-to-r from-yellow-100 to-yellow-200 marker:first-line:px-6 py-2 rounded-lg text-sm md:text-lg shadow-md">
              <p className="font-bold text-gray-900"><span className="font-semibold text-indigo_dark">Formato:</span> {tournament.league.league_format === "SINGLE" ? "Solo ida" : "Ida y vuelta" }</p>
            </div>
            <div className="border border-gray-300 bg-gradient-to-r from-teal-100 to-teal-200 px-6 py-2 rounded-lg text-sm md:text-lg shadow-md">
              <p className="font-bold text-gray-900"><span className=" font-semibold text-indigo_dark">Rondas:</span> {tournament.league.rounds}</p> 
            </div>
            <div className="border border-gray-300 bg-gradient-to-r from-purple-200 to-purple-300 px-6 py-2 rounded-lg text-sm md:text-lg shadow-md">
              <p className="font-bold text-gray-900"><span className="font-semibold text-indigo_dark">Clubes:</span> {tournament.league.teams_count}</p>
            </div>
          </div>
        )}
      </TournamentDetailsHeader>

      <SectionsMenu setOpenTableModal={setOpenTableModal} tournament={tournament} />
      
      {openTableModal && (
        <ClubsPositionsTableModal statistics={clubsStatistics} pointsSystem={tournament.league.points_system} onClose={() => setOpenTableModal(false)} />
      )
      }
    </>
  );
};
