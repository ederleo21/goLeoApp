import { useState, useEffect, useMemo } from "react"

const usePagination = (players, filterName) => {
    const [currentPage, setCurrentPage] = useState(1);
    const playerPerPage = 1;

    const filteredPlayers = useMemo(() => {
        return players.filter((player) => {
            return filterName ? player.full_name.trim().toLowerCase().includes(filterName.trim().toLowerCase()) : true;
        });
    }, [players, filterName])

    useEffect(() => {
        setCurrentPage(1);
    }, [filterName]);

    const totalPages = Math.ceil(filteredPlayers.length / playerPerPage)
    const indexOfLastPlayer = currentPage * playerPerPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playerPerPage
    const currentPlayer = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer)

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1))
    const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  
  return {
    currentPlayer,
    currentPage,
    totalPages,
    paginate,
    prevPage,
    nextPage
  }
}

export default usePagination;
