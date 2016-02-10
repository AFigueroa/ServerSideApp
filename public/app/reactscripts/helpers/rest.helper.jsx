var $ = require('./../../../vendor/jquery/dist/jquery.min.js');

/* The helper allows us to call on ajax calls
    without having to re-write ajax syntax */
module.exports = {

    // READ (get)
    get: function (url) {
        'use strict';
        return new Promise(function (success, error) {
            $.ajax({
                url: url,
                dataType: "json",
                success: success,
                error: error
            });
        });
    },

    // CREATE (post)
    post: function (url, data) {
        'use strict';
        return new Promise(function (success, error) {
            $.ajax({
                url: url,
                type: "POST",
                success: success,
                data: data,
                error: error
            });
        });
    },

    // UPDATE (put)
    put: function (url, data) {
        'use strict';
        return new Promise(function (success, error) {
            $.ajax({
                url: url,
                type: "PUT",
                success: success,
                data: data,
                error: error
            });
        });
    },

    // DELETE
    del: function (url) {
        'use strict';
        return new Promise(function (success, error) {
            $.ajax({
                url: url,
                type: "DELETE",
                success: success,
                error: error
            });
        });
    },

    // Emit helper for SOCKET.IO
    emit: function (key, data) {
        'use strict';
        socket.emit(key, data);
    }

};
