// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  STORAGE: 'Rra5BCQfZsXW8TtJ',
  pathContribuyente: `http://localhost:8090/api/contribuyentes`,
  pathImpuesto: `http://localhost:8090/api/impuestos`,
  pathBienes: `http://localhost:8090/api/bienes`,
  pathSeguridad: `http://localhost:8090/api/security`,
  pathUsuarios: `http://localhost:8090/api/usuarios`,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
