import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMovieDetails } from '../services/api';
import { saveFavorite, removeFavorite, getFavorites } from '../services/localStorage';
import styles from './MovieDetailPage.module.css';

const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadMovieDetails = async () => {
      setIsLoading(true);
      try {
        const details = await getMovieDetails(id);
        if (details.Response === 'False') {
          setError(details.Error || 'Movie not found');
        } else {
          setMovie(details);
          const favorites = getFavorites();
          setIsFavorite(favorites.some(fav => fav.imdbID === id));
        }
      } catch (err) {
        setError('Error loading movie details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    loadMovieDetails();
  }, [id]);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.imdbID);
    } else {
      saveFavorite({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Poster: movie.Poster,
        Type: movie.Type
      });
    }
    setIsFavorite(!isFavorite);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className={styles.movieDetailPage}>
        <div className={styles.loading}>Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.movieDetailPage}>
        <div className={styles.errorMessage}>{error}</div>
        <button className={styles.backButton} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.movieDetailPage}>
        <div className={styles.errorMessage}>Movie not found</div>
        <button className={styles.backButton} onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className={styles.movieDetailPage}>
      <div className={styles.container}>
        <button className={styles.backButton} onClick={handleGoBack}>
          ← Back
        </button>

        <div className={styles.movieDetailContent}>
          <div className={styles.moviePosterContainer}>
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={movie.Title} className={styles.moviePoster} />
            ) : (
              <div className={styles.noPoster}>No Image Available</div>
            )}
          </div>

          <div className={styles.movieInfoContainer}>
            <h1 className={styles.movieTitle}>
              {movie.Title} <span className={styles.movieYear}>({movie.Year})</span>
            </h1>

            <div className={styles.movieMeta}>
              {movie.Rated && <span className={styles.movieRated}>{movie.Rated}</span>}
              {movie.Runtime && <span className={styles.movieRuntime}>{movie.Runtime}</span>}
              {movie.Genre && <span className={styles.movieGenre}>{movie.Genre}</span>}
            </div>

            <button
              className={`${styles.favoriteButton} ${isFavorite ? styles.isFavorite : ''}`}
              onClick={handleToggleFavorite}
            >
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </button>

            {movie.Director && movie.Director !== 'N/A' && (
              <div className={styles.movieDetailSection}>
                <h3>Director</h3>
                <p>{movie.Director}</p>
              </div>
            )}

            {movie.Plot && movie.Plot !== 'N/A' && (
              <div className={styles.movieDetailSection}>
                <h3>Plot</h3>
                <p>{movie.Plot}</p>
              </div>
            )}

            {movie.Actors && movie.Actors !== 'N/A' && (
              <div className={styles.movieDetailSection}>
                <h3>Cast</h3>
                <p>{movie.Actors}</p>
              </div>
            )}

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className={styles.movieDetailSection}>
                <h3>Ratings</h3>
                <div className={styles.ratingsContainer}>
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className={styles.rating}>
                      <span className={styles.ratingSource}>{rating.Source}:</span>
                      <span className={styles.ratingValue}>{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
