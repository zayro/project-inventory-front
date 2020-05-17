// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: '/',
  secret_route: 'secret',
  api: 'http://127.0.0.1:8000',
  db: 'inventario',
  prefix: 'unsafe',
  plugin: {
    main: 'assets/i18n/',
    datable: 'assets/i18n/datable/'
  },
  main: '/api',
  user: '/api/user',
    select: {
    general: '/api/demo/',
    filtro: '/api/demo/filtro',
    all: '/api/demo/all',
    select: '/api/demo/select',
    insecure: '/unsafe/demo/',    
  },
  insert: {
    general: '/api/demo/unsafe',
    insecure: '/unsafe/demo/unsafe',
  },
  update: {
    general: '/api/demo/edit',
    insecure: '/unsafe/demo/edit',
  },
  desactivate: {
    general: '/api/demo/hidden',
    insecure: '/unsafe/demo/hidden',
  },
  delete: {
    general: '/api/demo/destroy',
    insecure: '/unsafe/demo/destroy',
  },
  upload: {
    general: '/api/demo/upload'
  },
  process: {
    import: '/process/import'
  },
  module: {
    audit: {
      table: 'audits',
      route: '/audits/',
      id: 'id_audits'
    },
    test: {
      table: 'test',
      route: '/test/',
      id: 'id_test'
    },
    users: {
      table: 'users',
      route: '/config/',
      id: 'id_users'
    },
    login: {
      view: 'view_privileges'
    },
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
