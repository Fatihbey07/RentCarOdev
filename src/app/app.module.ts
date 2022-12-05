import { MytoastService } from './services/mytoast.service';
import { AuthGuard } from './services/Auth.guard';
import { DataService } from 'src/app/services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { UyeComponent } from './components/uye/uye.component';
import { AraclarComponent } from './components/araclar/araclar.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    KategoriComponent,
    AraclarComponent,
    UyeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HotToastModule.forRoot(),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, AuthGuard, MytoastService],
  bootstrap: [AppComponent],
})
export class AppModule {}
