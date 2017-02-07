(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('students', {
            parent: 'entity',
            url: '/students?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.students.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/students/students.html',
                    controller: 'StudentsController',
                    controllerAs: 'vm'
                }
            },
            params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                },
                search: null
            },
            resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort),
                        search: $stateParams.search
                    };
                }],
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('students');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('students-detail', {
            parent: 'students',
            url: '/students/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.students.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/students/students-detail.html',
                    controller: 'StudentsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('students');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Students', function($stateParams, Students) {
                    return Students.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'students',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('students-detail.edit', {
            parent: 'students-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/students/students-dialog.html',
                    controller: 'StudentsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Students', function(Students) {
                            return Students.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('students.new', {
            parent: 'students',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/students/students-dialog.html',
                    controller: 'StudentsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                index_number: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('students', null, { reload: 'students' });
                }, function() {
                    $state.go('students');
                });
            }]
        })
        .state('students.edit', {
            parent: 'students',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/students/students-dialog.html',
                    controller: 'StudentsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Students', function(Students) {
                            return Students.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('students', null, { reload: 'students' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('students.delete', {
            parent: 'students',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/students/students-delete-dialog.html',
                    controller: 'StudentsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Students', function(Students) {
                            return Students.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('students', null, { reload: 'students' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
