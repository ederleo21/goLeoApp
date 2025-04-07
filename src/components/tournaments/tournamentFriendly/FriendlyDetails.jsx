import React, { useState } from 'react';
import { TournamentDetailsHeader } from '../TournamentDetailsHeader';
import { ClubsPositionsTableModal } from '../ClubsPositionsTableModal';
import { SectionsMenu } from '../../performances/SectionsMenu';

export const FriendlyDetails = ({ tournament, clubsStatistics }) => {
  const [openTableModal, setOpenTableModal] = useState(false);
  
return(
  <>
  <TournamentDetailsHeader
  tournament={tournament}
  />
  
  <SectionsMenu setOpenTableModal={setOpenTableModal} tournament={tournament} />

  {openTableModal && (
    <ClubsPositionsTableModal statistics={clubsStatistics} pointsSystem={{"victory": 3, "draw": 1, "loss": 0}} onClose={() => setOpenTableModal(false)} />
  )}
  </>
);
}


