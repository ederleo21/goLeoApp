import React from 'react'
import { ClubSelect } from '../../components/players/ClubSelect'
import { CardsPlayers } from '../../components/players/CardsPlayers'
import { NamePag } from '../../components/utils/NamePag'
import { GiBabyfootPlayers } from "react-icons/gi";

export const Players = () => {

  return (
   <div className='min-h-screen bg-zinc-50 py-14'>
      <NamePag title={"Jugadores"} icon={<GiBabyfootPlayers className='text-4xl'/>}/>
      <ClubSelect/>
      <CardsPlayers/>
   </div>
  )
}








