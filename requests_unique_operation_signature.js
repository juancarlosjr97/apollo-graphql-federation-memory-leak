import http from "k6/http";
import { check } from "k6";

const APOLLO_GATEWAY = "http://localhost:4000";

const TOTAL_INNER_OPERATIONS = 40;

const generateAlphanumericId = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
};

const getRequestQuery = () => {
  const uniqueIds = new Set();

  while (uniqueIds.size < TOTAL_INNER_OPERATIONS) {
    const newId = generateAlphanumericId(8);
    uniqueIds.add(newId);
  }

  const ids = Array.from(uniqueIds);

  const variablesRequest = {};

  ids.forEach((item) => {
    variablesRequest[`byTypeId_${item}`] = item;
  });

  const queryTemplate = `
    query ByType($variables) {
      $queries
    }
  `;

  const variableTemplate = "$byTypeId_$key: String!";

  const querySubTemplate = `
    getData_$key: getData {
      byType(id: $byTypeId_$key, countryCode: $countryCode, language: $language) {
        name
        type
      }
    }
  `;

  const variables = [];
  const queries = [];

  for (const key of ids) {
    variables.push(variableTemplate.replace(new RegExp("\\$key", "g"), key));

    queries.push(querySubTemplate.replace(new RegExp("\\$key", "g"), key));
  }

  variables.push("$countryCode: countryCode!, $language: language");

  const variablesStr = variables.join(", ");

  const queriesStr = queries.join("\n");

  const query = queryTemplate
    .replace("$variables", variablesStr)
    .replace("$queries", queriesStr);

  return { query, variablesRequest };
};

export const options = {
  discardResponseBodies: false,
  summaryTrendStats: [
    "avg",
    "min",
    "med",
    "max",
    "p(95)",
    "p(99)",
    "p(99.9)",
    "p(99.99)",
  ],
  scenarios: {
    contacts: {
      executor: "constant-arrival-rate",
      duration: "10m",
      rate: 1,
      timeUnit: "1s",
      preAllocatedVUs: 10,
      maxVUs: 20,
    },
  },
};

export default function () {
  const { query, variablesRequest } = getRequestQuery();

  const variables = Object.assign(
    {},
    {
      countryCode: "GB",
      language: "EN_GB",
    },
    variablesRequest
  );

  const payload = JSON.stringify({
    query,
    variables,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(APOLLO_GATEWAY, payload, params);

  check(res, {
    200: (r) => {
      return r.status === 200;
    },
  });
}
