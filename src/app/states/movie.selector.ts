import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Movie } from "../services/movie";
import * as fromMovie from './movie.reducer';

export const getMovieState = createFeatureSelector<fromMovie.MovieState>('movies');

export const loading = createSelector(
    getMovieState,
    (state) => state.status
)

export const selectMovies = createSelector(
    getMovieState,
    (state) => state.data
)

