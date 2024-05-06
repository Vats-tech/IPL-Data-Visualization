// --------Saurabh Kumar Vats--------

// fetching the json data from data.json file
function fetchAndVisualizeData() {
  fetch("./data.json")
    .then((r) => r.json())
    .then(visualizeData);
}

fetchAndVisualizeData();

// Visuallize Data
function visualizeData(data) {
  // Matches Played Per Year
  visualizeMatchesPlayedPerYear(data.matchesPlayedPerYear);

  // Matches won by each team Per Year
  const obj = constructingDataForMatchesWonByEachTeam(
    data.matchesWonByEachTeam
  );
  const wonData = [];
  for (i in obj) {
    ((w = {}).name = i), (w.data = obj[i]), wonData.push(w);
  }
  visualizeMatchesWonByEachTeam(data.matchesWonByEachTeam, wonData);

  // Extra Run conceded by each team in IPL 2015
  visualizeExtraRunConcededByEachTeam(data.extraRunConcededByEachTeam);

  // Bowlers Economy
  visualizeBowlersEconomy(data.bowlersEconomy);

  // Matches won by each team per venue
  const obj1 = constructingDataForWonMatchPerVenue(
    data.matchesWonByEachTeamPerVenue
  );
  const matchesPerVenue = [];
  for (i in obj1) {
    ((w = {}).name = i), (w.data = obj1[i]), matchesPerVenue.push(w);
  }
  visulizeMatchesWonByEachTeamPerVenue(
    matchesPerVenue,
    data.matchesWonByEachTeamPerVenue
  );
  return;
}

// Visualize data using Highcharts Graph
// 1st----------------------------------
function visualizeMatchesPlayedPerYear(matchesPlayedPerYear) {
  const seriesData = [];
  for (let year in matchesPlayedPerYear) {
    seriesData.push([year, matchesPlayedPerYear[year]]);
  }
  Highcharts.chart("matches-played-per-year", {
    chart: {
      type: "column",
    },
    title: {
      text: "1. Number of matches played per year.",
    },
    subtitle: {
      text: 'Source: <a href="https://www.kaggle.com/nowke9/ipldata/data">IPL Dataset</a>',
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Matches : <b>{point.y} </b>",
    },
    series: [
      {
        name: "Years",
        data: seriesData,

        dataLabels: {
          enabled: true,
          //   rotation: -90,
          color: "#FFFFFF",
          align: "center",
          format: "{point.y}", // one decimal
          y: 25, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}

// 2nd----------------------------
function constructingDataForMatchesWonByEachTeam(matchesWonByEachTeam) {
  const obj = {};
  var teamName = {};
  for (let i in matchesWonByEachTeam) {
    for (let team in matchesWonByEachTeam[i]) {
      if (team == "") {
        team = "noResult";
      }
      if (!teamName[team]) {
        obj[team] = [];
        teamName[team] = true;
      }
    }
  }
  for (let i in matchesWonByEachTeam) {
    for (let team in matchesWonByEachTeam[i]) {
      if (team == "") {
        team = "noResult";
        obj[team].push(matchesWonByEachTeam[i][""]);
      } else obj[team].push(matchesWonByEachTeam[i][team]);
      teamName[team] = false;
    }
    for (let teamStatus in teamName) {
      if (teamName[teamStatus] == true) {
        obj[teamStatus].push(0);
      }
      teamName[teamStatus] = true;
    }
  }
  return obj;
}
function visualizeMatchesWonByEachTeam(matchesWonByEachTeam, obj) {
  Highcharts.chart("matches-won-by-each-team", {
    chart: {
      type: "column",
    },
    title: {
      text: "2. Number of matches won by each team each year",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      categories: Object.keys(matchesWonByEachTeam),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches Won",
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y} </b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: obj,
  });
}

// 3rd-----------------------------------------------------------------------
function visualizeExtraRunConcededByEachTeam(extraRunConcededByEachTeam) {
  const currData = [];
  for (let team in extraRunConcededByEachTeam) {
    currData.push([team, extraRunConcededByEachTeam[team]]);
  }

  Highcharts.chart("extra-run-conceded-by-each-team", {
    chart: {
      type: "column",
    },
    title: {
      text: "3. Extra run conceded by each team in IPL-2016",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Extra Runs",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Extra Runs : <b>{point.y} </b>",
    },
    series: [
      {
        name: "Team",
        data: currData,

        dataLabels: {
          enabled: true,
          //   rotation: -90,
          color: "#FFFFFF",
          align: "center",
          format: "{point.y}", // one decimal
          y: 25, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}

// 4th---------------------------------------------------------------------------------
function sortFunction(a, b) {
  if (a[1] === b[1]) {
    return 0;
  } else {
    return a[1] < b[1] ? -1 : 1;
  }
}
function visualizeBowlersEconomy(bowlersData) {
  let bowlersEconomy = [];
  for (let data in bowlersData) {
    let economy =
      (bowlersData[data].totalRuns * 6) / bowlersData[data].noOfBall;
    bowlersEconomy.push([data, economy]);
  }
  bowlersEconomy.sort(sortFunction);
  bowlersEconomy = bowlersEconomy.slice(0, 10);
  Highcharts.chart("bowlers-economy", {
    chart: {
      type: "column",
    },
    title: {
      text: "4. Top Economical Bowlers in 2015 IPL",
    },
    subtitle: {
      text: "Source: ipl.com",
    },
    xAxis: {
      type: "category",
      labels: {
        rotation: -45,
        style: {
          fontSize: "13px",
          fontFamily: "Verdana, sans-serif",
        },
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "Economy",
      },
    },
    legend: {
      enabled: false,
    },
    tooltip: {
      pointFormat: "Economy : <b>{point.y:.2f} </b>",
    },
    series: [
      {
        name: "Economy",
        data: bowlersEconomy,

        dataLabels: {
          enabled: true,
          //   rotation: -90,
          color: "#FFFFFF",
          align: "center",
          format: "{point.y:.2f}", // one decimal
          y: 25, // 10 pixels down from the top
          style: {
            fontSize: "13px",
            fontFamily: "Verdana, sans-serif",
          },
        },
      },
    ],
  });
}

// 5th----------------------------------------------------
function constructingDataForWonMatchPerVenue(matches) {
  let teamName = [];

  const venue = Object.keys(matches);
  const result = {};
  let helper = new Set();
  for (let venueName of venue) {
    for (let t of Object.keys(matches[venueName])) helper.add(t);
  }
  teamName = helper;
  for (let t of teamName) {
    result[t] = [];
  }
  for (let venueName of venue) {
    for (let t of teamName) {
      if (matches[venueName][t]) {
        result[t].push(matches[venueName][t]);
      } else {
        result[t].push(0);
      }
    }
  }
  return result;
}

function visulizeMatchesWonByEachTeamPerVenue(matchesPerVenue, matches) {
  Highcharts.chart("matches-won-per-venue", {
    chart: {
      type: "bar",
    },
    title: {
      text: "5. Story: Matches Won by each team per venue",
    },
    xAxis: {
      categories: Object.keys(matches),
    },
    yAxis: {
      min: 0,
      title: {
        text: "Matches won vs stadium",
      },
    },
    legend: {
      reversed: true,
    },
    plotOptions: {
      series: {
        stacking: "normal",
      },
    },
    series: matchesPerVenue,
  });
}
