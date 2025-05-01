import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.moviePoster}>
        {movie.Poster && movie.Poster !== 'N/A' ? (
          <img src={movie.Poster} alt={movie.Title} />
        ) : (
          <div className={styles.noPoster}>
            <p>No Image</p>
          </div>
        )}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{movie.Title}</h3>
        <p className={styles.movieYear}>{movie.Year}</p>
        <Link to={`/movie/${movie.imdbID}`} className={styles.moreInfoButton}>
          More Info
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;
