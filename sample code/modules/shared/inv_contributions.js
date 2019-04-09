MPortal.inv_contributions = function (params) {
    //"use strict";

    getPayMents = function (type, policy_no) {

        var url = MPortal.url + type + "policy_no=" + policy_no + "&n=2";

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
        //Put the binding properties here
        LoadPanelShown: ko.observable(false),
        payment_Store: ko.observableArray([]),
        lblpolicy_no: ko.observable('POLICY NO: ' + MPortal.PolicyNo()),
        viewShown: function () {
            viewModel.LoadPanelShown(true);
            var type = "policyPayments?";
            getPayMents(type, MPortal.PolicyNo()).done(function (result) {
                viewModel.LoadPanelShown(false);
                if (result.status == true) {
                    viewModel.payment_Store(result.Payments);
                } else {
                    DevExpress.ui.dialog.alert(result.msg);
                }
            }).fail(function () {
                viewModel.LoadPanelShown(false);
                DevExpress.ui.dialog.alert("Server not accessible.Check internet connectivity");
            });
        },
    };

    return viewModel;
};