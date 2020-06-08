import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { HomeModule} from './home/home.module';
import { ProductListModule } from './product-list/product-list.module';

import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { AppComponent } from './app.component';
import { CartModule } from './cart/cart.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { CartModule } from './cart/cart.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LoginComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HomeModule,
    ProductListModule,
    CartModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
