const API_KEY = 'a349daa4'; 
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}`);
    const data = await response.json();
    
    if (data.Response === 'False') {
      console.error('API Error:', data.Error);
      return [];
    }
    
    return data.Search || [];
  } catch (error) {
    console.error('Error searching movies:', error);
    return [];
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};