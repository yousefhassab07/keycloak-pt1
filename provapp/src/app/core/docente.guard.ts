import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const docenteGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Se l'utente ha il ruolo "docente" su Keycloak, lo fa passare
  if (authService.hasRole('docente')) {
    return true;
  }
  
  // Altrimenti lo caccia e lo manda alla pagina di errore
  router.navigate(['/accesso-negato']);
  return false;
};