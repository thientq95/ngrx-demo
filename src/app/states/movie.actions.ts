import { createAction, props } from '@ngrx/store';
import { Movie } from '../services/movie';

export const addMovie = createAction(
  '[Movie List] Add Movie',
  props<{ movieId: number }>()
);

export const removeMovie = createAction(
  '[Movie List] Remove Movie',
  props<{ movieId: number }>()
);

export const getMovies = createAction(
  '[Movie List/API] Get Movies'
);

export const getMoviesSuccess = createAction(
  '[Movie List/API] Get Movies Success',
  props<{ movies: Movie[] }>()
);

export const getMoviesFail = createAction(
  '[Movie List/API] Get Movies Fail',
  props<{ error: string }>()
);
