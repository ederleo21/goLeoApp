import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getClubs } from '../../api/clubApi'
import { Loading } from '../../components/utils/Loading'
import { ErrorMessage } from '../../components/utils/ErrorMessage'
import { CardsClub } from '../../components/clubs/CardsClub'
import { NamePag } from '../../components/utils/NamePag'
import { GiCrenulatedShield } from "react-icons/gi";

export const Clubs = () => {

  const dispatch = useDispatch()

  const { clubs, status, error } = useSelector((state) => state.clubs)

  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch])

  if (status === "loading") return <Loading/>
  if(error) return <ErrorMessage message={`Error: ${error}`} />
  
  return (
    <div className="min-h-screen bg-zinc-50 py-14">
      <NamePag title={"Clubs"} icon={<GiCrenulatedShield className='text-3xl'/>}/>
      <CardsClub clubs={clubs}/>
    </div>
  )
}

