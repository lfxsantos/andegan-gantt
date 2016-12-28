angular.module('andegan')
    .factory('LoginFactory', function LoginFactory (Usuario, $window, $state) {
        LoginFactory.login = function (usuario, senha, vm) {
            waitingDialog.show("Validando login na rede. Aguarde");
            var query = {
                "login": usuario,
                "senha": senha
            };

            Usuario.query(query).then(function (usuarios) {
                if (usuarios[0]) {
                    waitingDialog.hide();
                    $window.sessionStorage.setItem('andeganLogado', angular.toJson(usuarios[0]));
                    $state.go('home');
                } else {
                    vm.errorLogin = "Login e ou senha inválidos";
                    waitingDialog.hide();
                }
            });

        };
        return LoginFactory;
    });