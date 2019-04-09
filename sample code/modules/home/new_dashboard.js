MPortal.new_dashboard = function (params) {
    //"use strict";
    $(document).ready(function () {
        if (params.id == "6" || params.id == 6 || (params.id == undefined && MPortal.is_logged == 0)) {
            MPortal.is_logged = 0;
        } else {
            MPortal.is_logged = 1;
        }
    });

    var tileViewDataSource = [
        {
            id: 1,
            name: "ABOUT GLICO HEALTHCARE",
            desc: "The ESB plan pays out cash benefits at your retirement from active service.",
            ImageSrc: "images/icons/esb.png"
        },
        {
            id: 2,
            name: "BENEFITS OF THE GLICOHEALTH PLANS",
            desc: "The GFP is designed for individuals to pay out cash to attend to the funeral of family members.",
            ImageSrc: "images/icons/funeral.png"
        },
        {
            id: 3,
            name: "EXCLUSIONS",
            desc: "The GEEP is essentially an investment plan with insurance benefits designed for individuals to accumulate cash for use in financing a child’s and/ or policyholder’s education.",
            ImageSrc: "images/icons/education.png"
        },
        {
            id: 4,
            name: "FAQ",
            desc: "The GCIP is a health policy which pays out a lump sum to the policyholder if he/she is diagnosed by a medical specialist doctor from a registered hospital as having critical/dread diseases.",
            ImageSrc: "images/icons/critical_illness.png"
        },
        {
            id: 5,
            name: "GLICO GROUP",
            desc: "The LGP guarantees to provide the a lump sum payment  on condition that all premiums from the inception of the policy have been fully paid.",
            ImageSrc: "images/icons/life_guaranteed.png"
        },
        {
            id: 6,
            name: "PRODUCTS & SERVICES",
            desc: "Guarantees a lump sum payment at the end of a policy period of 10 years, whether the life insured survives to complete payment of the premiums or not.",
            ImageSrc: "images/icons/savings.png"
        },
        {
            id: 7,
            name: "SIGN IN",
            desc: "The LGP guarantees to provide the a lump sum payment  on condition that all premiums from the inception of the policy have been fully paid.",
            ImageSrc: "images/icons/life_guaranteed.png"
        },
        {
            id: 8,
            name: "SIGN UP",
            desc: "Guarantees a lump sum payment at the end of a policy period of 10 years, whether the life insured survives to complete payment of the premiums or not.",
            ImageSrc: "images/icons/savings.png"
        }
    ];

    var window_height = $(window).height();
    var window_width = $(window).width();

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
                id: 1

            });

        },

        btn_init: function (e) {
            var element = e.component.element();
            setTimeout(function () {
                var content = element.find('.dx-button-text');
                content.css('white-space', 'initial');
            }, 250);
        },

        init_func: function () {
            if (MPortal.is_logged == 0) {
                viewModel.vs_dxtoolbar(true);
                viewModel.vs_sign_in(true);
                viewModel.vs_sign_up(true);
            } else if (MPortal.is_logged == 1) {
                viewModel.vs_dxtoolbar(false);
                viewModel.vs_sign_in(false);
                viewModel.vs_sign_up(false);

                MPortal.config.navigation[0].visible(true);
                MPortal.config.navigation[1].visible(true);
                MPortal.config.navigation[2].visible(true);
                MPortal.config.navigation[3].visible(true);
                //MPortal.config.navigation[4].visible(false);
            }
        },
        viewShown: function () {

            var cache = MPortal.app.viewCache;
            cache.clear();
            //$("#back_img").css({ "background-image": "url('images/logo_glico_dashboard_two.png')", "margin": "0 auto", "background-repeat": "no-repeat" });

            viewModel.init_func();

            $("#about_gl").click(function () {
                viewModel.navigateForward("about", "");
            });

            $("#benefits_gl").click(function () {
                //viewModel.navigateForward("reset_pass", "");
                DevExpress.ui.dialog.alert("Kindly Provide BENEFITS OF THE GLICOHEALTH PLANS data");
            });

            $("#exclusions_gl").click(function () {
                //viewModel.navigateForward("user_registration", "");
                DevExpress.ui.dialog.alert("Kindly Provide EXCLUSIONS data");
            });

            $("#faq").click(function () {
                viewModel.navigateForward("faq", "");
                //DevExpress.ui.dialog.alert("Kindly Provide FAQ data");
            });
            $("#contactus").click(function () {
                viewModel.navigateForward("contact_us", "");
            });

            $("#products_services").click(function () {
                viewModel.navigateForward("dashboard", "");
            });

            $("#signin").click(function () {
                viewModel.navigateForward("login", "");
                //MPortal.app.navigate('login', { root: true });
            });

            $("#signup").click(function () {
                viewModel.navigateForward("registration", "");
            });
        },

        /////dashboard buttons///
        homebtn: function () {
            viewModel.navigateForward("about", "");
        },
        prdbtn: function () {
            viewModel.navigateForward("dashboard", "");
        },
        contactbtn: function () {
            viewModel.navigateForward("contact_us", "");
        },
        faqbtn: function (){

        },
        signinbtn: function () {
            viewModel.navigateForward("login", "");
        },
        signupbtn: function () {
            viewModel.navigateForward("registration", "");
        },
        ////end of dashboard buttons///

        vs_sign_in: ko.observable(false),
        vs_sign_up: ko.observable(false),

        //handle the toolbar items here
        vs_dxtoolbar: ko.observable(false),
        toolbarItems: [
            {
                widget: 'dxButton',
                options: {
                    type: 'back',
                    text: 'Back',
                    onClick: function () {
                        MPortal.app.back();
                    },
                    visible: MPortal.is_logged
                },
                location: 'before'
            }
        ],
        ////////////end of toolbar

        //handle the tileview here
        get_dxtile_height: function () {
            var heights = window_height * 1;
            if (MPortal.is_logged == 0) {
                heights = window_height * 1;
            } else {
                heights = window_height * 1;
            }
            return heights;
        },
        dxtile_height: ko.observable(window_height * 0.76),
        dxtile_width: ko.observable(window_width),
        tile_height: ko.observable(window_height * 0.2),
        tile_width: ko.observable(window_width * 0.4),
        tileViewDataSource: tileViewDataSource,
        itemTemplate: function (itemData, itemIndex, itemElement) {
            itemElement.append("<div class=\"price\">" + itemData.name +
                "</div><div class=\"image\" style=\"background-image: url('" + itemData.ImageSrc + "')\"></div>");
        },
        onItemClick: function (e) {
            if (e.itemData.id == 1) {
                viewModel.navigateForward("policy_det", "1");
            } else if (e.itemData.id == 2) {
                viewModel.navigateForward("policy_det", "2");
            } else if (e.itemData.id == 3) {
                viewModel.navigateForward("policy_det", "3");
            } else if (e.itemData.id == 4) {
                viewModel.navigateForward("policy_det", "4");
            } else if (e.itemData.id == 5) {
                viewModel.navigateForward("policy_det", "5");
            } else if (e.itemData.id == 6) {
                viewModel.navigateForward("policy_det", "6");
            } else if (e.itemData.id == 7) {
                viewModel.navigateForward("policy_det", "7");
            }
        },
        ///end of tileview

        /////links/////
        dologin: function () {
            viewModel.navigateForward("login", "");
            //MPortal.app.navigate('login', { root: true });
        },
        dosignup: function () {
            viewModel.navigateForward("registration", "");
        },
        ///end links///

    };

    return viewModel;
};