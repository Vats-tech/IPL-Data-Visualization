// --------Saurabh Kumar Vats--------

function matchesWonByEachTeam(matches){
    const result={};
    var helper ={};
    var curr_season=2008;
    for(let match of matches){
        const winner = match.winner; 
        const season = match.season;
        if(curr_season!=season){
            result[curr_season]=helper;
            helper={};
            curr_season=season;
        }
            if(helper[winner])
            helper[winner]+=1;
            else
            helper[winner]=1;
            curr_season = season;
            
    }
    result[curr_season]=helper;
    return result;
}
module.exports = matchesWonByEachTeam;