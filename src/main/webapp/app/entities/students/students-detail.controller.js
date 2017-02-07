(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('StudentsDetailController', StudentsDetailController);

    StudentsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Students', 'Field_of_study'];

    function StudentsDetailController($scope, $rootScope, $stateParams, previousState, entity, Students, Field_of_study) {
        var vm = this;

        vm.students = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('educationStudentApp:studentsUpdate', function(event, result) {
            vm.students = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
