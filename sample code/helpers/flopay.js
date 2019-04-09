var Pay = (function (window, $Pay) {
    "use strict";

    if (window[$Pay] && !window.opera) return window[$Pay];


    var
        undefined,
        Remote_params = [],
        db2 = null,
        loadpanel = null,
        PayPrototype = Pay.prototype
        ;
        
    
    PayPrototype.pay_login = pay_login;
    PayPrototype.PayLogin = PayLogin;
    PayPrototype.pay_mobile = pay_mobile;
    PayPrototype.PayMobile = PayMobile;
    PayPrototype.setPay = setPay;

    function Pay(options) {

        if (!(this instanceof Pay))
            return new Pay(options);
        //TODO insert Payed data
        var self = this;
        loadpanel = options.loadpanel;
        console.log(options.name);
        return self;
    }

    function pay_login(loadpanel, tel, amnt, ref, year, month, payment_date, payment_type, payment_mode) {
        // get the system parameters from remote server and save in the localstorage/db.
        PayLogin().done(function (result) {
            //loadpanel.hide();
            if (result.error == undefined) {
                MPortal.token_bearer = result.access_token;
                console.log("access token is: " + MPortal.token_bearer);
                //TODO do an api accept payment via mobile money
                pay_mobile(loadpanel, MPortal.token_bearer, tel, amnt, ref, year, month, payment_date, payment_type, payment_mode);
            } else {
                DevExpress.ui.dialog.alert("Payment not available. Contact GLICO");
                console.log("token not available");
            }
        }).fail(function () {
            loadpanel.hide();
            DevExpress.ui.dialog.alert("Server not accessible. Check internet connectivity. Unable to Pay parameters.");
        });
    }

    function pay_mobile(loadpanel, token_bearer, tel, amnt, ref, year, month, payment_date, payment_type, payment_mode) {
        // get the system parameters from remote server and save in the localstorage/db.
        PayMobile(token_bearer, tel, amnt, ref).done(function (result) {
            if (result.success == true) {
                //DevExpress.ui.dialog.alert(result.response.message);
                console.log(result.response.message);
                //TODO insert the payment values to glico db
                var type = "payPayments?";
                //setPay(type, amount, year, month, payment_date, payment_type, payment_mode)
                setPay(type, amnt, year, month, payment_date, payment_type, payment_mode).done(function (result) {
                    loadpanel.hide();
                    if (result.status == true) {
                        console.log(result.Policies);
                        DevExpress.ui.dialog.alert(result.msg);
                        if (MPortal.is_logged == 1) {
                            MPortal.app.back();
                        } else {
                            //go to the main dashboard
                            MPortal.app.navigate('new_dashboard', { root: true });
                        }
                    } else {
                        DevExpress.ui.dialog.alert(result.msg);
                    }
                }).fail(function () {
                    loadpanel.hide();
                    DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity...");
                });
            } else {
                loadpanel.hide();
                //DevExpress.ui.dialog.alert("Transaction failed. Please try again");
                DevExpress.ui.dialog.alert("Policy Payment of year: " + year + " and month: " + month +" is already received");
            }
        }).fail(function () {
            loadpanel.hide();
            DevExpress.ui.dialog.alert("Server not accessible. Check internet connectivity. Unable to Pay parameters.");
        });
    }

    function PayMobile(token_bearer, tel, amnt, ref) {
        var url = MPortal.flopay_mobile;
        return $.ajax({
            method: "POST",
            url: url,
            headers: { "Authorization": "Bearer " + MPortal.token_bearer },
            data: {
                amount: amnt,
                currency: "Ghs",
                customer_no: tel,
                customer_name: MPortal.names,
                country_code: "GH",
                service_code: "cashout",
                live: false,
                reference: ref
            },
            timeout: 200000,
            //contentType: "application/json; charset=utf-8",
            //dataType: "json",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                DevExpress.ui.notify('User not allowed', error, 2000);
            }
        });
    }

    function PayLogin() {
        var url = MPortal.flopay_login;
        return $.ajax({
            method: "POST",
            url: url,
            data: JSON.stringify({
                client_id: MPortal.client_id,
                client_secret: MPortal.client_secret,
                grant_type: "client_credentials"
            }),
            timeout: 200000,
            contentType: "application/json; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                DevExpress.ui.notify('User not allowed', error, 2000);
            }
        });
    }

    function setPay(type, amount, year, month, payment_date, payment_type, payment_mode) {
        var url = MPortal.url + type;
        console.log(url);
        //agent_no,policy_no,client_no,amount,year,month,payment_date,market_code,payment_type,payment_mode
        return $.ajax({
            method: "POST",
            url: url,
            data: {
                agent_no: MPortal.agent_no(),
                policy_no: MPortal.PolicyNo(),
                client_no: MPortal.clientno(),
                amount: amount,
                year: year,
                month: month,
                payment_date: payment_date,
                market_code: MPortal.market_code(),
                payment_type: payment_type,
                payment_mode: payment_mode
            },
            timeout: 10000,
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                //DevExpress.ui.notify('User not allowed', error, 2000);
            }
        });

    };

    return Pay;

}(this, "Pay"));