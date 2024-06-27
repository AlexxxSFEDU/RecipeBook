import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./pages/home-page/home-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {LayoutComponent} from "./common-ui/layout/layout.component";
import {RegistrationPageComponent} from "./pages/registration-page/registration-page.component";
import {accessGuard} from "./auth/access.guard";
import {FavoritesPageComponent} from "./pages/favorites-page/favorites-page.component";
import {CartPageComponent} from "./pages/cart-page/cart-page.component";
import {CreatePageComponent} from "./pages/create-page/create-page.component";
import {RecipePageComponent} from "./pages/recipe-page/recipe-page.component";
import {EditPageComponent} from "./pages/edit-page/edit-page.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children:
      [
        {
          path: '', component: HomePageComponent
        },
        {
          path: 'favorites', component: FavoritesPageComponent
        },
        {
          path: 'cart', component: CartPageComponent
        },
        {
          path: 'create', component: CreatePageComponent
        },
        {
          path: 'recipe/:id', component: RecipePageComponent
        },
        {
          path: 'recipe/:id/edit', component: EditPageComponent
        },
      ],
    canActivate: [accessGuard]
  },
  {
    path: 'registration', component: RegistrationPageComponent
  },
  {
    path: 'login', component: LoginPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
