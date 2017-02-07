(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('fields-of-study', {
            parent: 'entity',
            url: '/fields-of-study?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.fields_of_study.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fields-of-study/fields-of-studies.html',
                    controller: 'Fields_of_studyController',
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
                    $translatePartialLoader.addPart('fields_of_study');
                    $translatePartialLoader.addPart('degreeOfStudies');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('fields-of-study-detail', {
            parent: 'fields-of-study',
            url: '/fields-of-study/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.fields_of_study.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/fields-of-study/fields-of-study-detail.html',
                    controller: 'Fields_of_studyDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('fields_of_study');
                    $translatePartialLoader.addPart('degreeOfStudies');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Fields_of_study', function($stateParams, Fields_of_study) {
                    return Fields_of_study.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'fields-of-study',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('fields-of-study-detail.edit', {
            parent: 'fields-of-study-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fields-of-study/fields-of-study-dialog.html',
                    controller: 'Fields_of_studyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fields_of_study', function(Fields_of_study) {
                            return Fields_of_study.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fields-of-study.new', {
            parent: 'fields-of-study',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fields-of-study/fields-of-study-dialog.html',
                    controller: 'Fields_of_studyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                start_year: null,
                                degree_of_studies: null,
                                deleted: false,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('fields-of-study', null, { reload: 'fields-of-study' });
                }, function() {
                    $state.go('fields-of-study');
                });
            }]
        })
        .state('fields-of-study.edit', {
            parent: 'fields-of-study',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fields-of-study/fields-of-study-dialog.html',
                    controller: 'Fields_of_studyDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Fields_of_study', function(Fields_of_study) {
                            return Fields_of_study.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fields-of-study', null, { reload: 'fields-of-study' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('fields-of-study.delete', {
            parent: 'fields-of-study',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/fields-of-study/fields-of-study-delete-dialog.html',
                    controller: 'Fields_of_studyDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Fields_of_study', function(Fields_of_study) {
                            return Fields_of_study.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('fields-of-study', null, { reload: 'fields-of-study' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
