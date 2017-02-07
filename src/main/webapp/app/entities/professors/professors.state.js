(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('professors', {
            parent: 'entity',
            url: '/professors?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.professors.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/professors/professors.html',
                    controller: 'ProfessorsController',
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
                    $translatePartialLoader.addPart('professors');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('professors-detail', {
            parent: 'professors',
            url: '/professors/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.professors.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/professors/professors-detail.html',
                    controller: 'ProfessorsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('professors');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Professors', function($stateParams, Professors) {
                    return Professors.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'professors',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('professors-detail.edit', {
            parent: 'professors-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professors/professors-dialog.html',
                    controller: 'ProfessorsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Professors', function(Professors) {
                            return Professors.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('professors.new', {
            parent: 'professors',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professors/professors-dialog.html',
                    controller: 'ProfessorsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                degree: null,
                                position: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('professors', null, { reload: 'professors' });
                }, function() {
                    $state.go('professors');
                });
            }]
        })
        .state('professors.edit', {
            parent: 'professors',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professors/professors-dialog.html',
                    controller: 'ProfessorsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Professors', function(Professors) {
                            return Professors.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('professors', null, { reload: 'professors' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('professors.delete', {
            parent: 'professors',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/professors/professors-delete-dialog.html',
                    controller: 'ProfessorsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Professors', function(Professors) {
                            return Professors.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('professors', null, { reload: 'professors' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
