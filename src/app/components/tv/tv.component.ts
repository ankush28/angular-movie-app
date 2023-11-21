import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MovieapiService } from 'src/app/services/movieapi.service';

@Component({
  selector: 'app-tv',
  templateUrl: './tv.component.html',
  styleUrls: ['./tv.component.scss']
})
export class TvComponent {
  movie: any;
  roundedNumber: any;
  borderPercetnage: string = '';
  originalNumber: number = 0;
  runtime: string = '';
  credit: any;
  director: string = '';
  writer: string = '';
  similarData: any;
  recommendData: any;
  tvLoader: boolean = true;
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
  constructor(private movieapiservice : MovieapiService, private route: ActivatedRoute){
    this.route.paramMap.subscribe((params) => {
      const movieId = Number(params.get('id'));
  
      this.getSimilar(movieId);
      this.getRecommend(movieId)
      this.movieapiservice.getTVCredit(movieId).subscribe((credit) => {
        this.credit = credit;
        let matchingDirector = credit.crew.find((item: any) => item.job === 'Director');
        console.log(matchingDirector);
        if(matchingDirector){
          this.director = matchingDirector.name
        }
        let matchingWriter = credit.crew.filter((item: any) => item.department === 'Writing');
        console.log(matchingWriter);
        if(matchingWriter.length>0){
          this.writer = matchingWriter.map((item: any)=> item.name);
          
        }
        console.log(this.writer)
      })
      this.movieapiservice.getTV(movieId).subscribe((movie) => {
        this.movie = movie;
        this.originalNumber = movie.vote_average;
        this.roundedNumber = this.roundToDecimal(this.originalNumber, 1)
        const border = Math.abs(Math.floor((this.roundedNumber*3.14*(10))-314));
        this.borderPercetnage = border.toString()+"px";
        let hours: number = Math.floor(movie.runtime / 60);
        let minutes: number = movie.runtime % 60;
        this.runtime = `${hours}h ${minutes}m`;
        this.tvLoader = true;
      });
    });
  }
  roundToDecimal(value: number, decimalPlaces: number): number {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.round(value * multiplier) / multiplier;
  }

  getSimilar(id: number){
    this.movieapiservice.getTVSimilar(id).subscribe((res: any) => {
      this.similarData = res.results;
    })
  }
  getRecommend(id: number){
    this.movieapiservice.getTVRecommend(id).subscribe((res: any) => {
      this.recommendData = res.results;
    })
  }
}
