import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getPlayerById } from '../../api/playersApi'
import { Loading } from '../../components/utils/Loading'
import { ErrorMessage } from '../../components/utils/ErrorMessage'
import { NotFound } from '../NotFound'
import { ProfilePlayer } from '../../components/players/ProfilePlayer';
import { BackButton } from '../../components/utils/BackButton'

export const Player = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentPlayer, status, error } = useSelector(state => state.players)

    useEffect(() => {
        dispatch(getPlayerById(id))
    }, [dispatch, id])

    if (status === "loading") return <Loading/>
    if(!currentPlayer) return <NotFound/>
    if(error) return <ErrorMessage message={`Error: ${error}`} />

  return (
    <div className='py-8 bg-gradient-to-r from-blue-50 to-blue-100'>
      <BackButton url="/players"/>
      <ProfilePlayer player={currentPlayer}/>
    </div>
  )
}



