// -----Saurabh Kumar Vats-----

const fs = require("fs");
const csv = require("csvtojson");
const matchesPlayedPerYear = require("./ipl/matchesPlayedPerYear");
const matchesWonByEachTeam = require("./ipl/matchesWonByEachTeam");
const extraRunConcededByEachTeam = require("./ipl/extraRunConcededByEachTeam");
const bowlersEconomy = require("./ipl/bowlersEconomy");
const matchesWonByEachTeamPerVeue = require("./ipl/matchesWonByEachTeamPerVenue");

const MATCHES_FILE_PATH = "./csv_data/matches.csv";
const DELIVERIES_FILE_PATH = "./csv_data/deliveries.csv";
const JSON_FILE_PATH = "./public/data.json";

// getting data from matches.csv file and

function main() {
  csv()
    .fromFile(MATCHES_FILE_PATH)
    .then((matches) => {
      let result1 = matchesPlayedPerYear(matches);
      let result2 = matchesWonByEachTeam(matches);
      main_one(matches, result1, result2);
    });
}

// getting data from deliveries.csv file

function main_one(matches, result1, result2) {
  csv()
    .fromFile(DELIVERIES_FILE_PATH)
    .then((deliveries) => {
      let result3 = extraRunConcededByEachTeam(deliveries, result1, matches);
      let result4 = bowlersEconomy(deliveries, result1, matches);
      let result5 = matchesWonByEachTeamPerVeue(matches);
      saveAllMatchData(result1, result2, result3, result4, result5);
    });
}

// Writing Data to File in JSON form

function saveAllMatchData(
  NoOfMatches,
  wonMatches,
  extraRun,
  economy,
  matcehsWonPerVenue
) {
  const jsonData = {
    matchesPlayedPerYear: NoOfMatches,
    matchesWonByEachTeam: wonMatches,
    extraRunConcededByEachTeam: extraRun,
    bowlersEconomy: economy,
    matchesWonByEachTeamPerVenue: matcehsWonPerVenue,
  };
  const jsonString = JSON.stringify(jsonData);
  fs.writeFile(JSON_FILE_PATH, jsonString, "utf8", (err) => {
    if (err) {
      console.log(err);
    }
  });
}

main();
