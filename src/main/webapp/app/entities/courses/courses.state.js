(function() {
    'use strict';

    angular
        .module('educationStudentApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('courses', {
            parent: 'entity',
            url: '/courses?page&sort&search',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.courses.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/courses/courses.html',
                    controller: 'CoursesController',
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
                    $translatePartialLoader.addPart('courses');
                    $translatePartialLoader.addPart('courseType');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('courses-detail', {
            parent: 'courses',
            url: '/courses/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'educationStudentApp.courses.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/courses/courses-detail.html',
                    controller: 'CoursesDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('courses');
                    $translatePartialLoader.addPart('courseType');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Courses', function($stateParams, Courses) {
                    return Courses.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'courses',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('courses-detail.edit', {
            parent: 'courses-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/courses/courses-dialog.html',
                    controller: 'CoursesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Courses', function(Courses) {
                            return Courses.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('courses.new', {
            parent: 'courses',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/courses/courses-dialog.html',
                    controller: 'CoursesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                name: null,
                                type: null,
                                ects: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('courses', null, { reload: 'courses' });
                }, function() {
                    $state.go('courses');
                });
            }]
        })
        .state('courses.edit', {
            parent: 'courses',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/courses/courses-dialog.html',
                    controller: 'CoursesDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Courses', function(Courses) {
                            return Courses.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('courses', null, { reload: 'courses' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('courses.delete', {
            parent: 'courses',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/courses/courses-delete-dialog.html',
                    controller: 'CoursesDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Courses', function(Courses) {
                            return Courses.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('courses', null, { reload: 'courses' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
