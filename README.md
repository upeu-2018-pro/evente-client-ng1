# evente-client-ng1

evente-client-ng1 es un **Client application** construido en Angular 1 para consumir los servicios de [Evente resource server] autorizado por el [Evente resource server] mismo, aunque puede ser otra Authorization server y autenticado por [Google accounts server](https://accounts.google.com) cumpliendo así con una aplicación SSO.

[Evente resource server]: https://github.com/upeu-2018-pro/evente-serve


![Image 0](https://github.com/upeu-2018-pro/evente-client-ng1/blob/master/doc/e3-client_app_catalogo_web.png)



## Ejecución en modo local 

### Development version


Clone **latest development version** directly from [github]:

```sh
    # Universal
    
    D:\dev>git clone https://github.com/upeu-2018-pro/evente-client-ng1.git
```

## Deployment to Local

Instale las dependencias
```sh
    
	D:\dev>cd evente-client-ng1
	D:\dev\evente-client-ng1>npm install
	D:\dev\evente-client-ng1>bower install
```

Run
```sh
	D:\dev\catalogo-client-ng1_web>gulp

	[23:28:59] Using gulpfile D:\dev\evente-client-ng1\gulpfile.js
	[23:28:59] Starting 'jshint'...
	[23:28:59] Starting 'styles'...
	styles
	[23:28:59] Starting 'html'...
	html
	[23:28:59] Starting 'htmldirectives'...
	htmldirectives
	[23:28:59] Starting 'images'...
	[23:28:59] Starting 'serve-browser-sync'...
	[23:28:59] Finished 'serve-browser-sync' after 92 ms
	[23:28:59] Starting 'watch'...
	[23:28:59] Finished 'watch' after 17 ms
	[23:28:59] Finished 'htmldirectives' after 128 ms
	[23:28:59] Finished 'styles' after 382 ms
	[Browsersync] Access URLs:
	-------------------------------
		Local: http://localhost:9003
	External: http://127.0.0.1:9003
	-------------------------------
	[Browsersync] Serving files from: public/
	[23:28:59] gulp-imagemin: Minified 2 images (saved 40.1 kB - 80.6%)
	[23:28:59] Finished 'jshint' after 589 ms
	[23:28:59] Starting 'js'...
	js
	[23:28:59] Finished 'images' after 584 ms
	[23:28:59] Finished 'js' after 149 ms
	[23:28:59] Starting 'js-min'...
	js-min
	[23:29:00] Finished 'js-min' after 168 ms
	[23:29:00] Finished 'html' after 890 ms
	[23:29:00] Starting 'build'...
	[23:29:00] Finished 'build' after 2.76 μs
	[23:29:00] Starting 'default'...
	[23:29:00] Finished 'default' after 4.34 μs
```


## Revise las configuraciones

1. angular module app setting like this:

```sh


	var app = angular.module("catalogo", [
	    "pi.dynamicMenu",
	    "pi.oauth2",
	    "pi.appPagination",
	    "pi.tableResponsive",

	    'ui.router',
	    'ngResource',
	    'ngAnimate',
	    'ngAria',
	    'ngSanitize',
	    'ngMaterial',
	    'ngMdIcons',
	    'toastr',

	    'ngMessages',


	    'pascalprecht.translate',
	    'tmh.dynamicLocale',
	]);
```
2. Constantes de la app
```sh
	// Authorization Server -> oauth2_backend_service
	app.constant("authUrl", "https://upeuauth-serve.herokuapp.com"); 

	// Resource Server -> catalogo
	app.constant("apiUrl", "http://localhost:8003"); 
```
3. Constantes opcionales de la app::
```sh
	// Página de inicio o de convergencia
	app.constant("homeUrl", "http://localhost:9001"); 

```


4. config.js file setting like this::
```sh
	app
		//====================================================
		// oauth2Service and menuService runing
		//====================================================
	.run(function(oauth2Service, menuService, $state, $rootScope, $location, authUrl, $window, userService) {

	    menuService.menuUrl = "menu.json";
	    //menuService.apiMenuUrl = "https://upeuauth-serve.herokuapp.com/api/oauth2_backend/usermenu/";
	    $rootScope.menu = menuService.getMenu();

	    oauth2Service.loginUrl = authUrl + "/o/authorize/";
	    oauth2Service.oidcUrl = authUrl + "/api/oauth2_backend/localuserinfo/";
	    oauth2Service.clientId = "RBzvAoW3dtySxnPob5TuQgINV3yITSVE5bevdosI"; // actualice su client_id
	    oauth2Service.scope = "catalogo"; //comentar si no está configurado
	    ...
```

## Deployment to Heroku

    $ git add --all
    $ git commit -m "Version to heroku"

Si aún no ha creado su app, revise https://dashboard.heroku.com/apps

    $ heroku create evente-client-ng1

deployar:

    $ git push heroku master


See also, a [ready-made application](https://github.com/heroku/node-js-getting-started), ready to deploy.


## License

BSD-3-Clause: [LICENSE](https://github.com/upeu-001-pro/evente-client-ng1/blob/master/LICENSE)


### Contributors


See https://github.com/upeu-001-pro/evente-client-ng1/graphs/contributors

[github]: https://github.com/upeu-001-pro/evente-client-ng1



