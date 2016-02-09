var $ = require('./../../../vendor/jquery/dist/jquery.min.js');

module.exports = {

    get: function(url){
        return new Promise(function(success, error){
            $.ajax({
                url: url,
                dataType: "json",
                success:success,
                error:error
            })
        });
    },

    post: function(url, data){
        return new Promise(function(success, error){
            $.ajax({
                url: url,
                type: "POST",
                success:success,
                data:data,
                error:error
            })
        });
    },

    put: function(url, data){
        return new Promise(function(success, error){
            $.ajax({
                url: url,
                type: "PUT",
                success:success,
                data:data,
                error:error
            })
        });
    },

    del: function(url){
        return new Promise(function(success, error){
            $.ajax({
                url: url,
                type: "DELETE",
                success:success,
                error:error
            })
        });
    },

    emit: function(key, data){
        socket.emit(key, data);
    }

};
