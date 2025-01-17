import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';

import { OktaAuth } from '@okta/okta-auth-js';

import {
  OKTA_CONFIG,
  OktaAuthModule,
  OKTA_AUTH,
  OktaCallbackComponent,
  OktaConfig,
  OktaAuthGuard
} from '@okta/okta-angular'

import myAppConfig from './config/my-app-config';
import { MembersPageComponent } from './components/members-page/members-page.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';

const oktaConfig = Object.assign({
onAuthRequired: (oktaAuth: any, injector: { get: (arg0: typeof Router) => any; }) => {
  const router = injector.get(Router);

  router.navigate(['/login']);
}
}, myAppConfig.oidc);

const oktaAuth = new OktaAuth({
  clientId: '0oa43nbpf2qPTBzAH5d7',
        issuer: 'https://dev-8144678.okta.com/oauth2/default',
        redirectUri: 'https://hcltechnologystore.azurewebsites.net/login/callback',
        scopes: ['openid', 'profile', 'email']
});

const routes: Routes = [
  {path: 'order-history', component: OrderHistoryComponent, canActivate: [OktaAuthGuard]},
  {path: 'members', component: MembersPageComponent, canActivate: [OktaAuthGuard]},
  {path:'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  { path: 'checkout', component:CheckoutComponent},
  { path: 'cart-details', component:CartDetailsComponent},
  { path: 'search/:keyword', component: ProductListComponent},
  { path: 'products/:id', component: ProductDetailsComponent},
  { path: 'category/:id', component: ProductListComponent },
  { path: 'category', component: ProductListComponent },
  { path: 'products', component: ProductListComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    MembersPageComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,

  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: { oktaAuth } },{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
