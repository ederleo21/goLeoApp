import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getClubByid } from '../../api/clubApi'
import { Loading } from '../../components/utils/Loading';
import { ErrorMessage } from '../../components/utils/ErrorMessage';
import { TableClub } from '../../components/clubs/TableClub';
import { ClubStatsHeader } from '../../components/clubs/ClubStatsHeader';
import { BackButton } from '../../components/utils/BackButton';

export const Club = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { currentClub, status, error } = useSelector(state => state.clubs)

    useEffect(() => {
        dispatch(getClubByid(id));
    }, [dispatch, id])

    if (status === "loading" || !currentClub) return <Loading/>
    if(error) return <ErrorMessage message={`Error: ${error}`} />

  return (
    <div className="min-h-screen py-8 pt-4 bg-gradient-to-r from-blue-50 to-blue-100"> 
        <BackButton url="/clubs"/>
        <ClubStatsHeader club={currentClub}/>
        <TableClub club={currentClub}/>
    </div>
  )
}
