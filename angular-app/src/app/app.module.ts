import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppLoadModule } from './app-load/app-load.module';
import { GlueService } from './glue/glue.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppLoadModule
  ],
  providers: [GlueService],
  bootstrap: [AppComponent]
})
export class AppModule { }
