import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '@env/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from '@app/auth/pages/auth.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '@app/core/interceptors/auth.interceptor';
import { ResponseInterceptor } from '@app/core/interceptors/response.interceptor';
import { ErrorInterceptor } from '@app/core/interceptors/error.interceptor';
// !NGRX
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { effects, metaReducers, ROOT_REDUCERS } from './store';
import * as fromRouter from './store/reducers/router.reducer';
// !End NGRX
@NgModule({
  bootstrap: [
    AppComponent
  ],
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    // !NGRX
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: 'NGRX Newborn Store App',
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: fromRouter.routerFeatureKey,
      serializer: fromRouter.CustomSerializer,
    }),
    EffectsModule.forRoot(effects),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
})
export class AppModule { }
