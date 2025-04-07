
export function playerTheMostScore(statistics, score) {

    if (!statistics || 
        !Array.isArray(statistics.home_team_statistics) || 
        !Array.isArray(statistics.away_team_statistics) || 
        statistics.home_team_statistics.length === 0 || 
        statistics.away_team_statistics.length === 0){
        return null;
    }

    let objectMaxLocal = statistics.home_team_statistics[0]; 
    statistics.home_team_statistics.forEach((player) => {
        if (player[score] > objectMaxLocal[score]) {
            objectMaxLocal = player;
        }
    });

    let objectMaxAway = statistics.away_team_statistics[0];
    statistics.away_team_statistics.forEach((player) => {
        if(player[score] > objectMaxAway[score]){
            objectMaxAway = player;
        }
    })

    return objectMaxAway[score] > objectMaxLocal[score] ? objectMaxAway : objectMaxLocal;
}

export function playerOfTheMatch(statistics) {
    if (!statistics || 
        !Array.isArray(statistics.home_team_statistics) || 
        !Array.isArray(statistics.away_team_statistics) || 
        statistics.home_team_statistics.length === 0 || 
        statistics.away_team_statistics.length === 0){
        return null;
    }

    const calculateScore = (player) => {
        return (
            (player.goals_scored || 0) * 10 +
            (player.assists || 0) * 7 +
            (player.shots_on_target || 0) * 4 +
            (player.completed_passes || 0) * 1 +
            (player.duel_wins || 0) * 3 +
            (player.ball_recoveries || 0) * 3 +
            (player.blocks || 0) * 4 +
            (player.fouls_drawn || 0) * 2 +
            (player.saves || 0) * 5 - 
            (player.fouls_committed || 0) * 2 -
            (player.yellow_cards || 0) * 5 -
            (player.red_cards || 0) * 10
        );
    };
    
    let bestPlayer = null;
    let highestScore = -Infinity;

    const allPlayers = [...statistics.home_team_statistics, ...statistics.away_team_statistics];

    allPlayers.forEach(player => {
        const score = calculateScore(player);
        if (score > highestScore) {
            highestScore = score;
            bestPlayer = player;
        } else if (score === highestScore) {
            if ((player.goals_scored || 0) > (bestPlayer.goals_scored || 0) ||
                (player.red_cards || 0) < (bestPlayer.red_cards || 0)) {
                bestPlayer = player;
            }
        }
    });
    
    return bestPlayer;
}





























