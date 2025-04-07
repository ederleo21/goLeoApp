import { X } from "lucide-react";
import { NavLink } from "react-router-dom";

export const ModalStatisticPlayerInTournament = ({ onClose, statisticPlayer }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-[Poppins] p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 relative max-h-[85vh] overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition">
          <X size={28} />
        </button>

        <div className="flex flex-col md:flex-row items-center md:items-center justify-between md:space-x-6 text-center md:text-left mb-6">
          <div className="relative w-48 h-48 md:w-44 md:h-44 flex-shrink-0">
            <img
              src={statisticPlayer.player_photo}
              alt={statisticPlayer.player}
              className="w-full h-full rounded-full object-cover border-4 border-gray-300 shadow-lg"
            />
          </div>

          <div className="flex-1 space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">{statisticPlayer.player}</h2>
            <div className="flex items-center justify-center md:justify-start space-x-3 bg-gray-100 px-4 py-2 rounded-lg shadow-sm w-fit">
              <img
                src={statisticPlayer.player_club_logo}
                alt={statisticPlayer.player_club_name}
                className="w-8 h-8 object-cover rounded"
              />
              <p className="text-gray-700 text-lg font-medium">{statisticPlayer.player_club_name}</p>
            </div>
            <p className="text-gray-600 text-base">{statisticPlayer.player_position}</p>
            <NavLink to={`/players/player/${statisticPlayer.player_id}`}>
              <button className="mt-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-lg transition">
                Ver Jugador
              </button>
            </NavLink>
          </div>
        </div>

        <div className="flex justify-center mb-5">
          <div className="bg-gray-800 text-white px-5 py-2 rounded-lg text-base font-semibold shadow">
            Partidos Jugados: {statisticPlayer.matches_played}
          </div>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-gray-800">
          {[
            { label: "Goles", value: statisticPlayer.goals_scored },
            { label: "Asistencias", value: statisticPlayer.assists },
            { label: "Disparos", value: statisticPlayer.shots_on_target },
            { label: "Pases", value: statisticPlayer.completed_passes },
            { label: "Duelos", value: statisticPlayer.duel_wins },
            { label: "Recup.", value: statisticPlayer.ball_recoveries },
            { label: "Bloqueos", value: statisticPlayer.blocks },
            { label: "Faltas Rec.", value: statisticPlayer.fouls_drawn },
            { label: "Faltas Com.", value: statisticPlayer.fouls_committed },
            { label: "Amarillas", value: statisticPlayer.yellow_cards },
            { label: "Rojas", value: statisticPlayer.red_cards },
            { label: "Atajadas", value: statisticPlayer.saves }
          ].map((stat, index) => (
            <div key={index} className="p-3 rounded-lg shadow-md bg-gray-100 text-center">
              <p className="text-base text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
