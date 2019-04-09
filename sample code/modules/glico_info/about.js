MPortal.about = function (params) {
    "use strict";

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
                text: 'ABOUT GLICO',
                location: 'center'
            }
        ],
        //  Put the binding properties here
        logo: ko.observable(["images/logo_glico.png"]),
        viewShown: function () {
            /*if (MPortal.is_logged == 0) {
                MPortal.config.navigation[8].visible(true);
            }*/
        }
    };

    return viewModel;
};