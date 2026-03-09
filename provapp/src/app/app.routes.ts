import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Profile } from './pages/profile/profile';
import { authGuard } from './core/auth.guard';

// Importiamo i componenti usando i nomi esatti che hai nella tua cartella
import { Docente } from './pages/docente/docente';
import { Studente } from './pages/studente/studente';
import { AccessoNegato } from './pages/accesso-negato/accesso-negato';

// Importiamo le guardie
import { docenteGuard } from './core/docente.guard';
import { studenteGuard } from './core/studente.guard';

export const routes: Routes =[
  { path: '', component: Home },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  
  // Rotta Docente
  { path: 'docente', component: Docente, canActivate: [authGuard, docenteGuard] },
  
  // Rotta Studente
  { path: 'studente', component: Studente, canActivate:[authGuard, studenteGuard] },
  
  // Rotta Accesso Negato
  { path: 'accesso-negato', component: AccessoNegato },
  
  { path: '**', redirectTo: '' },
];