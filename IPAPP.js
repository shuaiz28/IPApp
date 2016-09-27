var app = angular.module("myApp", []);
app.controller("myController", function($scope, $http) {
	$scope.init = function() {
		jQuery("#queryIPInfoPanel").hide();
		jQuery("#curIPInfoPanel").show();
		$scope.panelHeader = "Current IP Information";
		$http.get("http://ip-api.com/json").then(function(response) {
			console.log(response.data);
			$scope.curIPInfo = response.data;
			var lat = $scope.curIPInfo.lat;
			var lon = $scope.curIPInfo.lon;
			//alert(lat+" "+lon);
			showMapImg(lat, lon);
		});
	};
	
	$scope.queryIP = function() {
		jQuery("#curIPInfoPanel").hide();
		jQuery("#queryIPInfoPanel").show();
		$scope.panelHeader = "Query IP Information";
		var ip = $scope.inputIP;
		if (!ip) {
			$scope.init();
		} else {
			$http.get("http://ip-api.com/json/"+ip).then(function(response) {
				console.log(response.data);
				$scope.queryIPInfo = response.data;
				var lat = $scope.queryIPInfo.lat;
				var lon = $scope.queryIPInfo.lon;
				showMapImg(lat, lon);
			});
		}
		console.log(ip);		
	};

	function showMapImg(lat, lon) {
		//showing Google Map Img of given lat & lon
		var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center="
	    				+lat+","+lon+"&zoom=14&size=400x300&sensor=false";
	    jQuery("#mapholder").html("<img src='"+imgUrl+"' />");
	}
});