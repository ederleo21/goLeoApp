import React, { useState, useContext } from "react";
import { ModalUpdateMatchStatistics } from "../tournaments/ModalUpdateMatchStatistics";
import { UpdateScoreMatchModal } from "../tournaments/UpdateScoreMatchModal";
import { useLocation } from "react-router-dom";
import { Pagination } from "../utils/Pagination";
import { BackButton } from "../utils/BackButton";
import { UserContext } from "../../context/userContext";

export const StatisticsPlayers = ({ matchStatistics, isToUpdate = false, type }) => {
  const [match, setMatch] = useState(matchStatistics);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalScoreOpen, setModalScoreOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const location = useLocation();
  const { user } = useContext(UserContext);

  const { home_team_name, away_team_name, score_home, score_away, home_team_statistics, away_team_statistics, home_team_logo, away_team_logo } = match;

  const totalPages = 2;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="flex flex-col items-center bg-gray-100 font-[Poppins] w-full">
      
      {location.pathname.includes("tournaments") ? (
        <BackButton url={type == "LEAGUE" ? `/tournaments/league/${matchStatistics.tournament}`:
        type === "FRIENDLY" && `/tournaments/friendly/${matchStatistics.tournament}`} />
      ) : location.pathname.includes("performances") && (
        <BackButton url={`/performances/tournament/${matchStatistics.tournament}`} />
      )}

      <div className="bg-white rounded-lg p-6 w-full">

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 text-gray-800 px-6 pt-2 pb-4 rounded-t-lg shadow-lg">
          <div className="flex items-center gap-4">
            <img src={home_team_logo} alt={home_team_name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
            <div className="text-lg md:text-3xl font-bold">{home_team_name}</div>
          </div>
          <div className="text-lg md:text-3xl font-extrabold">{score_home} - {score_away}</div>
          <div className="flex items-center gap-4">
            <img src={away_team_logo} alt={away_team_name} className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
            <div className="text-lg md:text-3xl font-bold">{away_team_name}</div>
          </div>
        </div>

        {isToUpdate && user.permissions.change_match && (
          <div className="text-center my-6">
            <button
              className="px-8 py-3 bg-blue-600 text-white text-base md:text-lg font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
              onClick={() => setModalScoreOpen(true)}
            >
              Actualizar Marcador
            </button>
          </div>
        )}

        <div className="my-8">
          {currentPage === 1 ? (
            <>
              <div className="text-2xl font-bold text-gray-800 text-center mb-4">{home_team_name}</div>
              <ShowPlayerStatistics
                playerStatistics={home_team_statistics}
                isToUpdate={isToUpdate}
                setSelectedPlayer={setSelectedPlayer}
                setIsModalOpen={setIsModalOpen}
              />
            </>
          ) : (
            <>
              <div className="text-2xl font-bold text-gray-800 text-center mb-4">{away_team_name}</div>
              <ShowPlayerStatistics
                playerStatistics={away_team_statistics}
                isToUpdate={isToUpdate}
                setSelectedPlayer={setSelectedPlayer}
                setIsModalOpen={setIsModalOpen}
              />
            </>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          maxPageNumbersToShow={5}
          paginate={paginate}
          prevPage={prevPage}
          nextPage={nextPage}
        />

      </div>

      {isModalOpen && (
        <ModalUpdateMatchStatistics
          player={selectedPlayer}
          onClose={() => { setIsModalOpen(false); setSelectedPlayer(null); }}
          setMatch={setMatch}
        />
      )}

      {isModalScoreOpen && (
        <UpdateScoreMatchModal
          match={match}
          setMatch={setMatch}
          onClose={() => setModalScoreOpen(false)}
        />
      )}
    </div>
  );
};

export const ShowPlayerStatistics = ({ playerStatistics, isToUpdate, setSelectedPlayer, setIsModalOpen }) => {
  const { user } = useContext(UserContext);
  return (
<div className="overflow-x-auto w-full sm:w-10/12 max-w-5xl mx-auto bg-white rounded-lg shadow-lg">
  <div className="max-h-[500px] overflow-y-auto">
    <table className="w-full text-base border border-gray-200 rounded-lg table-auto">
      <thead className="sticky top-0 bg-indigo text-white shadow">
        <tr>
          {[
            'Jugador', 'Gol', 'Asist', 'Tiros', 'Pases', 'Duelos', 'Recupe', 'Bloqueos', 'F.reci', 'F.comet', 'Amar', 'Rojas', 'ataj',
            isToUpdate && user?.permissions.change_match && user?.permissions.change_playerstatistics && 'Acción'
          ].map(
            (header, index) => header && (
              <th key={index} className="px-6 py-3 text-center">{header}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {playerStatistics?.map((player) => (
          <tr key={player.id} className="border-t text-lg border-gray-300 hover:bg-gray-100 transition-all">
            <td className="px-6 py-4 text-center font-bold text-gray-800 flex items-center gap-4">
              {player.player_first_name} {player.player_last_name}
            </td>
            <td className="px-6 py-4 text-center">{player.goals_scored}</td>
            <td className="px-6 py-4 text-center">{player.assists}</td>
            <td className="px-6 py-4 text-center">{player.shots_on_target}</td>
            <td className="px-6 py-4 text-center">{player.completed_passes}</td>
            <td className="px-6 py-4 text-center">{player.duel_wins}</td>
            <td className="px-6 py-4 text-center">{player.ball_recoveries}</td>
            <td className="px-6 py-4 text-center">{player.blocks}</td>
            <td className="px-6 py-4 text-center">{player.fouls_drawn}</td>
            <td className="px-6 py-4 text-center">{player.fouls_committed}</td>
            <td className="px-6 py-4 text-center text-yellow-500 font-bold">{player.yellow_cards}</td>
            <td className="px-6 py-4 text-center text-red-500 font-bold">{player.red_cards}</td>
            <td className="px-6 py-4 text-center">{player.saves}</td>
            {isToUpdate && user?.permissions.change_match && user?.permissions.change_playerstatistics && (
              <td className="px-6 py-4 text-center">
                <button
                  className="px-6 py-2 bg-blue-600 text-white text-base font-semibold rounded-md hover:bg-blue-700 transition-all transform hover:scale-105"
                  onClick={() => { setSelectedPlayer(player); setIsModalOpen(true); }}
                >
                  Actualizar
                </button>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
};
