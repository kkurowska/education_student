(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('ProfessorsDetailController', ProfessorsDetailController);

    ProfessorsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Professors'];

    function ProfessorsDetailController($scope, $rootScope, $stateParams, previousState, entity, Professors) {
        var vm = this;

        vm.professors = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('educationStudentApp:professorsUpdate', function(event, result) {
            vm.professors = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
