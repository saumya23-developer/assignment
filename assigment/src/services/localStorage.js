export const saveFavorite = (movie) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
    favorites.push(movie);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
};

export const removeFavorite = (movieId) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const updatedFavorites = favorites.filter(movie => movie.imdbID !== movieId);
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

export const getFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};