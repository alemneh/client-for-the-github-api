'use strict';
const angular = require('angular');

const app = angular.module('GitHubApp', []);
app.controller('UserController', ['$http', function($http) {
  var route = 'https://api.github.com/users/alemneh';
  const vm = this;
  vm.stars = 0;
  vm.starred = [];

  vm.getUser = function() {
    $http.get(route)
      .then((res) => {
        console.log(res.data);
        vm.user = res.data;
      }, function(error) {
        console.log('error');
      })
  }
  vm.getRepos = function() {
    $http.get(route +'/'+ 'repos')
      .then((res) => {
        console.log(res);
        res.data.forEach((repo) => {
          // console.log(repo.targazers_count);
          vm.stars += repo.stargazers_count;
        })
        vm.repos = res.data;
        console.log(typeof vm.stars);
      }, function(error) {
        console.log(error);
      })
  }
  vm.getStarred = function() {
    $http.get(route +'/starred')
      .then((res) => {
        console.log(res);
        vm.starred.push(res.data.name);
      })
  }
}])
