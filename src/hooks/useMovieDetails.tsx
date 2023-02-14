import { useState, useEffect } from 'react';
import { MovieFull } from '../interfaces/movieInterface';
import movieDB from '../api/movieDB';
import { CreditsResponse, Cast } from '../interfaces/creditsInterface';

interface MovieDetails {
  isLoading: boolean;
  movieFull?: MovieFull;
  cast: Cast[];
}

export const useMovieDetails = (movieId: number) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>({
    isLoading: true,
    movieFull: undefined,
    cast: [],
  });

  const getMovieDetails = async () => {
    const movieDetailsPromise = movieDB.get<MovieFull>(`/${movieId}`);
    const castPromise = movieDB.get<CreditsResponse>(`/${movieId}/credits`);

    const [movieDetailsResponse, castResponse] = await Promise.all([
      movieDetailsPromise,
      castPromise,
    ]);

    setMovieDetails({
      isLoading: false,
      movieFull: movieDetailsResponse.data,
      cast: castResponse.data.cast,
    });
  };

  useEffect(() => {
    getMovieDetails();
  }, []);

  return {
    ...movieDetails,
  };
};
