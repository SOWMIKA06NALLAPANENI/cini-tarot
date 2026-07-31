// This runs on Netlify's server, not in the browser — so the TMDB
// API key stays hidden and is never exposed to users.

exports.handler = async function (event) {
  const TMDB_API_KEY = process.env.TMDB_API_KEY;
  const genre = event.queryStringParameters.genre || '18'; // default: drama

  try {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genre}&language=en-US&sort_by=popularity.desc`;
    const response = await fetch(url);
    const data = await response.json();

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.results || [])
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};