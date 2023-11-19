import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieapiService } from 'src/app/services/movieapi.service';
import { DateFormatPipe } from 'src/app/pipe/date-format.pipe';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [DateFormatPipe]
})
export class HomeComponent {

  "genres": [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]

  
  bannerImage: String = '';
  movieData: any;
  popularData: any;
  topratedData: any;
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    responsive : {
      // breakpoint from 0 up
      0 : {
        items: 1
      },
      // breakpoint from 480 up
      480 : {
        items: 2
      },
      // breakpoint from 768 up
      768 : {
        items: 5
      }
  }
  }
  currentProgress: number = 5; // Set initial progress out of 10

  constructor(private movieapiservice : MovieapiService){
    this.getBanner();
    this.getTrending('day');
    this.getPopular('movie');
    this.getTopRated('movie')
  }

  getBanner(){
    this.movieapiservice.getBanner().subscribe((res: any) => {
      if (Array.isArray(res.results) && res.results.length > 0) {
        const randomMovie = res.results[Math.floor(Math.random() * res.results.length)];
        this.bannerImage = randomMovie.backdrop_path;
        console.log(this.bannerImage)
      }
    })
  }
  getTrending(time: string){
    this.movieapiservice.getTrending(time).subscribe((res: any) => {
      console.log(res);
      this.movieData = res.results;
    })
  }
  getPopular(type: string){
    this.movieapiservice.getPopular(type).subscribe((res: any) => {
      this.popularData = res.results;
      console.log(this.popularData)
    })
  }

  getTopRated(type: string){
    this.movieapiservice.getTopRated(type).subscribe((res: any) => {
      this.topratedData = res.results;
      console.log(this.topratedData)
    })
  }
}
