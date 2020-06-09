import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';

import { HomeModule} from './home/home.module';
import { ProductListModule } from './product-list/product-list.module';
import { CartModule } from './cart/cart.module';
import { ProductPageModule } from './product-page/product-page.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LoginComponent } from './login/login.component';

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
    AppRoutingModule,
    HomeModule,
    ProductListModule,
    CartModule,
    ProductPageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
