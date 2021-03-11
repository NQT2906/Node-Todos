var app = angular.module('app.works', ['xeditable']);

app.controller('todoController', function($scope, svWorks) {
    $scope.headers = ["To do", "Doing", "Done"];
    $scope.works = [];
    $scope.loading = true;

    svWorks.get().then(function(res) {
        $scope.works = res.data;
        $scope.loading = false;
    }, function(err) {
        if (err) throw err;
    });


    $scope.formData = {};
    $scope.createWork = function() {
        $scope.loading = true;
        var work = {
            text: $scope.formData.text,
            link: $scope.formData.string || '',
            status: 0
        };

        svWorks.create(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
            $scope.formData.text = '';
            $scope.formData.link = '';
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.updateWork = function(work) {
        $scope.loading = true;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };


    // Client gửi yêu cầu xóa một todo, svWorks.delete(todo) sẽ gọi đến api delete được định nghĩa trước đó
    $scope.deleteWork = function(work) {
        $scope.loading = true;
        svWorks.delete(work._id).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.next = function(work) {
        $scope.loading = true;
        work.status = work.status + 1;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.back = function(work) {
        $scope.loading = true;
        work.status = work.status - 1;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };

    $scope.getLenSection = function(num) {
        len = 0;
        angular.forEach($scope.works, function(work) {
            if (work.status == num) {
                len = len + 1;
            };
        })
        return len;
    };

    $scope.moveTo = function(work, num) {
        $scope.loading = true;
        work.status = num;
        svWorks.update(work).then(function(res) {
            $scope.works = res.data;
            $scope.loading = false;
        }, function(err) {
            if (err) throw err;
        });
    };
    

});