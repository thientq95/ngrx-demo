import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, EMPTY, map, mergeMap, of } from 'rxjs';
import { MovieService } from '../services/movie.service';

import * as movieAction from '../states/movie.actions';
@Injectable()
export class MovieEffects {
  loadMovies$ = createEffect(() =>
    this.action$.pipe(
      ofType(movieAction.getMovies),
      mergeMap(() =>
        this.movieService.getMovies().pipe(
          map((movies) => movieAction.getMoviesSuccess({ movies })),
          catchError((err) => of(movieAction.getMoviesFail(err)))
        )
      )
    )
  );

  constructor(private action$: Actions, private movieService: MovieService) {}
}
