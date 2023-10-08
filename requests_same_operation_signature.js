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

const query = `query ByType(
  $byTypeId: String!
  $countryCode: countryCode!
  $language: language
) {
  getData1: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData2: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData3: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData4: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData5: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData6: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData7: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData8: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData9: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData10: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData11: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData12: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData13: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData14: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData15: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData16: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData17: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData18: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData19: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData20: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData21: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData22: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData23: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData24: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData25: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData26: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData27: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData28: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData29: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData30: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData31: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData32: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData33: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData34: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData35: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData36: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData37: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData38: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData39: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }

  getData40: getData {
    byType(id: $byTypeId, countryCode: $countryCode, language: $language) {
      name
      type
    }
  }
}`;

const variablesRequest = {
  byTypeId: "1",
  countryCode: "GB",
  language: "EN_GB",
};

export default function () {
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
