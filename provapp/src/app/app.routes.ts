import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { ListaSpesaComponent } from './pages/lista-spesa/lista-spesa';
import { authGuard } from './core/auth.guard';

export const routes: Routes =[
  { path: '', component: Home },
  { path: 'profile', component: Profile, canActivate:[authGuard] },
  { path: 'spesa', component: ListaSpesaComponent, canActivate:[authGuard] },
  { path: '**', redirectTo: '' },
];