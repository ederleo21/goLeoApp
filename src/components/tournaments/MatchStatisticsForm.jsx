import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { Pagination } from "../utils/Pagination";
import usePagination from "./utils/usePagination";
import toast from "react-hot-toast";
import api from "../../api";

export const MatchStatisticsForm = ({ matchPlayers, tournament }) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      score_home: matchPlayers.score_home || 0,
      score_away: matchPlayers.score_away || 0,
      home_team: matchPlayers.home_team.players.reduce((acc, player) => {
        acc[player.id] = {
          playerParticipationId: player.id,
          goals_scored: 0,
          assists: 0,
          shots_on_target: 0,
          completed_passes: 0,
          duel_wins: 0,
          ball_recoveries: 0,
          blocks: 0,
          fouls_drawn: 0,
          fouls_committed: 0,
          yellow_cards: 0,
          red_cards: 0,
          saves: 0,
        };
        return acc;
      }, {}),
      away_team: matchPlayers.away_team.players.reduce((acc, player) => {
        acc[player.id] = {
          playerParticipationId: player.id,
          goals_scored: 0,
          assists: 0,
          shots_on_target: 0,
          completed_passes: 0,
          duel_wins: 0,
          ball_recoveries: 0,
          blocks: 0,
          fouls_drawn: 0,
          fouls_committed: 0,
          yellow_cards: 0,
          red_cards: 0,
          saves: 0,
        };
        return acc;
      }, {}),
    },
    onSubmit: async (values, { setSubmitting }) => {
      const homeTeamStats = Object.values(values.home_team).map((player) => ({
        player_participation: player.playerParticipationId,
        goals_scored: player.goals_scored,
        assists: player.assists,
        shots_on_target: player.shots_on_target,
        completed_passes: player.completed_passes,
        duel_wins: player.duel_wins,
        ball_recoveries: player.ball_recoveries,
        blocks: player.blocks,
        fouls_drawn: player.fouls_drawn,
        fouls_committed: player.fouls_committed,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
        saves: player.saves,
      }));

      const awayTeamStats = Object.values(values.away_team).map((player) => ({
        player_participation: player.playerParticipationId,
        goals_scored: player.goals_scored,
        assists: player.assists,
        shots_on_target: player.shots_on_target,
        completed_passes: player.completed_passes,
        duel_wins: player.duel_wins,
        ball_recoveries: player.ball_recoveries,
        blocks: player.blocks,
        fouls_drawn: player.fouls_drawn,
        fouls_committed: player.fouls_committed,
        yellow_cards: player.yellow_cards,
        red_cards: player.red_cards,
        saves: player.saves,
      }));

      const statsData = [...homeTeamStats, ...awayTeamStats];
      const matchData = {score_home: values.score_home, score_away: values.score_away}
      
      try{
        await api.post("/performance/player-statistics/create/", statsData);
        await api.patch(`/tournaments/matches/${matchPlayers.id}/update_score/`, matchData);

        toast.success("Estadísticas registradas con éxito!");
        if(tournament.type === "LEAGUE"){
          navigate(`/tournaments/league/${tournament.id}`);
        }else if(tournament.type === "FRIENDLY"){
          navigate(`/tournaments/friendly/${tournament.id}`);
        }
      }catch(error){
        toast.error("Ocurrió un error en el registro: ", error);
      }finally{
        setSubmitting(false);
      }
    },
  });

  // pagination of home team players
  const [filterNameHome, setFilterNameHome] = useState("");
  const {
    currentPlayer: currentPlayerLocal,
    currentPage: currentPageLocal,
    totalPages: totalPagesLocal,
    paginate: paginateLocal,
    prevPage: prevPageLocal,
    nextPage: nextPageLocal
  } = usePagination(matchPlayers.home_team.players, filterNameHome);
  
  
  //pagination of away team players
  const [filterNameAway, setFilterNameAway] = useState("");
  const {
    currentPlayer: currentPlayerAway,
    currentPage: currentPageAway,
    totalPages: totalPagesAway,
    paginate: paginateAway,
    prevPage: prevPageAway,
    nextPage: nextPageAway
  } = usePagination(matchPlayers.away_team.players, filterNameAway);
  
 
  return (
    <div className="p-6 font-[Poppins] min-h-scree">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Formulario de estadísticas de partido</h2>
        <p className="mt-2">Desliza o filtra cada jugador para ingresar sus estadísticas</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 px-6 gap-6">
        {/* Equipo local */}  
        <div className="w-full bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            {matchPlayers.home_team.club_name}
          </h2>
          <img
            src={matchPlayers.home_team.club_logo}
            alt={`${matchPlayers.home_team.club_name} logo`}
            className="mx-auto mb-4 max-w-[120px]"
          />
          <div className="flex justify-center items-center gap-2 mb-2">
            <h3 className="text-gray-600 font-semibold">Filtro: </h3>
            <FilterPlayerToStatistics filterName={filterNameHome} setFilterName={setFilterNameHome} />
          </div>
          <div className="flex flex-col space-y-4">
            {currentPlayerLocal.length > 0 ? currentPlayerLocal.map((player) => (
              <div key={player.id} className="bg-blue-100 p-4 rounded-lg shadow-sm"> 
                <div className="flex justify-center">
                    <CardPlayer  player={player}/>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['goals_scored', 'assists', 'shots_on_target', 'completed_passes', 'duel_wins', 'ball_recoveries', 'blocks', 'fouls_drawn', 'fouls_committed', 'yellow_cards', 'red_cards', 'saves'].map((stat) => (
                    <div key={stat} className="flex flex-col">
                      <label className="text-sm text-gray-700 capitalize">{stat.replace('_', ' ')}</label>
                      <input
                        type="number"
                        name={`home_team.${player.id}.${stat}`}
                        value={formik.values.home_team[player.id]?.[stat] || 0}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        min="0"
                     />
                    </div>
                  ))}
                </div>
              </div>
            )): 
            <p className="mt-6 text-center font-semibold text-base text-red-600">
              No se encontraron jugadores que coincidan con el filtro.
            </p>   
            }
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPageLocal}
              totalPages={totalPagesLocal}
              maxPageNumbersToShow={5}
              paginate={paginateLocal}
              prevPage={prevPageLocal}
              nextPage={nextPageLocal}
            />
          </div>
        </div>
          
        {/* Equipo visitante */}
        <div className="w-full bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            {matchPlayers.away_team.club_name}
          </h2>
          <img
            src={matchPlayers.away_team.club_logo}
            alt={`${matchPlayers.away_team.club_name} logo`}
            className="mx-auto mb-4 max-w-[120px]"
          />
          <div className="flex justify-center items-center gap-2 mb-2">
            <h3 className="text-gray-600 font-semibold">Filtro: </h3>
            <FilterPlayerToStatistics filterName={filterNameAway} setFilterName={setFilterNameAway} />
          </div>
          <div className="grid grid-cols-1 gap-6">
            {currentPlayerAway.length > 0 ? currentPlayerAway.map((player) => (
              <div key={player.id} className="bg-blue-100 p-4 rounded-lg shadow-sm">
                <div className="flex justify-center">
                    <CardPlayer  player={player}/>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {['goals_scored', 'assists', 'shots_on_target', 'completed_passes', 'duel_wins', 'ball_recoveries', 'blocks', 'fouls_drawn', 'fouls_committed', 'yellow_cards', 'red_cards', 'saves'].map((stat) => (
                    <div key={stat} className="flex flex-col">
                      <label className="text-sm text-gray-700 capitalize">{stat.replace('_', ' ')}</label>
                      <input
                        type="number"
                        name={`away_team.${player.id}.${stat}`}
                        value={formik.values.away_team[player.id]?.[stat] || 0}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )): 
            <p className="mt-6 text-center font-semibold text-base text-red-600">
              No se encontraron jugadores que coincidan con el filtro.
            </p>     
            }
          </div>
          <div className="mt-6 flex justify-center">
            <Pagination
              currentPage={currentPageAway}
              totalPages={totalPagesAway}
              maxPageNumbersToShow={5}
              paginate={paginateAway}
              prevPage={prevPageAway}
              nextPage={nextPageAway}
            />
          </div>
        </div>
      </div>
          
      {/* Marcador del partido */}
      <h2 className="text-center mt-8 text-2xl font-bold">Marcador del partido</h2>
      <div className="flex justify-center items-center gap-6 mt-4">
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold text-gray-700">{matchPlayers.home_team.club_name}</label>
          <input
            type="number"
            name="score_home"
            value={formik.values.score_home}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-lg text-center text-lg font-bold w-20"
            min="0"
          />
        </div>
        <span className="text-2xl font-bold">-</span>
        <div className="flex flex-col items-center">
          <label className="text-lg font-semibold text-gray-700">{matchPlayers.away_team.club_name}</label>
          <input
            type="number"
            name="score_away"
            value={formik.values.score_away}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="p-2 border rounded-lg text-center text-lg font-bold w-20"
            min="0"
          />
        </div>
      </div>
          
      <div className="text-center mt-8">
        <button
          type="button"
          onClick={() => {
            tournament.type === "LEAGUE" ? navigate(`/tournaments/league/${tournament.id}`) 
            : tournament.type === "FRIENDLY" && navigate(`/tournaments/friendly/${tournament.id}`) 
          }}
          className="bg-gray-500 mb-2 font-semibold text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Regresar
        </button>
        <button
          type="button"
          onClick={formik.handleSubmit}
          className={`bg-indigo font-semibold text-white py-3 px-6 rounded-lg shadow-md hover:bg-indigo_dark transition ml-4 ${formik.isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={formik.isSubmitting}
        >
          Guardar Estadísticas
        </button>
      </div>
    </div>
  );
};

export const CardPlayer = ({ player }) => {
  return (
    <div className="bg-white w-[220px] h-[300px] flex flex-col gap-1 items-center overflow-hidden rounded-lg shadow-md p-2 mb-4">
      <div className="w-full h-[80%] overflow-hidden">
        <img
          src={player.photo}
          alt={`Foto de ${player.full_name}`}w
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <h2 className="text-lg font-semibold text-center">{player.full_name}</h2>
      <p className="text-sm text-gray-600">{player.position}</p>
    </div>
  );
}; 

export const FilterPlayerToStatistics = ({filterName, setFilterName}) => {
  return(
  <div className="flex flex-wrap gap-4">
    <input
      type="text"
      placeholder="Nombre del jugador"
      value={filterName}
      onChange={(e) => {setFilterName(e.target.value)}}
      className="pl-4 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo transition-all w-60"
    />
</div>
  );
}