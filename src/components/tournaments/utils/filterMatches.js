
// Function which filter matches in league and friendly tournament.
export function filterMatches(matches, filterState, filterClub, isLeagueFilter, filterNumberRound){
    
    const matchesFiltered = matches.filter((match) => {

        const clubMatch = filterClub ? (match.home_team === Number(filterClub) || match.away_team === Number(filterClub)) : true;
        const stateMatch = filterState ? match.state === filterState : true;
        const roundMatch = (isLeagueFilter && filterNumberRound) ? Number(match.round) === Number(filterNumberRound) : true;

        return clubMatch && stateMatch && roundMatch;})
    
    return matchesFiltered;
}



