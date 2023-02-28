import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import SplashScreen from 'react-native-splash-screen';
import { MoviesResponse, Movie } from '../interfaces/movieInterface';

interface MoviesState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [moviesState, setMoviesState] = useState<MoviesState>({
    nowPlaying: [],
    popular: [],
    topRated: [],
    upcoming: [],
  });

  const getMovies = async () => {
    const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
    const popularPromise = movieDB.get<MoviesResponse>('/popular');
    const topRatedPromise = movieDB.get<MoviesResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MoviesResponse>('/upcoming');

    const resps = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRatedPromise,
      upcomingPromise,
    ]);

    setMoviesState({
      nowPlaying: resps[0].data.results,
      popular: resps[1].data.results,
      topRated: resps[2].data.results,
      upcoming: resps[3].data.results,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getMovies();
    // getMovies().then(res => SplashScreen.hide()); // --> wait loading to hide splashscreen
  }, []);

  // Hide splash screen
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return {
    ...moviesState,
    isLoading,
  };
};
