'use strict';

var app = angular.module('angularjsExpressApp');

app.controller('MainCtrl', function ($scope, Article) {
	$scope.awesomeThings = [
	  'HTML5 Boilerplate',
	  'AngularJS',
	  'Karma'
	];
	
	$scope.refresh = function(item) {
		Article.query( null,
			function(articles, resHdr) { //success
				console.log(">>Article.query: ");
				console.log(articles);
				$scope.articles = articles;
			},
			function(httpRes) { //error
				// var msg = HelperService.GetErrorMessage(httpRes);
				// $notification.error('Data Fetch Failed', msg);
				console.log(httpRes);
			}
		);
	};

   	$scope.refresh();
  });

app.factory('Article', ['$resource', function($resource) {
	return $resource('/articles', null,
	{
		query: { method:'GET' ,isArray:true}
	});
}]);
