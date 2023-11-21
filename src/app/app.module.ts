import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadialProgressComponent } from './components/radial-progress/radial-progress.component';
import { DateFormatPipe } from './pipe/date-format.pipe';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MovieComponent } from './components/movie/movie.component';
import { TvComponent } from './components/tv/tv.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RadialProgressComponent,
    DateFormatPipe,
    MovieComponent,
    TvComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
