(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('CoursesDetailController', CoursesDetailController);

    CoursesDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Courses', 'Professors'];

    function CoursesDetailController($scope, $rootScope, $stateParams, previousState, entity, Courses, Professors) {
        var vm = this;

        vm.courses = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('educationStudentApp:coursesUpdate', function(event, result) {
            vm.courses = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
