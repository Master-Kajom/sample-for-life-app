MPortal.contact_us = function (params) {
   // "use strict";

    var viewModel = {
        backButtonVisible: ko.observable(false),
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
        toolbarItems: [
            {
                widget: 'dxButton',
                options: {
                    type: 'back',
                    text: 'Back',
                    onClick: function () {
                        MPortal.app.back();
                    }
                },
                location: 'before'
            }, {
                text: 'CONTACT GLICO',
                location: 'center'
            }
        ],
        //Put the binding properties here
        viewShown: function () {
            /*if (MPortal.is_logged == 0) {
                MPortal.config.navigation[8].visible(true);
            }*/
        },
        loadPanelVisible: ko.observable(false),
        finishLoading: function () {
            viewModel.loadPanelVisible(false);
            DevExpress.ui.dialog.alert("Thank you Contacting US. We value your feedback");
        },
        email: ko.observable(''),
        msg: ko.observable(''),
        emailValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Email is required"
            }]
        }),
        msgValidationRules: ko.observable({
            validationRules: [{
                type: "required",
                message: "Message is required"
            }]
        }),
        SendMail: function ()
        {
            if (viewModel.email() == '' || viewModel.msg() == '') {
                DevExpress.ui.dialog.alert("Please Validate First");
            } else {
                viewModel.loadPanelVisible(true);
                setTimeout($.proxy(viewModel.finishLoading, this), 3000);
            }
        }
    };

    return viewModel;
};