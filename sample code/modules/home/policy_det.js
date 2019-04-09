MPortal.policy_det = function (params) {
    //"use strict";

    var pol_det = new Policy_det({
        name: "get policy details"
    });
    
    var window_height = $(window).height();
    var window_width = $(window).width();

    var viewModel = {
        //  Put the binding properties here
        //title: ko.observable('jjj'),
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
            }
        ],
        scroll_height: ko.observable(window_height * 0.76),
        btn_buy: ko.observable(window_height * 0.03 ),
        head_title: ko.observable(''),
        display_details: function (item) {
            //$('#background_img').empty();
            if (item == "1") {
                //var img_path = ;
                //$("#background_img").css({ "background-image": "url('images/gallery/esb.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('END – OF – SERVICE BENEFITS');
                $('#esb').empty();
                $('#esb').append(pol_det.get_esb());
            } else if (item == "2") {
                //$("#background_img").css({ "background-image": "url('images/gallery/funeral_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('GLICO FUNERAL POLICY (GFP)');
                $('#gfp').empty();
                $('#gfp').append(pol_det.get_gfp());
            } else if (item == "3") {
                //$("#background_img").css({ "background-image": "url('images/gallery/endowment_ed_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('GLICO ENDOWMENT EDUCATION PLAN (GEEP)');
                $('#geep').empty();
                $('#geep').append(pol_det.get_geep());
            } else if (item == "4") {
                //$("#background_img").css({ "background-image": "url('images/gallery/gritical_illness_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('GLICO CRITICAL ILLNESS PLAN (GCIP)');
                $('#gcip').empty();
                $('#gcip').append(pol_det.get_gcip());
            } else if (item == "5") {
                //$("#background_img").css({ "background-image": "url('images/gallery/life_guaranteed_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('GLICO LIFE GUARANTEED PLAN (LGP)');
                $('#lgp').empty();
                $('#lgp').append(pol_det.get_lgp());
            } else if (item == "6") {
                //$("#background_img").css({ "background-image": "url('images/gallery/savings_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('GLICO LIFE SAVINGS PLAN');
                $('#saving').empty();
                $('#saving').append(pol_det.get_saving());
            } else if (item == "7") {
                //$("#background_img").css({ "background-image": "url('images/gallery/travel_plan.png')", "opacity": "0.9", "background-repeat": "no-repeat" });
                viewModel.head_title('END – OF – SERVICE BENEFITS');
                $('#travel').empty();
                $('#travel').append(pol_det.get_travel());
            }
        },
        viewShown: function () {
            //DevExpress.ui.dialog.alert(params.item);
            viewModel.display_details(params.item);

        },
        isToastVisible: ko.observable(false),
        check_logged_in: function (e) {
            /*if (MPortal.is_logged == 0) {
                //direct to login page
                viewModel.navigateForward("login", params.item);
                viewModel.isToastVisible(true);
            } else {
                //proceed to buy a policy page
                viewModel.navigateForward("buy_a_policy", params.item);
            }*/
            viewModel.navigateForward("buy_a_policy", params.item);
        },
        buy_policy: function () {
            //TODO
            //1. check if user is logged in, if not direct to login page
            viewModel.check_logged_in();
            //2. once logged in direct to buy_a_policy
        }

    };

    return viewModel;
};