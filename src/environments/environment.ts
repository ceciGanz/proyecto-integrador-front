// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlVhUwXiD99PzJkz8B0l2uinF-TNqggpk",
  authDomain: "image-project-e25a7.firebaseapp.com",
  projectId: "image-project-e25a7",
  storageBucket: "image-project-e25a7.appspot.com",
  messagingSenderId: "932850775472",
  appId: "1:932850775472:web:cbabf22d6512d5cb5dd275"
};

export const environment = {
  production: false,
  API_PATH: '/api',
  firebase: firebaseConfig
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
