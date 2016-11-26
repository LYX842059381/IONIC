angular.module('myApp', ['ionic'])


//通过config 来设置我们应用的路由
.config(['$stateProvider','$urlRouterProvider','$ionicConfigProvider',function($stateProvider,$urlRouterProvider,$ionicConfigProvider){
	//安卓显示底部的内容
	$ionicConfigProvider.platform.android.tabs.position("bottom");

	$stateProvider

	//tab选项卡的路由
	//state 第一个参数是ui-sref的值
	.state('tab',{
		url: '/tab',
		templateUrl: 'template/tab.html',
		abstract: true
	})


	//首页的路由
	.state('tab.home',{
		url: '/home',
		views: {
			"home-tab" : {
				templateUrl: 'template/home.html',
				controller: 'HomeCtrl'
			}
		}
			
	})

	//详情的路由
	.state('tab.detail', {
		url: '/detial',
		views: {
			"news-tab": {
				templateUrl: 'template/detail.html',
				controller: 'DetailCtrl'
			}
		}
	})

	$urlRouterProvider.otherwise('/tab/home')
}])


.controller('HomeCtrl', ['$scope', function($scope){


}])

.controller('DetailCtrl', ['$scope','$ionicPopup', function($scope,$ionicPopup){

	//在给表单控件绑定值的时候，不要绑变量，而是绑定对象下的变量
	$scope.user = {};
	$scope.user.choice = 'normal';

	//第二种实现方式
	//定义一组选择字体大小的数据
	$scope.fontData = [
		"小字体","大字体","正常"
	];
	$scope.fontStyle = [false,false,false];


	$scope.setFont = function(){
		var pop = $ionicPopup.show({
			title: '设置文字大小',
			templateUrl: 'template/font.html',
			scope: $scope,
			buttons: [{ 
			    text: '取消',
			    type: 'button-default',
			    onTap: function(e) {
			      //点击取消触发的事件
			      pop.close();
			    }
			  }, {
			    text: '确定',
			    type: 'button-positive',
			    onTap: function(e) {
			      //return $scope.data.response;
			     // console.log($scope.user.choice);
			     // 第一种实现方式
			      // switch($scope.user.choice){
			      // 	case 'small':
			      // 		$scope.isSmall = true;
			      // 		$scope.isBig = false;
			      // 		$scope.isNormal = false;
			      // 		break;

			      // 	case 'normal':
			      // 		$scope.isSmall = false;
			      // 		$scope.isBig = false;
			      // 		$scope.isNormal = true;
			     	// 	break;

			     	// case 'big':
			     	// 	$scope.isSmall = false;
			      // 		$scope.isBig = true;
			      // 		$scope.isNormal = false;
			     	// 	break;
			      // }


			      //第二种实现方式
			      console.log($scope.user.choice);  //获取到的是当前数据所在数组的索引

			      angular.forEach($scope.fontStyle,function(val,key){
			      	//val 是$scope.fontStyle里面的每一个值
			      	//key 是索引
			      	$scope.fontStyle[key] = false;
			      });
			    
			      $scope.fontStyle[$scope.user.choice] = true;


			    }
			  }]
		})
	}
}])