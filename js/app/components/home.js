angular.module('andegan').controller('HomeController', function ($scope, Recurso, $uibModal) {
    $scope.initHome = function () {
        $scope.ganttOptions = {
            "dateFormat": "dddd, DD/MM/YYYY",
            "currentDate": 'line',
            "daily": true,
            "tableHeaders": {'model.name': 'Recurso'},
            "fromDate": undefined,
            "toDate": undefined,
            api: function(api) {
                $scope.api = api;
            }
        };
        loadGantt();
    };

    function loadGantt () {
        $scope.ganttData = [];
        Recurso.all().then(function (recursos) {
            angular.forEach(recursos, function (recurso) {
                var row = {
                    "name": recurso.nome,
                    "tasks": []
                };
                for (var i = 0; i < recurso.ocupacao.length; i++) {
                    var task = {
                        "name": recurso.ocupacao[i].nome,
                        "from": moment(recurso.ocupacao[i].inicio.$date),
                        "to": moment(recurso.ocupacao[i].fim.$date)
                    };
                    row.tasks.push(task);
                }
                $scope.ganttData.push(row);
            });

        });
    }

    $scope.adicionarOcupacao = function () {
        $uibModal
            .open({
                templateUrl: 'views/home/new-ocupation.html',
                controller: 'ModalNewOcupationController'
            }).result.then(function () {
                loadGantt();
            }, function () {
            });
    }

});

angular.module('andegan').controller('ModalNewOcupationController', function ($scope, Recurso, $uibModal) {
    $scope.initModal = function () {
        $scope.novaOcupacao = {
            "nome": "",
            "inicio": {
                "$date": new Date()
            },
            "fim": {
                "$date": moment().add(1, 'day').toDate()
            }
        };
        $scope.novoRecurso = {
            "nome": ""
        };
        $scope.recursoSelecionado = {};
        $scope.nomeDisabled = "disabled";
        $scope.nameErro = "";
        $scope.inicioErro = "";
        $scope.recursos = [];
        Recurso.all().then(function (recursos) {
            $scope.recursos = recursos;
        });
    };

    $scope.ok = function () {
        waitingDialog.show("Salvando nova ocupação. Aguarde.");

        if($scope.recursoSelecionado && $scope.recursoSelecionado.nome) {
            if($scope.recursoSelecionado.ocupacao) {
                $scope.recursoSelecionado.ocupacao.push($scope.novaOcupacao);
            } else {
                $scope.recursoSelecionado.ocupacao = [];
            }

            $scope.recursoSelecionado.$saveOrUpdate().then(function () {
                waitingDialog.hide();
                $scope.$close(true);
            });
        } else {
            if($scope.novoRecurso.nome) {
                var novoRecurso = new Recurso();
                novoRecurso = angular.merge(novoRecurso, $scope.novoRecurso);
                novoRecurso.ocupacao = [];
                novoRecurso.ocupacao.push($scope.novaOcupacao);
                novoRecurso.$saveOrUpdate().then(function () {
                    waitingDialog.hide();
                    $scope.$close(true);
                });
            }
        }
    };

    $scope.cancel = function () {
        $scope.$dismiss();
    };

});

