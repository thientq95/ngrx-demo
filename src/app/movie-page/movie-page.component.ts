import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMovies } from '../states/movie.selector';

import * as movieAction from '../states/movie.actions';
import * as movieSelector from '../states/movie.selector';
import { map } from 'rxjs';
import { state } from '@angular/animations';

@Component({
  selector: 'app-movie-page',
  templateUrl: './movie-page.component.html',
  styleUrls: ['./movie-page.component.scss'],
})
export class MoviePageComponent implements OnInit {
  movies$ = this.store.select(movieSelector.selectMovies)
  loading$ = this.store.select(movieSelector.loading).pipe(
    map(status => status=== 'loading' ? true : false)
  )
  constructor(private store: Store) {}

  ngOnInit() {
    // this.movieService
    //   .getMovies()
    //   .subscribe((movies) => this.store.dispatch(getMovies({ movies })));

    this.store.dispatch(movieAction.getMovies())
  }
}
