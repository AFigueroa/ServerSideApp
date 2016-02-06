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
    }
    
};