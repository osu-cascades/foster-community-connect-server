import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MessageService } from './services/message.service';
import { appRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { GetComponent } from './get';
import { GiveComponent } from './give';
import { HomeComponent } from './home';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { RequestFormComponent } from './request-form/request-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GiveComponent,
    GetComponent,
    DonationFormComponent,
    RequestFormComponent
  ],
  imports: [
    BrowserModule,
    appRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
