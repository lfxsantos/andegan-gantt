angular.module('andegan', [
    'ui.router', 'ngResource', 'mongolabResourceHttp', 'ui.bootstrap', 'angular.filter', 'angularMoment',
    'datatables', 'ngAnimate', 'gantt', 'gantt.table', 'gantt.tooltips','gantt.movable','gantt.overlap', 'gantt.dependencies',
    'gantt.progress', 'ngSanitize','gantt.resizeSensor'
])
    .constant('MONGOLAB_CONFIG', {API_KEY: 'YXgR-q92vuVCKlSm-ji3nplDTE7rHIQh', DB_NAME: 'andegan'})
    .run(dtLanguageConfig)
    .run(function (amMoment) {
        amMoment.changeLocale('pt-br');
    });
function dtLanguageConfig (DTDefaultOptions) {
    DTDefaultOptions.setLanguage({
        "emptyTable": "Nenhum registro encontrado",
        "info": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
        "infoEmpty": "Mostrando 0 até 0 de 0 registros",
        "infoFiltered": "(Filtrados de _MAX_ registros)",
        "infoPostFix": "",
        "infoThousands": ".",
        "lengthMenu": "_MENU_ resultados por página",
        "loadingRecords": "Carregando...",
        "processing": "Processando...",
        "zeroRecords": "Nenhum registro encontrado",
        "search": "Pesquisar",
        "paginate": {
            "next": "Próximo",
            "previous": "Anterior",
            "first": "Primeiro",
            "last": "Último"
        },
        "aria": {
            "sortAscending": ": Ordenar colunas de forma ascendente",
            "sortDescending": ": Ordenar colunas de forma descendente"
        }
    });
}