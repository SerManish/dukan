import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HomeProductsComponent } from './home/home-products/home-products.component';
import { CarouselComponent } from './home/carousel/carousel.component';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeProductsComponent,
    CarouselComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
