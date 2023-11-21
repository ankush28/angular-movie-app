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
  roundedNumber: any;
  borderPercetnage: string = '52px';
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
      0 : {
        items: 2
      },
      480 : {
        items: 3
      },
      768 : {
        items: 5
      }
  }
  }

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
  trendingBool: Boolean = true;
  activeButton: string = 'day';
  getTrending(time: string) {
  this.activeButton = time;
  this.movieapiservice.getTrending(time).subscribe((res: any) => {
    if (res.results) {
      
      this.movieData = res.results.map((item: any) => {
        item.roundedValue = this.roundToDecimal(item.vote_average, 1)
        item.calculatedValue = Math.abs(Math.floor((item.roundedValue * 3.14 * 10) - 314));
        this.trendingBool = false;
       return item;
      });
    }
    console.log(this.movieData)
  });
}
roundToDecimal(value: number, decimalPlaces: number): number {
  const multiplier = Math.pow(10, decimalPlaces);
  return Math.round(value * multiplier) / multiplier;
}
  activePopular: string = 'movie'
  popularboolean: Boolean = true;
  getPopular(type: string){
    this.activePopular = type;
    this.movieapiservice.getPopular(type).subscribe((res: any) => {
      if (res.results) {

        this.popularData = res.results.map((item: any) => {
          item.roundedValue = this.roundToDecimal(item.vote_average, 1)
          item.calculatedValue = Math.abs(Math.floor((item.roundedValue * 3.14 * 10) - 314));
          this.popularboolean = false;
         return item;
        });
      }
      console.log(this.popularData)
    })
  }
  getCategoryRoute(category: string): string {
    return category === 'movie' ? '/movie' : '/tv';
}
activeRated: string = 'movie'
ratedBoolean: Boolean = true;
  getTopRated(type: string){
    this.activeRated = type;
    this.movieapiservice.getTopRated(type).subscribe((res: any) => {
      if (res.results) {
        this.trendingBool = false;
        this.topratedData = res.results.map((item: any) => {
          item.roundedValue = this.roundToDecimal(item.vote_average, 1)
          item.calculatedValue = Math.abs(Math.floor((item.roundedValue * 3.14 * 10) - 314));
          this.ratedBoolean = false;
         return item;
        });
      }
    })
  }
}
