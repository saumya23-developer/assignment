import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import { searchMovies } from '../services/api';
import styles from './Home.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        setError('No movies found. Try another search term.');
      }
    } catch (err) {
      setError('Error searching movies. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.homePage}>
      <h1 className={styles.pageTitle}>Find your favorite movies</h1>
      <SearchBar onSearch={handleSearch} />
      
      {isLoading && (
        <div className={styles.loading}>
          <p>Loading...</p>
        </div>
      )}
      
      {error && (
        <div className={styles.errorMessage}>
          {error}
        </div>
      )}
      
      {!isLoading && !error && movies.length > 0 && (
        <div className={styles.movieGrid}>
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      )}
      
      {!isLoading && !error && movies.length === 0 && (
        <div className={styles.emptyState}>
          <p>Search for movies to display results</p>
        </div>
      )}
    </div>
  );
  
};

export default HomePage;