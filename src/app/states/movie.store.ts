import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComponentStore, tapResponse } from '@ngrx/component-store';
import { Observable, concatMap, tap, switchMap } from 'rxjs';
import { Movie } from '../services/movie';
import { MovieService } from '../services/movie.service';

export interface IMovieState {
  movies: Movie[];
  userPreferredMoviesIds: number[];
  moviesPerPage: 10;
  currentPageIndex: 0;
}

@Injectable()
export class MovieStore extends ComponentStore<IMovieState> {
  readonly movies$ = this.select((state) => state.movies);
  readonly userPreferredMovieIds$ = this.select(
    (state) => state.userPreferredMoviesIds
  );

  readonly userPreferredMovies$ = this.select(
    this.movies$,
    this.userPreferredMovieIds$,
    (movies, ids) => movies.filter((movie) => ids.includes(movie.id))
  );

  readonly moviesPerPage$ = this.select((state) => state.moviesPerPage);
  readonly currentPageIndex$ = this.select((state) => state.currentPageIndex);

  readonly getMovie = this.effect((movieId$: Observable<string>) => {
    return movieId$.pipe(
      // 👇 Handle race condition with the proper choice of the flattening operator.
      switchMap((id) => this.movieService.getMovies().pipe(
        //👇 Act on the result within inner pipe.
        tapResponse(
          (movie) => {
            // add movie
            // this.addMovie(movie)
          },
          (error: HttpErrorResponse) => {
            // this.logError(error)
          },
        ),
      )),
    );
  });
  
  private readonly fetchMoviesData$ = this.select(
    this.moviesPerPage$,
    this.currentPageIndex$,
    (moviesPerPage, currentPageIndex) => ({ moviesPerPage, currentPageIndex }),
    { debounce: true } // 👈 setting this selector to debounce
  );
  

  private updateMovieResults(movies: Movie[]): void {}

  private readonly fetchMovies = this.effect(
    (
      moviePageData$: Observable<{
        moviesPerPage: number;
        currentPageIndex: number;
      }>
    ) => {
      return moviePageData$.pipe(
        concatMap(({ moviesPerPage, currentPageIndex }) => {
          return this.movieService
            .loadMovies(moviesPerPage, currentPageIndex)
            .pipe(tap((results) => this.updateMovieResults(results)));
        })
      );
    }
  );

  constructor(private movieService: MovieService) {
    super({
      movies: [],
      userPreferredMoviesIds: [],
      moviesPerPage: 10,
      currentPageIndex: 0,
    });
  }
}
