angular.module('andegan').controller('LoginController', function ($scope, LoginFactory) {
    var vm = this;
    vm.errorLogin = "";
    vm.usuario = "";
    vm.senha = "";
    $scope.initLogin = function () {

    };

    $scope.login = function () {
        var usuario = vm.usuario;
        var senha = vm.senha;
        LoginFactory.login(usuario, senha, vm);
    };
});