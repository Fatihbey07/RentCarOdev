import { AuthGuard } from './services/Auth.guard';
import { AraclarComponent } from './components/araclar/araclar.component';
import { UyeComponent } from './components/uye/uye.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'kategoriler',
    component: KategoriComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'uyeler',
    component: UyeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'araclar',
    component: AraclarComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'araclar/:katId',
    component: AraclarComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
