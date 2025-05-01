import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { getFavorites, removeFavorite } from '../services/localStorage';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
    setFavorites(getFavorites());
  };

  return (
    <div className={styles.favoritesPage}>
      <h1 className={styles.pageTitle}>Your Favorite Movies</h1>

      {favorites.length === 0 ? (
        <div className={styles.emptyFavorites}>
          <p>You haven't added any movies to your favorites yet.</p>
          <p>Search for movies and add them to your favorites to see them here.</p>
        </div>
      ) : (
        <div className={styles.movieGrid}>
          {favorites.map(movie => (
            <div key={movie.imdbID} className={styles.favoriteMovieCardContainer}>
              <MovieCard movie={movie} />
              <button
                className={styles.removeFavoriteButton}
                onClick={() => handleRemoveFavorite(movie.imdbID)}
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
