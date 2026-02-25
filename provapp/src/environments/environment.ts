export const environment = {
  production: false,
  keycloak: {
    // COPIA IL TUO INDIRIZZO DELLA PORTA 8080 DAL TAB PORTS (senza slash finale)
    url: 'https://miniature-giggle-x567jw6j7xpqc6gv-8080.app.github.dev', 
    realm: 'prova',
    clientId: 'provapp',
    // Questo serve per dire a Keycloak di tornare qui dopo il login
    redirectUri: window.location.origin, 
  }
};