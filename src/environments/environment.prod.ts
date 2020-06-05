// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: '/aplication/',
  secret_route: 'secret',
  api: 'http://127.0.0.1:8000',
  dbAccess: 'access',
  db: 'inventario',
  prefix: 'api',
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
