import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HomeModule} from './home/home.module';
import { ProductListModule } from './product-list/product-list.module';

import { AppRoutingModule } from './app-routing.module';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

import { AppComponent } from './app.component';
<<<<<<< HEAD
import { CartModule } from './cart/cart.module';
=======
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
>>>>>>> da0d136fc893f534ecec2eb743ae41453284c493

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
<<<<<<< HEAD
    CartModule
=======
>>>>>>> da0d136fc893f534ecec2eb743ae41453284c493
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
