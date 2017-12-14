﻿app
    //==================================
    // Activar icones que se desactivaron en la versión de angular mayores a v1.0.9
    //==================================
    .config(function ($mdIconProvider, $$mdSvgRegistry) {
        // Add default icons from angular material para versiones no estables mayores a v1.0.9
        // la version v1.0.9 no necesita hacer esto
        $mdIconProvider
            .icon('md-close', $$mdSvgRegistry.mdClose)
            .icon('md-menu', $$mdSvgRegistry.mdMenu)
            .icon('md-toggle-arrow', $$mdSvgRegistry.mdToggleArrow);
    })
    //==================================
    // Interceptors de la app
    //==================================
    .config(function ($httpProvider) {
        //$httpProvider.defaults.xsrfCookieName = 'csrftoken';
        //$httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

        // interceptor en HTTP
        $httpProvider.interceptors.push('oauth2InterceptorService');
    })

    //==================================
    // para activar $resource https://docs.angularjs.org/api/ngResource/service/$resource
    //==================================
    .config(function ($resourceProvider) {
        // Don't strip trailing slashes from calculated URLs
        $resourceProvider.defaults.stripTrailingSlashes = false;
    })

    //==================================
    // Cambiar md-datepicker para formato 'DD/MM/YYYY' y primer día Domingo con moment.js
    // <md-datepicker name="fecha_nac" ng-model="autor.fecha_nacT"></md-datepicker>
    //==================================
    .config(function ($mdDateLocaleProvider, $provide, $translateProvider) {
        // set save dynamicTheme
        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }

        moment.locale(getCookie("lang").substring(0, 2));
        // Example uses moment.js to parse and format dates.
        $mdDateLocaleProvider.parseDate = function (dateString) {
            var m = moment(dateString, 'L', true);
            return m.isValid() ? m.toDate() : new Date(NaN);
        };

        $mdDateLocaleProvider.formatDate = function (date) {
            var m = moment(date);
            return m.isValid() ? m.format('L') : '';
        };
        var localeDate = moment.localeData();
        $mdDateLocaleProvider.months = localeDate._months;
        //$mdDateLocaleProvider.shortMonths = localeDate._monthsShort;
        $mdDateLocaleProvider.days = localeDate._weekdays;
        $mdDateLocaleProvider.shortDays = localeDate._weekdaysMin;

        //$mdDateLocaleProvider.msgCalendar = $translateProvider.instant('MSG_CALENDAR');
        //$mdDateLocaleProvider.msgOpenCalendar = $translateProvider.instant('MSG_OPEN_CALENDAR');

    })

    //====================================================
    // idiomas escaping
    //====================================================
    .config(function ($translateProvider) {
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escape');
        // Enable escaping of HTML
        $translateProvider.useSanitizeValueStrategy('escapeParameters');
    })

    //====================================================
    // locale dianámico y también los idiomas
    // ver MainCtrl la función $scope.changeLanguage = function(lang) {
    //====================================================
    .config(function (tmhDynamicLocaleProvider) {
        //tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');
        tmhDynamicLocaleProvider.localeLocationPattern('bower_components/angular-i18n/angular-locale_{{locale}}.js');
        //tmhDynamicLocaleProvider.localeLocationPattern('locale/catalogo-locale_{{locale}}.js');
    })






    //==================================
    // routers de la app
    //==================================
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, ROUTERS) {

        $urlRouterProvider.otherwise('/catalogo');

        $stateProvider

            //==================================
            // Página principal
            //==================================
            .state('home', {
                url: '/home',
                templateUrl: '/app/views/layouts/home.html',
                loginRequired: false
            });


        //====================================================
        // Routers dinámicos de la app, ver router.js
        //====================================================
        ROUTERS.forEach(function (collection) {
            for (var routeName in collection) {
                $stateProvider.state(routeName, collection[routeName]);
            }
        });

        //console.log("access_token=" + localStorage.getItem("access_token")); //se llena en la segunda, se tiene que hacer F5
        //var collectionr = localStorage.getItem("collection"); //se llena en la segunda, se tiene que hacer F5

    });



app
    //====================================================
    // Modelo lite para datos del usuario
    //====================================================
    .service('userService', function () {
        return {
            isAauth: null,
            userName: null,
        };
    });

app

    //====================================================
    // Permite acceder a $state and $stateParams desde cualquier parte de la pp
    //====================================================
    .run(function ($rootScope, $state, $stateParams, $window) {
        // It's very handy to add references to $state and $stateParams to the $rootScope
        // so that you can access them from any scope within your applications.For example,
        // <li ng-class="{ active: $state.includes('contacts.list') }"> will set the <li>
        // to active whenever 'contacts.list' or one of its decendents is active.
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;


    })

    //====================================================
    // Permite acceder a userService desde cualquier parte de la pp
    //====================================================
    .run(function ($rootScope, userService) {
        $rootScope.userService = userService;
    })










    //====================================================
    // oauth2Service and menuService runing
    //====================================================
    .run(function (oauth2Service, menuService, $state, $rootScope, $location, authUrl, $window, userService, $http) {

        menuService.menuUrl = "menu.json";
        //menuService.apiMenuUrl = "http://localhost:7001/api-core/usermenu/";
        $rootScope.menu = menuService.getMenu();

        oauth2Service.loginUrl = authUrl + "/o/authorize/";
        //oauth2Service.oidcUrl = authUrl + "";
        oauth2Service.redirectUri = "http://localhost:9003"; // si colocas, colocar tal cual está registrado en al app
        console.log("location.origin=" + location.origin);

        oauth2Service.clientId = "rrAcmEKW34DitRKiX4On84LLWNBBkCjEOmpcjmL3";
        oauth2Service.scope = "catalogo"; //comentar si no está configurado

        if (oauth2Service.tryLogin()) {
            console.log("oauth2Service.state=" + oauth2Service.state);
            if (oauth2Service.state) { // regresa a next #/url
                $location.url(oauth2Service.state.substr(2)); // führendes # abschneiden
            }
        }
        //https://github.com/angular-ui/ui-router/wiki
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            console.log("$stateChangeStart isAauthenticated=" + oauth2Service.isAauthenticated());
            if (toState.loginRequired && !oauth2Service.isAauthenticated()) { //si no está logeado
                console.log('DENY');
                event.preventDefault();
                // transitionTo() promise will be rejected with 
                // a 'transition prevented' error
                var stateUrl = $state.href(toState, toParams); //obtiene la url del state
                console.log("stateUrl=" + stateUrl);
                console.log("window.location.hash=" + window.location.hash);
                //$state.transitionTo("login", { next: stateUrl });

                oauth2Service.createLoginUrl(stateUrl).then(function (url) {
                    console.log("stateUrl=" + stateUrl);
                    console.log("url=" + url);
                    //element.attr("onclick", "location.href='" + url + "'");
                    $window.location = url;

                })
                    .catch(function (error) {
                        throw error;
                    });
            }

            if (!oauth2Service.isAauthenticated()) {
                console.log('Desconectado');
                userService.isAauth = null;
                userService.userName = null;
            }
            if (oauth2Service.isAauthenticated()) {
                userService.isAauth = 'true';
                $http.get(authUrl + "/api-core/localuserinfo/").then(function (result) {
                    var claimsJson = result.data;
                    //localStorage.setItem("id_token_claims_obj", claimsJson);
                    userService.userName = claimsJson.username;
                }, function (err) {
                    console.log("Error :" + JSON.stringify(err));
                });
            }
        });

        $rootScope.$on('$stateChangeSuccess', function () {

        });

        $rootScope.$on('loginRequired', function () {
            console.log("emit loginRequired ");
            //$state.go('login');
        });

    });
