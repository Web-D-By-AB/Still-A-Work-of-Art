const fetch = require("node-fetch");

const API_URL = "https://api.unsplash.com/photos/random";
const queries = `still-life-photography,
                  still-life,
                  objects,
                  food,
                  nature,
                  travel,
                  food-drink,
                  architecture-interior,
                  outdoors,
                  birds,
                  food-presentation,
                  food-photography,
                  still-life-photos`;

const handler = async (request) => {
  let response;
  let query = "";

  if (!!request.queryStringParameters.q) {
    query = request.queryStringParameters.q;
  } else {
    query = queries;
  }

  try {
    const res = await fetch(
      `${API_URL}?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=${query}`
    );
    response = await res.json();
    console.log(
      `Successfully fetched image with url: ${response.urls.regular}`
    );
  } catch (err) {
    console.error(err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message,
      }),
    };
  }
  
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};

module.exports = { handler };
