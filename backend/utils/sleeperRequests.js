const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;
const footballYear =
  thisMonth === 1 || thisMonth === 2 ? thisYear - 1 : thisYear;
const lastFootballYear = footballYear - 1;

const sleeperRequests = [
  {
    title: "getUserInfo",
    enabled: true,
    requestDetails: {
      url: "https://api.sleeper.app/v1/user/{userId}",
      method: "GET",
      graphQl: false,
      queryParams: ["userId"],
    },
  },
  {
    title: "getDraftInfo",
    enabled: true,
    requestDetails: {
      url: "https://api.sleeper.app/v1/draft/{draftId}",
      method: "GET",
      graphQl: false,
      queryParams: ["draftId"],
    },
  },
  {
    title: "getDraftPicks",
    enabled: true,
    requestDetails: {
      url: "https://api.sleeper.app/v1/draft/{draftId}/picks",
      method: "GET",
      graphQl: false,
      queryParams: ["draftId"],
    },
  },
  {
    title: "getAllPlayers",
    enabled: true,
    requestDetails: {
      method: "GET",
      graphQl: false,
      url: "https://api.sleeper.com/projections/nfl/{year}?season_type=regular&position[]=DEF&position[]=QB&position[]=RB&position[]=TE&position[]=WR&order_by=adp_ppr",
      queryParams: ["year"],
    },
  },
  {
    title: "getLastYearStats", //FIELD IS pts_ppr
    enabled: true,
    requestDetails: {
      method: "GET",
      graphQl: false,
      url: `https://api.sleeper.com/stats/nfl/player/{playerId}?season_type=regular&season=${lastFootballYear}`,
      queryParams: ["playerId"],
    },
  },
  {
    title: "getPlayerStatsByWeek",
    enabled: true,
    requestDetails: {
      method: "GET",
      graphQl: false,
      url: "https://api.sleeper.com/stats/nfl/player/{playerId}?season_type=regular&season={year}&grouping=week",
      queryParams: ["playerId", "year"],
    },
  },
  {
    title: "getMyFavorites",
    enabled: false,
    requestDetails: {
      method: "POST",
      graphQl: true,
      url: "https://sleeper.com/graphql?=",
      payload: {
        operationName: "watched_players",
        variables: {},
        query:
          'query watched_players {\n        watched_players(sport: "nfl"){\n          player_id\n        }\n      }',
      },
    },
  },
  {
    title: "getTeamDepthChart",
    enabled: true,
    requestDetails: {
      method: "GET",
      graphQl: false,
      url: "https://api.sleeper.com/players/nfl/{team}/depth_chart",
      queryParams: ["team"],
    },
  },
  {
    title: "getTeamMetaData",
    enabled: true,
    requestDetails: {
      method: "POST",
      graphQl: true,
      url: "https://sleeper.com/graphql?=",
      payload: {
        operationName: "teams",
        variables: {},
        query:
          'query teams {\n        teams(sport: "nfl"){\n          active\n          aliases\n          metadata\n          name\n          sport\n          team\n        }\n      }',
      },
    },
  },
  {
    title: "getSchedule",
    enabled: true,
    requestDetails: {
      method: "GET",
      graphQl: false,
      url: "https://api.sleeper.com/schedule/nfl/regular/{year}",
      queryParams: ["year"],
    },
  },
];

module.exports = sleeperRequests;
