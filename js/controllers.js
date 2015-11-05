angular.module('starter.controllers', [])

.controller('homeCtrl', function($scope, $timeout, PersonService) {
$scope.items = [];
$scope.newItems = [];
  
  PersonService.GetFeed().then(function(items){
  $scope.items = items;
  });
  
  $scope.doRefresh = function() {
    if($scope.newItems.length > 0){
      $scope.items = $scope.newItems.concat($scope.items);
        
      //Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
      
      $scope.newItems = [];
    } else {
      PersonService.GetNewUsers().then(function(items){
        $scope.items = items.concat($scope.items);
        
        //Stop the ion-refresher from spinning
        $scope.$broadcast('scroll.refreshComplete');
      });
    }
  };
  
  $scope.loadMore = function(){
    PersonService.GetOldUsers().then(function(items) {
      $scope.items = $scope.items.concat(items);
    
      $scope.$broadcast('scroll.infiniteScrollComplete');
    });
  };
  
   var CheckNewItems = function(){
    $timeout(function(){
      PersonService.GetNewUsers().then(function(items){
        $scope.newItems = items.concat($scope.newItems);
      
        CheckNewItems();
      });
    },10000);
   }
  
  CheckNewItems();
})

.controller('ShareCtrl', function($scope, Chats) {
 $scope.whatsappShare=function(){
    window.plugins.socialsharing.shareViaWhatsApp('All Courier Tracking APP', null /* img */, 
      "https://play.google.com/store/apps/details?id=com.pointdeveloper.allcouriertracking" /* url */, null, function(errormsg){alert("Error: Cannot Share")});
  }
   $scope.twitterShare=function(){
    window.plugins.socialsharing.shareViaTwitter('All Courier Tracking APP', null /* img */, 
      'https://play.google.com/store/apps/details?id=com.pointdeveloper.allcouriertracking', null, function(errormsg){alert("Error: Cannot Share")});
  }
   $scope.facebookShare=function(){
     // window.plugins.socialsharing.share('All Courier Tracking APP', null, null, 
     //  'https://play.google.com/store/apps/details?id=com.pointDeveloper.AllCourierTracking');
          window.plugins.socialsharing.shareViaFacebook('All Courier Tracking APP', null /* img */, 
            "https://play.google.com/store/apps/details?id=com.pointdeveloper.allcouriertracking" /* url */,null, function(errormsg){alert("Error: Cannot Share")});
     // window.plugins.socialsharing.shareVia('facebook', 'All Courier Tracking APP', null, null, 
     //    "https://play.google.com/store/apps/details?id=com.pointDeveloper.AllCourierTracking", null, function(msg) {alert("Error: Cannot Share")});
  }
   $scope.OtherShare=function(){
     window.plugins.socialsharing.share('All Courier Tracking APP', null, null, 
      'https://play.google.com/store/apps/details?id=com.pointdeveloper.allcouriertracking');
  }
})


.factory('PersonService', function($http){
  var BASE_URL = "http://api.randomuser.me/";
  var items = [];
  
  return {
    GetFeed: function(){
      return $http.get(BASE_URL+'?results=10').then(function(response){
        items = response.data.results;
        return items;
      });
    },
    GetNewUsers: function(){
      return $http.get(BASE_URL+'?results=2').then(function(response){
        items = response.data.results;
        return items;
      });
    },
    GetOldUsers: function(){
      return $http.get(BASE_URL+'?results=10').then(function(response){
        items = response.data.results;
        return items;
      });
    }
  }
});