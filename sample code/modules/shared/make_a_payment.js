MPortal.make_a_payment = function (params) {

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

    var options_arr = [{ id: 1, name: 'Make Payment' }, { id: 2, name: 'Details' }];

    var viewModel = {
        //  Put the binding properties here
        /*backButtonVisible: ko.observable(false),
        backButtonAction: function (e) {
            //alert("Back");
            MPortal.app.back();

        },*/
        navigateForward: function (dxview, data) {

            MPortal.app.navigate({

                view: dxview,
                item: data,
                id: 1

            });

        },

        benef_store: ko.observableArray(),

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
        last_date: ko.observable(),
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

        showStatement: function () {
            try {

                //viewModel.PopupRange(false);
                
                viewModel.navigateForward("PaymentsView", "");

            }
            catch (err)
            { }

        },

        CancelStatement: function () {
            try {
                viewModel.PopupRange(false);
            } catch (err) {

            }
        },
        hidePolicyDetalis: function () {
            viewModel.policyDetailsVisible(false);
        },

        menu_items: ([{
            text: "Make Payment",
            action: function (e) {
                try {
                    MPortal.PolicyNo(e.itemData.policy_no);
                    MPortal.agent_no(e.itemData.agent_no);
                    viewModel.navigateForward("pay", e.itemData.modal_prem);
                }catch (err){

                }
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
        /////handle pop up options here
        pop_options: ko.observable(false),
        options_store: ko.observableArray(options_arr),
        options_columns: [
            {
                allowEditing: false,
                dataField: 'id',
                visible: false
            }, {
                dataField: 'name',
                alignment: 'center',
                cellTemplate: function (container, options) {
                    $("<div />").appendTo(container).dxButton({
                        width: 150,
                        text: options.data.name,
                        type: 'success',
                        onClick: function (e) {
                            alert('clicked');
                        }
                    }).appendTo(container);
                }
            }
        ],
        options_click: function () {
            
        }
        //////end of pop up options


    };
    return viewModel;
};