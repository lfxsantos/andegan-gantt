angular.module('andegan')
    .directive(
    "mAppLoading",
    function ($animate) {
        return ({
            link: link,
            restrict: "C"
        });
        function link(scope, element, attributes) {
            $animate.leave(element.children().eq(1)).then(
                function cleanupAfterAnimation() {
                    element.remove();
                    scope = element = attributes = null;
                }
            );
        }
    });
