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

}
