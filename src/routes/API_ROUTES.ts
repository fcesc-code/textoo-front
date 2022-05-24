export const API_ROUTES = {
  // production: 'https://europe-west1-textoo-backend.cloudfunctions.net/api',
  production: 'http://localhost:3000',
  development: 'http://localhost:3000',
};

export const API_CONTROLLERS = {
  activities: 'activities',
  records: 'records',
  groups: 'groups',
  users: 'users',
  auth: 'auth',
};

export const API_SYNC_ROUTES = {
  production: 'https://europe-west1-textoo-sync.cloudfunctions.net/api',
  development: 'http://localhost:3010',
};
