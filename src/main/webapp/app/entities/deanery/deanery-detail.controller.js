(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('DeaneryDetailController', DeaneryDetailController);

    DeaneryDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Deanery'];

    function DeaneryDetailController($scope, $rootScope, $stateParams, previousState, entity, Deanery) {
        var vm = this;

        vm.deanery = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('educationStudentApp:deaneryUpdate', function(event, result) {
            vm.deanery = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
