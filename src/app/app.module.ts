import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {RecipePageComponent} from './pages/recipe-page/recipe-page.component';
import {HomePageComponent} from './pages/home-page/home-page.component';
import {LoginPageComponent} from './pages/login-page/login-page.component';
import {LayoutComponent} from './common-ui/layout/layout.component';
import {SidebarComponent} from './common-ui/sidebar/sidebar.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";
import {SidebarModule} from 'primeng/sidebar';
import {RecipeListComponent} from './pages/recipe-list/recipe-list.component';
import {InputTextModule} from 'primeng/inputtext';
import {FavoritesPageComponent} from './pages/favorites-page/favorites-page.component';
import {CreatePageComponent} from './pages/create-page/create-page.component';
import {EditPageComponent} from './pages/edit-page/edit-page.component';
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {EditorModule} from 'primeng/editor';
import {SearchPipe} from './pipes/search.pipe';
import {AlertComponent} from './common-ui/alert/alert.component';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    RecipePageComponent,
    HomePageComponent,
    LoginPageComponent,
    LayoutComponent,
    SidebarComponent,
    RecipeListComponent,
    FavoritesPageComponent,
    CartPageComponent,
    CreatePageComponent,
    EditPageComponent,
    SearchPipe,
    AlertComponent,
    RegistrationPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    SidebarModule,
    InputTextModule,
    ProgressSpinnerModule,
    EditorModule,
    FormsModule,
    ButtonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
