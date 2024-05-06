// --------Saurabh Kumar Vats--------

function matchesWonByEachTeamPerVenue(matches) {
  const result = {};
  for (let match of matches) {
    const wonTeam = match.winner;
    const venue = String(match.venue);
    if (result[venue]) {
      if (result[venue][wonTeam]) {
        result[venue][wonTeam] += 1;
      } else {
        result[venue][wonTeam] = 1;
      }
    } else {
      result[venue] = {};
      result[venue][wonTeam] = 1;
    }
  }
  return result;
}
module.exports = matchesWonByEachTeamPerVenue;
