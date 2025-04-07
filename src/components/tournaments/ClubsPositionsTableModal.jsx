import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const ClubsPositionsTableModal = ({ statistics, pointsSystem, onClose }) => {
    const [sortedStatistics, setSortedStatistics] = useState([]);

    useEffect(() => {
        if (statistics && statistics.length > 0 && pointsSystem) {
          const sorted = [...statistics].sort((a, b) => {
            const pointsA = a.total_wins * pointsSystem.victory + a.total_draws * pointsSystem.draw + a.total_losses * pointsSystem.loss;
            const pointsB = b.total_wins * pointsSystem.victory + b.total_draws * pointsSystem.draw + b.total_losses * pointsSystem.loss;
            return pointsB - pointsA;
          });
          setSortedStatistics(sorted);
        }
      }, [statistics, pointsSystem]);
      
    if (!statistics || statistics.length === 0) return null;
  
    return (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 font-[Poppins]">
  <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-6 relative max-h-[80vh] overflow-auto">
    <button
      onClick={onClose}
      className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
    >
      <X size={24} />
    </button>
    
    <h2 className="text-xl font-bold text-center text-gray-800 mb-4">
      Tabla de Posiciones
    </h2>
    
    <div className="overflow-x-auto max-h-[60vh] overflow-y-auto">
      <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
        <thead className="bg-gray-100">
          <tr className="text-gray-700">
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">#</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10 text-left">Club</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">PJ</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">PG</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">PE</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">PP</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">GF</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">GC</th>
            <th className="border px-3 py-2 sticky top-[-0.5px] bg-slate-200 z-10">Pts</th>
          </tr>
        </thead>
        <tbody>
        {sortedStatistics.length > 0 ? (
          sortedStatistics.map((team, index) => (
            <tr key={team.club.club_id} className="text-center">
              <td className="border px-3 py-2 font-bold">{index + 1}</td>
              <td className="border px-3 py-2 flex items-center gap-2">
                <img
                  src={team.club.club_logo}
                  alt={team.club.club_name}
                  className="w-8 h-8 md:w-10 md:h-10 object-cover rounded-full"
                />
                <span className="truncate">{team.club.club_name}</span>
              </td>
              <td className="border px-3 py-2">
                {team.total_wins + team.total_losses + team.total_draws}
              </td>
              <td className="border px-3 py-2">{team.total_wins}</td>
              <td className="border px-3 py-2">{team.total_draws}</td>
              <td className="border px-3 py-2">{team.total_losses}</td>
              <td className="border px-3 py-2">{team.goals_scored}</td>
              <td className="border px-3 py-2">{team.goals_conceded}</td>
              <td className="border px-3 py-2 font-bold">
                {team.total_wins * pointsSystem.victory + team.total_draws * pointsSystem.draw + team.total_losses * pointsSystem.loss}
              </td>
            </tr>
          ))
        ) : (
          <h2 className="text-base my-4 text-center text-slate-600 font-bold">Cargando...</h2>
        )}
      </tbody>
      </table>
    </div>
  </div>
</div>
    );
  };
  