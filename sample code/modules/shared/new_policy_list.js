MPortal.new_policy_list = function (params) {
    //"use strict";

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

    var viewModel = {
        //  Put the binding properties here
        backButtonVisible: ko.observable(false),
        backButtonAction: function (e) {
            MPortal.app.back();
        },
        navigateForward: function (dxview, data) {

            MPortal.app.navigate({

                view: dxview,
                item: data,
                id: 2

            });

        },

        LoadPanelShown: ko.observable(false),
        policy_Store: ko.observableArray(),


        viewShown: function () {
            

            viewModel.LoadPanelShown(true);
            var type = "getNewPolicy?";
            getPolicy(type, MPortal.clientno()).done(function (result) {
                viewModel.LoadPanelShown(false);
                if (result.status == true) {
                    console.log(result.Policies);
                    viewModel.policy_Store(result.Proposal);
                } else {
                    DevExpress.ui.dialog.alert(result.msg);
                }
            }).fail(function () {
                viewModel.LoadPanelShown(false);
                DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity...");
            });
        },

        pay_deposit: function (e) {
            MPortal.PolicyNo(e.itemData.mobile_id);
            viewModel.navigateForward("pay", e.itemData.modal_premium);
        },

        buy_policy: function () {
            MPortal.app.navigate({

                view: 'dashboard',
                item: '',
                id: 3

            });
        }

    };

    return viewModel;
};