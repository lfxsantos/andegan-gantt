angular.module('andegan').controller('HomeController', function ($scope, Recurso) {
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
});