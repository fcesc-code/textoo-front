/* angular modules */
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
/* settings */
import { environment } from '../environments/environment';
/* firebase */
// import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
// import {
//   provideAnalytics,
//   getAnalytics,
//   ScreenTrackingService,
//   UserTrackingService,
// } from '@angular/fire/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
/* Service worker module */
import { ServiceWorkerModule } from '@angular/service-worker';
/* ngrx modules */
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducers } from './app.reducer';
import { appEffectsArray } from './app.effects';
/* custom modules */
import { ActivitiesSharedModule } from './activity/activities-shared.module';
import { ActivitiesGlobalModule } from './activities/activities-global.module';
import { ActivitySelectTextModule } from './activity-select-text/activity-select-text.module';
import { ActivityBestOptionModule } from './activity-best-option/activity-best-option.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';
/* components */
import { AppComponent } from './app.component';
/* animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/* material global modules */
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
/* global services */
import { AuthInterceptorService } from './auth/services/auth-interceptor.service';
/* globals and indexes */

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    // provideAnalytics(() => getAnalytics()),
    AngularFirestoreModule,
    // provideFirestore(() => getFirestore()),
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    AuthModule,
    UserModule,
    ActivitiesSharedModule,
    ActivitiesGlobalModule,
    ActivityBestOptionModule,
    ActivitySelectTextModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(appEffectsArray),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    // ScreenTrackingService,
    // UserTrackingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
