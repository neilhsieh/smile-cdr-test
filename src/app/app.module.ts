import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api-service.service";
import { FooterComponent } from "./components/footer/footer.component";
import { MillisecondsPipe } from "./pipe/milliseconds.pipe";
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [AppComponent, FooterComponent, MillisecondsPipe, SearchComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule, CommonModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
