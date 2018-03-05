import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routes';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { TaskComponent } from './components/task/task.component';

import { ApiProvider } from './providers/api.provider';


import 'rxjs/add/operator/map';
import 'rxjs/Observable';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [ApiProvider],
  entryComponents: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {

}
