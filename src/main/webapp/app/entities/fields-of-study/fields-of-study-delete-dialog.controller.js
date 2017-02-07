(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('Fields_of_studyDeleteController',Fields_of_studyDeleteController);

    Fields_of_studyDeleteController.$inject = ['$uibModalInstance', 'entity', 'Fields_of_study'];

    function Fields_of_studyDeleteController($uibModalInstance, entity, Fields_of_study) {
        var vm = this;

        vm.fields_of_study = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Fields_of_study.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
