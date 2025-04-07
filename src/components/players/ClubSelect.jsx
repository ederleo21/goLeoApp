import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getClubs } from '../../api/clubApi';
import { Loading } from '../utils/Loading';
import { ErrorMessage } from '../utils/ErrorMessage';
import { setSelectedClub } from '../../slices/playerSlice';
import CustomSelect from './CustomSelect';

export const ClubSelect = () => {
  
  const dispatch = useDispatch();
  const { clubs, status, error } = useSelector(state => state.clubs);
  const { selectedClub } = useSelector(state => state.players);

  useEffect(() => {
    dispatch(getClubs());
  }, [dispatch]);

  const handleChange = (clubId) => {
    dispatch(setSelectedClub(clubId));
  };

  if (error) return <ErrorMessage message={`Error: ${error}`} />;
  if (status === 'Loading') return <Loading />;

  return (
    <CustomSelect
      clubs={clubs}
      selectedClub={selectedClub}
      handleChange={handleChange}
    />
  );
};







