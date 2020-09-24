import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { AppComponent } from "./app.component";
import { ApiService } from "./services/api-service.service";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, RouterModule, CommonModule],
  providers: [ApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
