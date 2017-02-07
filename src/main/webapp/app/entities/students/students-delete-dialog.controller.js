(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .controller('StudentsDeleteController',StudentsDeleteController);

    StudentsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Students'];

    function StudentsDeleteController($uibModalInstance, entity, Students) {
        var vm = this;

        vm.students = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Students.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
