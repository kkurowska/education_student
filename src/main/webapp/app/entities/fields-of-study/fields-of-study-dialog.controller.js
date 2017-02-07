(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('Fields_of_studyDialogController', Fields_of_studyDialogController);

    Fields_of_studyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Fields_of_study'];

    function Fields_of_studyDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Fields_of_study) {
        var vm = this;

        vm.fields_of_study = entity;
        vm.clear = clear;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.fields_of_study.id !== null) {
                Fields_of_study.update(vm.fields_of_study, onSaveSuccess, onSaveError);
            } else {
                Fields_of_study.save(vm.fields_of_study, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('educationStudentApp:fields_of_studyUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
