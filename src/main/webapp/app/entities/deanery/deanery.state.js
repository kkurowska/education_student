(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('deanery', {
            parent: 'entity',
            url: '/deanery?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.deanery.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/deanery/deaneries.html',
                    controller: 'DeaneryController',
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
                    $translatePartialLoader.addPart('deanery');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('deanery-detail', {
            parent: 'deanery',
            url: '/deanery/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.deanery.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/deanery/deanery-detail.html',
                    controller: 'DeaneryDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('deanery');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Deanery', function($stateParams, Deanery) {
                    return Deanery.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'deanery',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('deanery-detail.edit', {
            parent: 'deanery-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/deanery/deanery-dialog.html',
                    controller: 'DeaneryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Deanery', function(Deanery) {
                            return Deanery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('deanery.new', {
            parent: 'deanery',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/deanery/deanery-dialog.html',
                    controller: 'DeaneryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                position: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('deanery', null, { reload: 'deanery' });
                }, function() {
                    $state.go('deanery');
                });
            }]
        })
        .state('deanery.edit', {
            parent: 'deanery',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/deanery/deanery-dialog.html',
                    controller: 'DeaneryDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Deanery', function(Deanery) {
                            return Deanery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('deanery', null, { reload: 'deanery' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('deanery.delete', {
            parent: 'deanery',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/deanery/deanery-delete-dialog.html',
                    controller: 'DeaneryDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Deanery', function(Deanery) {
                            return Deanery.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('deanery', null, { reload: 'deanery' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
