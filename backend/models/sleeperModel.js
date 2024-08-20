const sleeperRequests = require("../utils/sleeperRequests");
const axios = require("axios");

const dynamicGet = async (req) => {
  const { title: originalTitle } = req.params;
  const { query: originalQuery } = req;

  const endpoint = sleeperRequests.find(({ title }) => title === originalTitle);

  if (!endpoint || !endpoint.enabled) {
    return {
      status: 404,
      data: "Endpoint not found or disabled",
    };
  }

  const { requestDetails } = endpoint;

  let url = requestDetails.url;

  if (requestDetails.queryParams) {
    for (const param of requestDetails.queryParams) {
      if (
        !originalQuery.hasOwnProperty(param) ||
        originalQuery[param] === "null" ||
        originalQuery[param] === "undefined" ||
        !originalQuery[param]
      ) {
        return {
          status: 400,
          data: `Query parameter ${param} missing from request`,
        };
      }
    }

    for (const param of requestDetails.queryParams) {
      url = url.replace(`{${param}}`, originalQuery[param]);
    }
  }

  try {
    let response;
    if (requestDetails.method === "GET") {
      response = await axios.get(url);
    } else if (requestDetails.method === "POST") {
      response = await axios.post(url, requestDetails.payload);
    }

    return {
      status: 200,
      data: response.data,
    };
  } catch (error) {
    console.error("Model Error:", error.message);
    return {
      status: 500,
      data: error,
    };
  }
};

module.exports = dynamicGet;
