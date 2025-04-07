import React, { useState, useEffect } from "react";
import { StatisticCard } from "./StatisticCard";
import { playerTheMostScore, playerOfTheMatch } from "./utils/statisticsOfMatchFunctions";
import { Pagination } from "../utils/Pagination";

export const StatisticsContainer = ({ statistics }) => {
  const bestPlayer = playerOfTheMatch(statistics);

  const isAllZero = (player) => {
    if (!player) return true;
    return (
      (player.goals_scored || 0) === 0 &&
      (player.assists || 0) === 0 &&
      (player.shots_on_target || 0) === 0 &&
      (player.completed_passes || 0) === 0 &&
      (player.duel_wins || 0) === 0 &&
      (player.ball_recoveries || 0) === 0 &&
      (player.blocks || 0) === 0 &&
      (player.fouls_drawn || 0) === 0 &&
      (player.saves || 0) === 0 &&
      (player.fouls_committed || 0) === 0 &&
      (player.yellow_cards || 0) === 0 &&
      (player.red_cards || 0) === 0
    );
  };
  
  const allStats = [
    ...(!bestPlayer || isAllZero(bestPlayer)
      ? []
      : [
          {
            player: bestPlayer,
            title: "Jugador del Partido",
            subtitle: null,
            score: null,
          },
        ]),
    {
      player: playerTheMostScore(statistics, "goals_scored"),
      title: "Máximo Goleador",
      subtitle: "Goles Anotados",
      score: "goals_scored",
    },
    {
      player: playerTheMostScore(statistics, "assists"),
      title: "Máximo Asistidor",
      subtitle: "Asistencias",
      score: "assists",
    },
    {
      player: playerTheMostScore(statistics, "completed_passes"),
      title: "Más pases completados",
      subtitle: "Pases",
      score: "completed_passes",
    },
    {
      player: playerTheMostScore(statistics, "ball_recoveries"),
      title: "Más recuperaciones",
      subtitle: "Recuperación de balón",
      score: "ball_recoveries",
    },
    {
      player: playerTheMostScore(statistics, "duel_wins"),
      title: "Más duelos ganados",
      subtitle: "Duelos ganados",
      score: "duel_wins",
    },
    {
      player: playerTheMostScore(statistics, "shots_on_target"),
      title: "Más tiros al arco",
      subtitle: "Tiros al arco",
      score: "shots_on_target",
    },
  ];
  
  const stats = allStats.filter(stat => stat.player && (stat.score === null || stat.player[stat.score] > 0));  

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 3;
  const totalPages = Math.ceil(stats.length / cardsPerPage);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages > 0 ? totalPages : 1);
    }
  }, [stats.length, currentPage, totalPages]);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = stats.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col items-center mt-6 font-[Poppins] w-full">
      {stats.length > 0 && (
        <div className="w-full shadow-md py-3 mb-4">
          <h2 className="text-3xl font-bold text-center">Best Players</h2>
        </div>
      )}
  
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {currentCards.map((stat, index) => (
          <StatisticCard
            key={index}
            player={stat.player}
            title={stat.title}
            subtitle={stat.subtitle}
            score={stat.score}
          />
        ))}
      </div>
  
      {stats.length > cardsPerPage && (
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
