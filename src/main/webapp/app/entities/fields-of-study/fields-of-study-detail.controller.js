(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('Fields_of_studyDetailController', Fields_of_studyDetailController);

    Fields_of_studyDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Fields_of_study'];

    function Fields_of_studyDetailController($scope, $rootScope, $stateParams, previousState, entity, Fields_of_study) {
        var vm = this;

        vm.fields_of_study = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('educationStudentApp:fields_of_studyUpdate', function(event, result) {
            vm.fields_of_study = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
