var app = angular.module('app', []);

app.controller('baseCtrl', ['$scope', '$http',
    function ($scope, $http) {

		$scope.authToken = 'GPRBPJGEHF2HXBQSU3KYXB350PQDQEQH0H54BAYPEDYUA4JP';
		$scope.authMsg = 'oauth_token=' + $scope.authToken;

		$scope.lat = '';
		$scope.long = '';

		$scope.selectVenue = {};

        $scope.type = 'No result :';

		$scope.usedAPI = '';

		$scope.setVenue = function (v) {
			console.log(v);
			$scope.selectVenue = v;
		};

        $scope.self = function(){
            $http.get('https://api.foursquare.com/v2/users/self?' + $scope.authMsg + '&v=20151203')
            .success(function(data){
                $scope.profile = data.response.user;
            });
        };

		$scope.search = function () {
            $scope.type = 'Search';
			$scope.llMsg = 'll=' + $scope.lat + ',' + $scope.long;
            $scope.usedAPI = 'https://api.foursquare.com/v2/venues/search?' + $scope.llMsg;
			$http.get('https://api.foursquare.com/v2/venues/search?' + $scope.llMsg + '&' + $scope.authMsg + '&v=20151203')
				.success(function (data) {
					$scope.venues = data.response.venues;
					console.log($scope.venues);
				});
		};

        $scope.explore = function () {
            $scope.type = 'Explore';
            $scope.llMsg = 'll=' + $scope.lat + ',' + $scope.long;
            $scope.sectionMsg = 'section=' + $scope.section;
            $scope.usedAPI = 'https://api.foursquare.com/v2/venues/explore?' + $scope.llMsg + '&' + $scope.sectionMsg;
			$http.get('https://api.foursquare.com/v2/venues/explore?' + $scope.llMsg + '&' + $scope.sectionMsg + '&' + $scope.authMsg + '&v=20151203')
				.success(function (data) {
					$scope.venues = data.response.groups[0].items;
					console.log($scope.venues);
				});
		};

		$scope.trending = function () {
            $scope.type = 'Trending';
            $scope.llMsg = 'll=' + $scope.lat + ',' + $scope.long;
            $scope.usedAPI = 'https://api.foursquare.com/v2/venues/trending?' + $scope.llMsg;
			$http.get('https://api.foursquare.com/v2/venues/trending?' + $scope.llMsg + '&' + $scope.authMsg + '&v=20151203')
				.success(function (data) {
					$scope.venues = data.response.venues;
					console.log($scope.venues);
				});
		};

		$scope.checkHis = function () {
			$http.get('https://api.foursquare.com/v2/users/self/checkins?' + $scope.authMsg + '&v=20151203')
				.success(function (data) {
					$scope.history = data.response.checkins;
				});
		};

		$scope.checkin = function (id) {
            $scope.usedAPI = 'https://api.foursquare.com/v2/checkins/add?venueId=' + id;
		    $http.post('https://api.foursquare.com/v2/checkins/add?venueId=' + id + '&' + $scope.authMsg + '&v=20151203')
				.success(function (data) {
					console.log(data);
					$scope.checkHis();
				});
		};

		$scope.test = function (time) {
			var a = new Date(time * 1000);
			var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
			var year = a.getFullYear();
			var month = months[a.getMonth()];
			var date = a.getDate();
			var hour = a.getHours();
			var min = a.getMinutes();
			var sec = a.getSeconds();
			var result = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

            return result;
		};

        $scope.self();
		$scope.checkHis();
    }
]);
