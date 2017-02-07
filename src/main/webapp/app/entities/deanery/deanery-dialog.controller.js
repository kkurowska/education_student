(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('DeaneryDialogController', DeaneryDialogController);

    DeaneryDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Deanery'];

    function DeaneryDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Deanery) {
        var vm = this;

        vm.deanery = entity;
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
            if (vm.deanery.id !== null) {
                Deanery.update(vm.deanery, onSaveSuccess, onSaveError);
            } else {
                Deanery.save(vm.deanery, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('educationStudentApp:deaneryUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }


    }
})();
