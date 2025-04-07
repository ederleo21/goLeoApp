import React, { useEffect } from 'react'
import { TableTournaments } from '../../components/performances/TableTournaments'
import { useDispatch, useSelector } from 'react-redux'
import { getTournaments } from '../../api/tournamentApi'
import { Loading } from '../../components/utils/Loading'
import { ErrorMessage } from '../../components/utils/ErrorMessage'
import { NamePag } from '../../components/utils/NamePag'
import { SiCodefactor } from "react-icons/si";
import { HeaderPerformances } from '../../components/performances/HeaderPerformances'
import { toast } from 'react-toastify'

export const Performances = () => {
  const dispatch = useDispatch();
  const { tournaments, status, error } = useSelector(state => state.tournaments);

  useEffect(() => {
    const fetchTournaments = async() => {
      try{
        await dispatch(getTournaments());
      }catch(error){
        toast.error("Ha ocurrido un error, vuelve más tarde");
      }
    }
    fetchTournaments();
  }, [])

    if(status === "loading") return <Loading/>
    if(error) return <ErrorMessage message={error.message}/>
    
  return (
    <div className='min-h-screen bg-zinc-50 pb-10'>
    <NamePag title={"Estadísticas"} icon={<SiCodefactor/>}/>
    <HeaderPerformances/>
    <TableTournaments tournaments={tournaments} />
    </div>
  )
}
