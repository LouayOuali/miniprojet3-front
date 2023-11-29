import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MusiciensComponent } from './musiciens/musiciens.component';
import { AddMusicienComponent } from './add-musicien/add-musicien.component';
import { UpdateMusicienComponent } from './update-musicien/update-musicien.component';

import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';import { RechercheParBandComponent } from './recherche-par-band/recherche-par-band.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { SearchFilterPipe } from './search-filter.pipe';
import { ListeBandsComponent } from './liste-bands/liste-bands.component';
import { UpdateBandComponent } from './update-band/update-band.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';


import { TokenInterceptor } from './token.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    MusiciensComponent,
    AddMusicienComponent,
    UpdateMusicienComponent,
    RechercheParBandComponent,
    RechercheParNomComponent,
    SearchFilterPipe,
    ListeBandsComponent,
    UpdateBandComponent,
    LoginComponent,
    ForbiddenComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{
    provide : HTTP_INTERCEPTORS,
    useClass : TokenInterceptor,
    multi : true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

