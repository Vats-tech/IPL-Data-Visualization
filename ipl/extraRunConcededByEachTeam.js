// ------Saurabh Kumar Vats------

// IN 2016 IPL
function extraRunConcededByEachTeam(deliveries,matchesPlayedPerYear,matches){
    let matchIdfrom=0;
    let matchIdTill=0;
    const result ={};
    for(let match of matches){
        if(parseInt(match.season) == 2016){
            matchIdfrom = parseInt(match.id);
            break;
        }
    }
    matchIdTill=matchIdfrom+matchesPlayedPerYear["2015"];
    // console.log(matchId);
    // console.log(till);
    for(let currMatchId of deliveries){
        let comparision =parseInt(currMatchId.match_id);
        if(comparision >= parseInt(matchIdfrom) && comparision <= parseInt(matchIdTill)){
            const bowling_team = currMatchId.bowling_team;
           if(result[bowling_team]){
               result[bowling_team]+=parseInt(currMatchId.extra_runs);
           }else{
            result[bowling_team]=parseInt(currMatchId.extra_runs);
           }
        }
    }
    return result;
}
module.exports = extraRunConcededByEachTeam;