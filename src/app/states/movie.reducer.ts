import { createReducer, on } from "@ngrx/store";
import { Movie } from "../services/movie";
import { addMovie, getMovies } from "./movie.actions";
import * as movieAction from "./movie.actions";
import { state } from "@angular/animations";
import { GenericState } from "../data-access/generic.state";

export interface MovieState extends GenericState<Movie[]> {

}

export const initialState: MovieState = {
    data: [],
    status: 'pending',
    error: null
    
};
export const moviesReducer = createReducer(
    initialState,
    on(movieAction.getMovies, (state) => ({
        ...state,
        status: 'loading',
        error: null
    })),
    on(movieAction.getMoviesSuccess, (state, { movies }) => ({
        ...state,
        data: movies,
        status: 'success',
        error: null
    })),
    on(movieAction.getMoviesFail, (state, { error }) => ({
        ...state,
        data: null,
        status: 'error',
        error
    }))
)