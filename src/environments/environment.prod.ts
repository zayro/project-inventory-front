// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  baseUrl: '/web/',
  secret_route: 'secret',
  api: 'http://186.183.178.11:8000',
  plugin: {
    main: 'assets/i18n/',
    datable: 'assets/i18n/datable/'
  },
  main: '/api',
  user: '/api/user',
  db: '/api/demo',
  select: {
    general: '/api/demo/',
    filtro: '/api/demo/filtro',
    all: '/api/demo/all',
    select: '/api/demo/select',
  },
  insert: {
    general: '/api/demo/create'
  },
  update: {
    general: '/api/demo/edit'
  },
  desactivate: {
    general: '/api/demo/hidden'
  },
  delete: {
    general: '/api/demo/destroy'
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
