import Keycloak from 'keycloak-js'

const options = {
  url: 'http://localhost:8282/auth/',
  realm: 'blogsley',
  clientId: 'blogsley'
}

export const keycloak = Keycloak(options)

export default async (app, options) => {
  app.config.globalProperties.$keycloak = keycloak
}
