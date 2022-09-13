import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `https://5f49b7bf8e271c001650cbfd.mockapi.io/api/v1/movie`
    );
  }

  loadMovies(perPage: number, pageIndex: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(
      `https://5f49b7bf8e271c001650cbfd.mockapi.io/api/v1/movie`
    );
  }
}
