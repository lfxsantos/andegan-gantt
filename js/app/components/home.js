angular.module('andegan').controller('HomeController', function ($scope, Recurso, $uibModal) {

    var colors = ["#FFF8DC","#EEE8CD","#CDC8B1","#8B8878","#FFFFF0","#EEEEE0","#CDCDC1","#8B8B83","#F0FFF0","#E0EEE0","#C1CDC1","#838B83","#FFF0F5","#EEE0E5","#CDC1C5","#8B8386","#FFE4E1","#EED5D2","#CDB7B5","#8B7D7B","#F0FFFF","#E0EEEE","#C1CDCD","#838B8B","#836FFF","#7A67EE","#6959CD","#473C8B","#4876FF","#436EEE","#3A5FCD","#27408B","#0000FF","#0000EE","#0000CD","#00008B","#1E90FF","#1C86EE","#1874CD","#104E8B","#63B8FF","#5CACEE","#4F94CD","#36648B","#00BFFF","#00B2EE","#009ACD","#00688B","#87CEFF","#7EC0EE","#6CA6CD","#4A708B","#B0E2FF","#A4D3EE","#8DB6CD","#607B8B","#C6E2FF","#B9D3EE","#9FB6CD","#6C7B8B","#CAE1FF","#BCD2EE","#A2B5CD","#6E7B8B","#BFEFFF","#B2DFEE","#9AC0CD","#68838B","#E0FFFF","#D1EEEE","#B4CDCD","#7A8B8B","#BBFFFF","#AEEEEE","#96CDCD","#668B8B","#98F5FF","#8EE5EE","#7AC5CD","#53868B","#00F5FF","#00E5EE","#00C5CD","#00868B","#00FFFF","#00EEEE","#00CDCD","#008B8B","#97FFFF","#8DEEEE","#79CDCD","#528B8B","#7FFFD4","#76EEC6","#66CDAA","#458B74","#C1FFC1","#B4EEB4","#9BCD9B","#698B69","#54FF9F","#4EEE94","#43CD80","#2E8B57","#9AFF9A","#90EE90","#7CCD7C","#548B54","#00FF7F","#00EE76","#00CD66","#008B45","#00FF00","#00EE00","#00CD00","#008B00","#7FFF00","#76EE00","#66CD00","#458B00","#C0FF3E","#B3EE3A","#9ACD32","#698B22","#CAFF70","#BCEE68","#A2CD5A","#6E8B3D","#FFF68F","#EEE685","#CDC673","#8B864E","#FFEC8B","#EEDC82","#CDBE70","#8B814C","#FFFFE0","#EEEED1","#CDCDB4","#8B8B7A","#FFFF00","#EEEE00","#CDCD00","#8B8B00","#FFD700","#EEC900","#CDAD00","#8B7500","#FFC125","#EEB422","#CD9B1D","#8B6914","#FFB90F","#EEAD0E","#CD950C","#FFC1C1","#EEB4B4","#CD9B9B","#8B6969","#FF6A6A","#EE6363","#CD5555","#8B3A3A","#FF8247","#EE7942","#CD6839","#8B4726","#FFD39B","#EEC591","#CDAA7D","#8B7355","#FFE7BA","#EED8AE","#CDBA96","#8B7E66","#FFA54F","#EE9A49","#CD853F","#8B5A2B","#FF7F24","#EE7621","#CD661D","#8B4513","#FF3030","#EE2C2C","#CD2626","#8B1A1A","#FF4040","#EE3B3B","#CD3333","#8B2323","#FF8C69","#EE8262","#CD7054","#8B4C39","#FFA07A","#EE9572","#CD8162","#8B5742","#FFA500","#EE9A00","#CD8500","#8B5A00","#FF7F00","#EE7600","#CD6600","#8B4500","#FF7256","#EE6A50","#CD5B45","#8B3E2F","#FF6347","#EE5C42","#CD4F39","#8B3626","#FF4500","#EE4000","#CD3700","#8B2500","#FF0000","#EE0000","#CD0000","#8B0000","#FF1493","#EE1289","#CD1076","#8B0A50","#FF6EB4","#EE6AA7","#CD6090","#8B3A62","#FFB5C5","#EEA9B8","#CD919E","#8B636C","#FFAEB9","#EEA2AD","#CD8C95","#8B5F65","#FF82AB","#EE799F","#CD6889","#8B475D","#FF34B3","#EE30A7","#CD2990","#8B1C62","#FF3E96","#EE3A8C","#CD3278","#8B2252","#FF00FF","#EE00EE","#CD00CD","#8B008B","#FF83FA","#EE7AE9","#CD69C9","#8B4789","#FFBBFF","#EEAEEE","#CD96CD","#8B668B","#E066FF","#D15FEE","#B452CD","#7A378B","#BF3EFF","#B23AEE","#9A32CD","#68228B","#9B30FF","#912CEE","#7D26CD","#551A8B","#AB82FF","#9F79EE","#8968CD","#5D478B","#FFE1FF","#EED2EE","#CDB5CD","#8B7B8B","#1C1C1C","#363636","#4F4F4F","#696969","#828282","#9C9C9C","#B5B5B5","#CFCFCF","#E8E8E8","#A9A9A9","#00008B","#008B8B","#8B008B","#8B0000","#90EE90"];

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

                api.core.on.ready($scope, function() {



                    if (api.tasks.on.moveBegin) {

                        api.tasks.on.moveEnd($scope, addEventName('tasks.on.moveEnd', atualizaDataOcupacao));

                        api.tasks.on.resizeEnd($scope, addEventName('tasks.on.resizeEnd', atualizaDataOcupacao));
                    }
                });

            }
        };

        $scope.dtInicio= new Date();
        $scope.dtFim=moment().add(1, 'day').toDate();
        loadGantt();
    };

    // Event utility function
    var addEventName = function(eventName, func) {
        return function(data) {
            return func(eventName, data);
        };
    };

    // Event handler
    var atualizaDataOcupacao = function(eventName, task) {

        console.log(task);

        task.row.model.recurso.ocupacao[task.model.ind].inicio.$date = task.model.from.toDate();
        task.row.model.recurso.ocupacao[task.model.ind].fim.$date = task.model.to.toDate();

        task.row.model.recurso.$saveOrUpdate().then(function(){
            console.log("funfa mesmo");
        });


    };



    $scope.filtrar = function(){

        $scope.ganttOptions.fromDate = $scope.dtInicio;
        $scope.ganttOptions.toDate = $scope.dtFim;

    };

    function loadGantt () {
        $scope.ganttData = [];
        Recurso.all().then(function (recursos) {
            angular.forEach(recursos, function (recurso) {
                var row = {
                    "name": recurso.nome,
                    "tasks": [],
                    "recurso": recurso
                };

                for (var i = 0; i < recurso.ocupacao.length; i++) {

                    var task = {
                        "name": recurso.ocupacao[i].nome,
                        "from": moment(recurso.ocupacao[i].inicio.$date),
                        "to": moment(recurso.ocupacao[i].fim.$date),
                        "color" : colors.splice(Math.floor(Math.random()* colors.length-1) + 1,1),
                        "ind" : i
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

