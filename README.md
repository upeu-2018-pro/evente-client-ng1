# evente-client-ng1

evente-client-ng1 es un **Client application** construido en Angular 1 para consumir los servicios de [Evente resource server] autorizado por el [Evente resource server] mismo, aunque puede ser otra Authorization server como [UPeU auth server] y autenticado por [Google accounts server](https://accounts.google.com) cumpliendo así con una aplicación SSO.

[Evente resource server]: https://github.com/upeu-2018-pro/evente-serve
[UPeU auth server]:  https://github.com/upeu-001-pro/upeuauth-serve


![Image 0](https://github.com/upeu-2018-pro/evente-client-ng1/blob/master/doc/e3-client_app_catalogo_web.png)



## Deployment to Localhost (1)

Clone **latest development version** directly from [github]:

```sh
    
    D:\dev>git clone https://github.com/upeu-2018-pro/evente-client-ng1.git
```

Runing :

```sh
    D:\dev>cd evente-client-ng1
    D:\dev\evente-client-ng1>npm start
```

Open browser http://localhost:9004

## Deployment to Localhost for developing your tasks (2)

Parar el servidor de producción y ejecute el servidor web de desarrollo

Runing el entorno de desarrollo:

```sh
	D:\dev\catalogo-client-ng1_web>gulp

	[23:28:59] Using gulpfile D:\dev\evente-client-ng1\gulpfile.js
	...
```
Open browser http://localhost:9003


### Revise las configuraciones

1. angular module app setting like this:

```js
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

2. Constantes de la app en entorno Desarrollo
```js
	// Authorization Server
	app.constant("authUrl", "http://localhost:8003");
	//app.constant("authUrl", "https://upeuauth-serve.herokuapp.com"); // puede separar

	// Resource Server
	app.constant("apiUrl", "http://localhost:8003"); 
```

3. Constantes de la app en entorno Producción
```js
	// Authorization Server
	app.constant("authUrl", "https://evente-serve.herokuapp.com");
	//app.constant("authUrl", "https://upeuauth-serve.herokuapp.com"); // puede separar
	
	// Resource Server
	app.constant("apiUrl", "https://evente-serve.herokuapp.com"); 
```

4. Constantes opcionales de la app::
```js
	// Página de inicio o de convergencia
	app.constant("homeUrl", "http://localhost:9001"); 

```


5. config.js file setting like this::
```js
	app
		//====================================================
		// oauth2Service and menuService runing
		//====================================================
	.run(function (oauth2Service, menuService, $state, $rootScope, $location, authUrl, $window, userService, $http) {

        menuService.menuUrl = "menu.json";
        //menuService.apiMenuUrl = "http://localhost:7001/api-core/usermenu/";
        $rootScope.menu = menuService.getMenu();

        oauth2Service.loginUrl = authUrl + "/o/authorize/";
        //oauth2Service.oidcUrl = authUrl + ""; // no usar esta forma de traer datos del user
        oauth2Service.redirectUri = "https://evente-client-ng1.herokuapp.com"; // si colocas, colocar tal cual está registrado en al app http://localhost:9003

        oauth2Service.clientId = "rrAcmEKW34DitRKiX4On84LLWNBBkCjEOmpcjmL3";
        oauth2Service.scope = "catalogo"; //comentar si no está configurado

	    ...

		if (oauth2Service.isAauthenticated()) { // reemplaza a oauth2Service.oidcUrl
                userService.isAauth = 'true';
                $http.get(authUrl + "/api-core/localuserinfo/").then(function (result) {
                    var claimsJson = result.data;
                    userService.userName = claimsJson.username;
                }, function (err) {
                });
            }

		...
```

## Deployment to Heroku  (3)

1 Si hizo cambios, hacer commit

    $ git add .
    $ git commit -m "Version to heroku"

2 Revise la app en https://dashboard.heroku.com/apps, si aún no ha creado la app, ejecute

    $ heroku create evente-client-ng1

3 Deployar (sube los cambios del commit y deploya)

    $ git push heroku master


See also, a [ready-made application](https://github.com/heroku/node-js-getting-started), ready to deploy.


## License

MIT: [LICENSE](https://github.com/upeu-2018-pro/evente-client-ng1/blob/master/LICENSE)


### Contributors


See https://github.com/upeu-2018-pro/evente-client-ng1/graphs/contributors

[github]: https://github.com/upeu-2018-pro/evente-client-ng1



