import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPlayers } from '../../api/playersApi';
import { Loading } from '../utils/Loading';
import { ErrorMessage } from '../utils/ErrorMessage';
import { CardPlayer } from './CardPlayer';
import { Pagination } from '../utils/Pagination';
import { NavLink } from 'react-router-dom';
import { FiltersPlayers } from './FiltersPlayers';
import { getPositions } from '../../api/positionApi';
import { UserContext } from '../../context/userContext';
import { useContext } from 'react';

export const CardsPlayers = () => {
  const dispatch = useDispatch();
  const { players, status, error, selectedClub } = useSelector((state) => state.players);
  const { user, loading } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [transition, setTransition] = useState(true);
  const [searchTermFirstName, setSearchTermFirstName] = useState('')
  const [searchTermLastName, setSearchTermLastName] = useState('')
  const [activeFilter, setActiveFilter] = useState('')
  const [positions, setPositions] = useState([])
  const [positionFilter, setPositionFilter] = useState(0)

  const playersPerPage = 4;
  const maxPageNumbersToShow = 5;

  useEffect(() => {
    const fetchPositionsAndPlayers = async() => {
      try{
        if (selectedClub) {
          await dispatch(getAllPlayers(selectedClub));
          const res = await getPositions()
          setPositions(res)
        }
      }catch(error){
        console.error("Error al obtener posiciones o jugadores", error)
      }
    }
    fetchPositionsAndPlayers();
  }, [dispatch, selectedClub]);

  // Animación de paginado
  useEffect(() => {
    setTransition(true);
    const timer = setTimeout(() => setTransition(false), 100);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredPlayers.length / playersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Filtrar jugadores por nombre
  const filteredPlayers = players.filter((player) => {
    const matchesSearchFirstName = searchTermFirstName
    ? player.first_name.toLowerCase().includes(searchTermFirstName.toLowerCase())
    : true;
    const matchesSearchLastName = searchTermLastName
    ? player.last_name.toLowerCase().includes(searchTermLastName.toLowerCase())
    : true;
    const matchesActiveFilter = activeFilter
    ? activeFilter === "active"
      ? player.active
      : !player.active
    : true;
    const matchesPositionFilter = positionFilter
    ? player.position.id == positionFilter
    : true;
    return matchesSearchFirstName && matchesSearchLastName && matchesActiveFilter && matchesPositionFilter;
  });

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const totalPages = Math.ceil(filteredPlayers.length / playersPerPage);

  if (!selectedClub) {
    return (
      <p className="text-center font-semibold font-[Poppins] mt-4">
        Por favor, selecciona un club para consultar sus jugadores
      </p>
    );
  }

  if (loading || status === 'loading') return <Loading/>
  if(error) return <ErrorMessage message={`Error: ${error}`} />

  return (
      <div className="p-4 font-[Poppins] flex flex-col items-center">
        {selectedClub && (
          <div className="w-full flex flex-wrap items-center justify-center gap-4 mb-4">
            { user.permissions.add_player &&
            <NavLink to="create">
              <button className="bg-indigo font-semibold text-white px-4 py-2 rounded-md hover:bg-indigo_dark">
                Añadir jugador
              </button>
            </NavLink>
            }
    
            {/* Mostrar filtros solo si hay jugadores */}
            {players.length > 0 && (
              <FiltersPlayers
                searchTermFirstName={searchTermFirstName}
                setSearchTermFirstName={setSearchTermFirstName}
                searchTermLastName={searchTermLastName}
                setSearchTermLastName={setSearchTermLastName}
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
                positions={positions}
                positionFilter={positionFilter}
                setPositionFilter={setPositionFilter}
              />
            )}
          </div>
        )}
    
        {/* Mostrar mensajes y contenido según la condición */}
        {selectedClub ? (
          players.length === 0 ? (
            // Mensaje si no hay jugadores en el club seleccionado
            <p className="mb-6 font-semibold text-lg text-gray-700">
              No hay jugadores para este club.
            </p>
          ) : filteredPlayers.length > 0 ? (
            // Mostrar lista de jugadores si hay resultados del filtro
            <>
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-screen-xl mx-auto transition-transform duration-300 ease-in-out transform ${
                  transition ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
              >
                {currentPlayers.map((player) => (
                  <CardPlayer key={player.id} player={player} />
                ))}
              </div>
    
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  maxPageNumbersToShow={maxPageNumbersToShow}
                  paginate={paginate}
                  prevPage={prevPage}
                  nextPage={nextPage}
                />
              </div>
            </>
          ) : (
            // Mensaje si los filtros no coinciden con ningún jugador
            <p className="mt-6 font-semibold text-base text-red-600">
              No se encontraron jugadores que coincidan con el filtro.
            </p>
          )
        ) : (
          // Mensaje si no hay club seleccionado
          <p className="mt-6 font-semibold text-lg text-gray-700">
            Selecciona un club para ver los jugadores.
          </p>
        )}
      </div>
    );     
};