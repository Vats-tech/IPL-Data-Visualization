//-------Saurabh Kumar Vats------

// IN 2015 IPL
function bowlersEconomy(deliveries,matchesPlayedPerYear,matches){
    let matchIdfrom=0;
    let matchIdTill=0;
    const result ={};
    for(let match of matches){
        if(parseInt(match.season) == 2015){
            matchIdfrom = parseInt(match.id);
            break;
        }
    }
    matchIdTill=matchIdfrom+matchesPlayedPerYear["2015"];
    
    // console.log(matchIdfrom);
    // console.log(matchIdTill);
    for(let currMatchId of deliveries){
        let comparision =parseInt(currMatchId.match_id);
        if( comparision >= matchIdfrom && comparision < matchIdTill){
            const bowlersName = currMatchId.bowler;
            const totalRunConceded =currMatchId.total_runs;
            const NoOfBallBowled =currMatchId.ball;
            if(result[bowlersName]){
                result[bowlersName].totalRuns+=parseInt(totalRunConceded);
                if(NoOfBallBowled <= 6)
                result[bowlersName].noOfBall+=1;
            }
            else{
                result[bowlersName]={};
                result[bowlersName].totalRuns=parseInt(totalRunConceded);
                result[bowlersName].noOfBall=1;
            }
        }
    }
    return result;
}
module.exports = bowlersEconomy;