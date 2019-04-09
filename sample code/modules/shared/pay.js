MPortal.pay = function (params) {
    //"use strict";
    var type_store = [{ id: 1, desc: 'Deposit' }, { id: 2, desc: 'Premium' }];

    var pay_store = [{ id: 1, desc: 'Mobile Money' }];

    var year = (new Date()).getFullYear();
    var month = (new Date()).getMonth() + 1;

    setPay = function (type) {
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
                amount: viewModel.amount(),
                year: viewModel.year(),
                month: viewModel.month(),
                payment_date: viewModel.formatDate(new Date(viewModel.payment_date())),
                market_code: MPortal.market_code(),
                payment_type: viewModel.payment_type(),
                payment_mode: viewModel.pay_method()
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

    var month_store = [{ name: 1 }, { name: 2 }, { name: 3 }, { name: 4 }, { name: 5 }, { name: 6 }, { name: 7 }, { name: 8 },
        { name: 9 }, { name: 10 }, { name: 11 }, { name: 12 }];
    var year_store = [];

    var current_year = (new Date()).getFullYear();
    var yrs_store = {};
    var get_yrs_store = function () {
        obj_array = "";
        var x = 5;
        var y = 0;
        for (var i = 0; i < 10; i++) {
            if (i < 5) {
                yrs_store["id"] = current_year - x;
                x--;
            } else if (i > 4) {
                yrs_store["id"] = current_year + y;
                y++;
            }
            if (i == 0) {
                obj_array = JSON.stringify(yrs_store);
            } else {
                obj_array = obj_array + "," + JSON.stringify(yrs_store);
            }

        }
        yrs_store = JSON.parse("[" + obj_array + "]");
        console.log(yrs_store);
        return yrs_store;
    }

    var viewModel = {
        //  Put the binding properties here
        vs_polno: ko.observable(false),
        vs_premium: ko.observable(false),
        year_store: ko.observableArray(get_yrs_store()),
        month_store: ko.observableArray(month_store),
        year_selected: ko.observable(current_year),
        type_store: ko.observableArray(type_store),
        pay_store: ko.observableArray(pay_store),
        policy_no: ko.observable(MPortal.PolicyNo()),
        year: ko.observable(year),
        month: ko.observable(month),
        pay_method: ko.observable(1),
        amount: ko.observable(params.item),
        payment_date: ko.observable(new Date()),
        payment_type: ko.observable(2),
        market: ko.observable(''),
        LoadPanelShown: ko.observable(false),
        formatDate: function (input) {
            if (input === undefined || input === '') {
                return "";
            } else {
                var yr = input.getFullYear();
                var temp_month = input.getMonth() + 1;
                var month = temp_month < 10 ? '0' + temp_month : temp_month;
                var temp_day = input.getDate();
                var day = temp_day < 10 ? '0' + temp_day : temp_day;
                var inputs = yr + '-' + month + '-' + day;
                //var inputs = day + '/' + month + '/' + yr;
                return inputs;
            }
        },
        viewShown: function () {
            if (params.id == "2") {
                viewModel.payment_type(1);
                viewModel.vs_polno(false);
                viewModel.vs_premium(false);
                viewModel.policy_no(MPortal.PolicyNo());
            } else {
                viewModel.vs_polno(true);
                viewModel.vs_premium(true);
            }
        },
        policynoValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Marital Status is required"
            }]
        }),
        amountValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Marital Status is required"
            }]
        }),
        paytypeValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Marital Status is required"
            }]
        }),
        /*mrktValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Marital Status is required"
            }]
        }),*/
        paymthdValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Payment Method is required"
            }]
        }),
        finishLoading: function () {
            viewModel.LoadPanelShown(false);
            MPortal.app.back();
            DevExpress.ui.dialog.alert("Payment successfully received");
        },
        /*viewModel.LoadPanelShown(true);
                setTimeout($.proxy(viewModel.finishLoading, this), 3000);*/
        save_fn: function () {
            if (viewModel.policy_no() == '' || viewModel.amount() == '' || viewModel.payment_type() == '') {
                //DevExpress.ui.dialog.alert("Please Validate first");
            } else {
                //save to the remote server
                //TODO do an api login first.
                viewModel.LoadPanelShown(true);
                var loadpanel = $('#loadpanel').dxLoadPanel('instance');
                //initialize sync class
                var api_login = new Pay({
                    name: "making payment"
                });
                /*var current_year = (new Date()).getFullYear();
                var temp_month = (new Date()).getMonth() + 1;*/
                var ref_no = MPortal.PolicyNo() + "-" + viewModel.year_selected() + "-" + viewModel.month();
                api_login.pay_login(loadpanel, MPortal.telephone(), viewModel.amount(), ref_no, viewModel.year_selected(), viewModel.month(),
                    viewModel.formatDate(new Date(viewModel.payment_date())), viewModel.payment_type(), viewModel.pay_method());
                

                //TODO save the payment details in the glico db
                
                /*viewModel.LoadPanelShown(true);
                var type = "payPayments?";
                setPay(type).done(function (result) {
                    viewModel.LoadPanelShown(false);
                    if (result.status == true) {
                        console.log(result.Policies);
                        DevExpress.ui.dialog.alert(result.msg);
                        MPortal.app.back();
                    } else {
                        DevExpress.ui.dialog.alert(result.msg);
                    }
                }).fail(function () {
                    viewModel.LoadPanelShown(false);
                    DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity...");
                });*/
            }
        }

    };

    return viewModel;
};