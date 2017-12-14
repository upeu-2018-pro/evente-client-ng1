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
//'ngDevhres',

//====================================================
// Constantes de la app
//====================================================
//app.constant("authUrl", "https://upeuauth-serve.herokuapp.com"); // Authorization Server -> oauth2_backend_service http://localhost:7001
app.constant("authUrl", "https://evente-serve.herokuapp.com"); // Authorization Server -> oauth2_backend_service http://localhost:7001

app.constant("apiUrl", "https://evente-serve.herokuapp.com"); // Resource Server -> catalogo

app.constant("homeUrl", "http://localhost:9001"); // Página de inicio o de convergencia








app

// Temas de la app
    .config(function($mdThemingProvider) {
    $mdThemingProvider.definePalette('amazingPaletteName', {
        '50': 'ffebee',
        '100': 'ffcdd2',
        '200': 'ef9a9a',
        '300': 'e57373',
        '400': 'ef5350',
        '500': 'f44336',
        '600': 'e53935',
        '700': 'd32f2f',
        '800': 'c62828',
        '900': 'b71c1c',
        'A100': 'ff8a80',
        'A200': 'ff5252',
        'A400': 'ff1744',
        'A700': 'd50000',
        'contrastDefaultColor': 'light', // whether, by default, text (contrast)
        // on this palette should be dark or light
        'contrastDarkColors': ['50', '100', //hues which contrast should be 'dark' by default
            '200', '300', '400', 'A100'
        ],
        'contrastLightColors': undefined // could also specify this if default was 'dark'
    });
    //$mdThemingProvider.theme('default').primaryPalette('amazingPaletteName');

    $mdThemingProvider.theme('default').primaryPalette('blue', { 'default': '900' });


    $mdThemingProvider.theme('docs-dark')
        .primaryPalette('grey')
        .dark();

    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple'); // specify primary color, all
    // other color intentions will be inherited
    // from default


    var neonRedMap = $mdThemingProvider.extendPalette('red', {
        '500': '#ff0000',
        'contrastDefaultColor': 'dark'
    });

    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonRed', neonRedMap);


    $mdThemingProvider.theme('panelTheme')
        .primaryPalette('neonRed')
        .dark();
});


app

    .config(function($mdThemingProvider) {
    //$mdThemingProvider.setDefaultTheme('default');
    $mdThemingProvider.alwaysWatchTheme(true);

});
