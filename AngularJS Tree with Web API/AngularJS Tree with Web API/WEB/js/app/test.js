var app = angular.module('app', []);
app.controller('appCtrl', ['$scope', '$location', function ($scope, $location) {

    $scope.changeView = function (view) {
        $location.path(view); // path not hash
    }

}]);
