var Api = (function (window, $Api) {
    //"use strict";

    if (window[$Api] && !window.opera) return window[$Api];

    var
        undefined,
        Remote_params = [],
        ApiPrototype = Api.prototype
        ;
        
    ApiPrototype.do_login = update_personal_det;


    function Api(options) {
        if (!(this instanceof Api))
            return new Api(options);
        //TODO insert Apied data
        var self = this;
        console.log(options.name);
        return self;
    }

    //do update personal details
    //client_number, mobile, address, email, telephone
    function update_personal_det(client_number, mobile, address, email, telephone) {
        var url = MPortal.url + "login";
        console.log(url);
        return $.ajax({
            method: "POST",
            url: url,
            data: {
                client_number: client_number,
                mobile: mobile,
                address: address,
                email: email,
                telephone: telephone
            },
            timeout: 10000,
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                //DevExpress.ui.notify('User not allowed', error, 2000);
            }
        });
    }
    
    return Api;

}(this, "Api"));