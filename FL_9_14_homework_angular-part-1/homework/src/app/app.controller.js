const posts =  angular.module("posts", []);

posts.controller("postsController", function postsController($scope) {
    $scope.newPost = {};
    $scope.posts = wallPosts;
    $scope.newPostForm = false;

    $scope.addPost = function() {
      if ($scope.newPost !== null) {
        $scope.newPost.photo = `assets/img/Dobkin-Mikhail.png`;
        $scope.posts.push($scope.newPost);
        $scope.newPost = {};
      }
      $scope.showNewPostForm();
    };

    $scope.showNewPostForm = function() {
        $scope.newPostForm = !$scope.newPostForm;
    };

    // $scope.likeIt = function() {
        
    // }

});