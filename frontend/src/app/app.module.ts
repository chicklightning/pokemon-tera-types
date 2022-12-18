import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './components/app-component/app.component';
import { FooterComponent } from './components/footer/footer.component';
import { MessagesComponent } from './components/messages/messages.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TeraTypeComponent } from './components/tera-type/tera-type.component';
import { RaidPokemonComponent } from './components/raid-pokemon/raid-pokemon.component';
import { SuggestPokemonComponent } from './components/suggest-pokemon/suggest-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    MessagesComponent,
    DashboardComponent,
    PageNotFoundComponent,
    TeraTypeComponent,
    RaidPokemonComponent,
    SuggestPokemonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
