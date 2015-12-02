var blocJamsModule = angular.module('blocJams', ['ui.router']);

blocJamsModule.config(function($stateProvider, $locationProvider) {
    
    $locationProvider.html5Mode({
         enabled: true,
         requireBase: false
     });
    
   $stateProvider
      .state('landing', {
          url: '/',
          controller: 'Landing.controller',
          templateUrl: '/templates/landing.html'
      })
      .state('collection', {
          url: '/collection',
          controller: 'Collection.controller',
          templateUrl: '/templates/collection.html'
      })
      .state('album', {
          url: '/album',
          controller: 'Album.controller',
          templateUrl: '/templates/album.html'
      })
 
});