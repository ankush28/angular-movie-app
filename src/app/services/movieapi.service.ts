import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieapiService {
   apiUrl = environment.apiBaseUrl;
   private options = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${environment.apiKey}`,
    }),
  };
  constructor(private http: HttpClient) {}

  getBanner(language: string = 'en-US', page: number = 1): Observable<any> {
    const url = `${this.apiUrl}movie/upcoming?language=${language}&page=${page}`;
    return this.http.get(url, this.options);
  }
  getTrending(time: string): Observable<any> {
    const url = `${this.apiUrl}trending/movie/${time}?language='en-US'`;
    return this.http.get(url, this.options);
  }
  getPopular(type: string): Observable<any>{
    const url = `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=1`;
    return this.http.get(url, this.options);
  }

  getTopRated(type: string): Observable<any>{
    const url = `https://api.themoviedb.org/3/${type}/top_rated??language=en-US&page=1`;
    return this.http.get(url, this.options);
  }
  getMovie(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
    return this.http.get(url, this.options);
  }
  getTV(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
    return this.http.get(url, this.options);
  }
  getTVCredit(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/tv/${id}/credits?language=en-US`;
    return this.http.get(url, this.options);
  }
  getTVSimilar(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`;
    return this.http.get(url, this.options);
  }
  getTVRecommend(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/tv/${id}/recommendations?language=en-US`;
    return this.http.get(url, this.options);
  }
  getCredit(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;
    return this.http.get(url, this.options);
  }
  getSimilar(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`;
    return this.http.get(url, this.options);
  }
  getRecommend(id: number): Observable<any>{
    const url = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US`;
    return this.http.get(url, this.options);
  }
}
