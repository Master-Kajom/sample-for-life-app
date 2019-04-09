MPortal.view_statement = function (params) {
   // "use strict";

    getPolicy = function (type, client_no) {

        var url = MPortal.url + type + "client_no=" + client_no;
        console.log(url);
        return $.ajax({
            method: "GET",
            url: url,
            //data: {  },
            timeout: 100000,
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                DevExpress.ui.notify('An Error Occured', error, 2000);
            }
        });

    };

    getBenef = function (type, pol_no) {
        var url = MPortal.url + type + "policy_no=" + pol_no;
        console.log(url);
        return $.ajax({
            method: "GET",
            url: url,
            //data: {  },
            timeout: 100000,
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                DevExpress.ui.notify('An Error Occured', error, 2000);
            }
        });
    };

  
    var viewModel = {
        //  Put the binding properties here
        backButtonAction: function (e) {
            MPortal.app.back();
        },
        navigateForward: function (dxview, data) {

            MPortal.app.navigate({

                view: dxview,
                item: data,
                id: 1

            });

        },

        benef_store: ko.observableArray(),

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

        policyDetailsVisible: ko.observable(false),
        backButtonVisible: ko.observable(false),
        PopupRange: ko.observable(false),
        dateFilterDisable: ko.observable(false),
        policy_store: ko.observableArray([]),

        polNumber: ko.observable(''),
        polDesc: ko.observable(''),
        polfee: ko.observable(''),
        polSA: ko.observable(''),
        polModal: ko.observable(''),
        last_date: ko.observable(''),
        prem_units: ko.observable(''),

        LoadPanelShown: ko.observable(false),

        viewShown: function () {

            viewModel.LoadPanelShown(true);
            var type = "viewStatements?";
            getPolicy(type, MPortal.clientno()).done(function (result) {
                viewModel.LoadPanelShown(false);
                if (result.status == true) {
                    console.log(result.Policies);
                    viewModel.policy_store(result.Policies);
                } else {
                    DevExpress.ui.dialog.alert(result.msg);
                }
            }).fail(function () {
                viewModel.LoadPanelShown(false);
                DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity...");
            });

        },


        ///variables for timeline of statements///
        approve_fn: function (obj) {
            if (viewModel.select_all() == false) {
                if (obj.value == '' || obj.value == undefined) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return true;
            }
        },
        fromValidationRules: ko.observable({
            validationRules: [{
                type: "custom",
                message: "Date From cannot be empty",
                validationCallback: function (obj) {
                    return viewModel.approve_fn(obj);
                }
            }]
        }),
        toValidationRules: ko.observable({
            validationRules: [{
                type: "custom",
                message: "Date To cannot be empty",
                validationCallback: function (obj) {
                    return viewModel.approve_fn(obj);
                }
            }]
        }),
        vs_date: ko.observable(false),
        select_all: ko.observable(false),
        date_from: ko.observable(),
        date_to: ko.observable(),
        showStatement: function () {
            try {
                if (viewModel.select_all() == false && (viewModel.date_from() == undefined || viewModel.date_to() == undefined)) {

                } else {
                    viewModel.PopupRange(false);
                    var data = [{ select_all: viewModel.select_all(), date_from: viewModel.formatDate(new Date(viewModel.date_from())), date_to: viewModel.formatDate(new Date(viewModel.date_to())) }];
                    viewModel.navigateForward("PaymentsView", JSON.stringify(data));
                }
            } catch (err) {
                console.log(err);
            }
        },
        CancelStatement: function () {
            try {
                viewModel.PopupRange(false);
            }
            catch (err) {
                console.log(err);
            }

        },
        /////end of popup timeline statements//
        hidePolicyDetalis: function () {
            viewModel.policyDetailsVisible(false);
        },


        menu_items: ([{
            text: "Premium Summary Contribution",
            action: function (e) {
                try {
                    // alert(e.itemData.id)
                    MPortal.PolicyNo(e.itemData.policy_no);
                    viewModel.PopupRange(true);
                    //viewModel.navigateForward("PaymentsView", "");
                }
                catch (err) { }
            }
        }, {
            text: "Investment Summary Contribution",
            action: function (e) {
                try {
                    // alert(e.itemData.id)
                    if (e.itemData.investment_plan == 1 || e.itemData.investment_plan == "1") {
                        MPortal.PolicyNo(e.itemData.policy_no);
                        viewModel.navigateForward("inv_contributions", "");
                    } else {
                        DevExpress.ui.dialog.alert("Policy does not include investment contributions");
                    }
                    //viewModel.navigateForward("PaymentsView", "");
                }
                catch (err) { }
            }
        }, {
            text: "Policy Details",
            action: function (e) {

                viewModel.LoadPanelShown(true);
                var type = "getBeneficiaries?";
                getBenef(type, e.itemData.policy_no).done(function (result) {
                    viewModel.LoadPanelShown(false);
                    if (result.status == true) {
                        console.log(result.Benef);
                        viewModel.benef_store(result.Benef);

                        //TODO
                        viewModel.polNumber(e.itemData.policy_no);
                        viewModel.polDesc(e.itemData.description);
                        viewModel.polfee(e.itemData.policy_fee);
                        viewModel.polModal(e.itemData.modal_prem);
                        viewModel.polSA(e.itemData.sa);
                        viewModel.last_date(e.itemData.last_date);
                        viewModel.prem_units(e.itemData.prem_units);

                        viewModel.policyDetailsVisible(true);

                    } else {
                        DevExpress.ui.dialog.alert(result.msg);
                    }
                }).fail(function () {
                    viewModel.LoadPanelShown(false);
                    DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity...");
                });


            }
        }]),
        
    };

    return viewModel;
};