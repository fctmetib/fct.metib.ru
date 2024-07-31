// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	// 17.11.2023 test
	apiUrl: 'https://api-factoring-test02.metib.ru/api',
	apiFileUploadUrl: 'https://api-factoring-test02.metib.ru/api/',
	apiToken: 'bb7a3abe7995f91132c083549aaae9fdf332b66e',

	// new prod
	/// apiUrl: 'https://api-factoring.metib.ru/api',
	// apiFileUploadUrl: 'https://api-factoring.metib.ru/api/',

	// new dev
	// apiUrl: 'http://api-factoring-test.metib.ru/api/',
	// apiFileUploadUrl: 'http://api-factoring-test.metib.ru/api/',

	// old
	// apiUrl: 'http://api-factoring.metib.ru:8094/api/',
	// apiFileUploadUrl: 'http://api-factoring.metib.ru:8094/api/',
	// ------------------------------------------------------------
	// apiUrl: 'https://simple-factoring.metib.ru/api',
	limit: 10,
	cryptoPrivateKey: 'gqpwro9-12itvnmzxn2j3tsvnsdnn21n209fasxz',
	uploadFilesExt: ['.jpg', '.jpeg', '.png', '.pdf']
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
