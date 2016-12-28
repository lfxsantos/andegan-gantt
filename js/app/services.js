angular.module('andegan')
    .factory('Usuario', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('usuario');
    })
    .factory('Recurso', function ($mongolabResourceHttp) {
        return $mongolabResourceHttp('recurso');
    });