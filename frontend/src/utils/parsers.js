export const parseDraftInfo = (draftInfoRes) => {
  const { draft_id, draft_order, last_picked, status } = draftInfoRes;
  return {
    draftId: draft_id,
    draftOrder: draft_order,
    lastPicked: last_picked,
    status,
  };
};

export const parseDraftPicks = (draftPicksRes) => {
  return draftPicksRes.map((pick) => {
    const { round, pick_no, picked_by, player_id, metadata } = pick;
    const { first_name, last_name, position, team, years_exp } = metadata;

    return {
      round,
      pickNumber: pick_no,
      pickedBy: picked_by,
      playerId: player_id,
      firstName: first_name,
      lastName: last_name,
      position,
      team,
      isRookie: years_exp === 0,
    };
  });
};
