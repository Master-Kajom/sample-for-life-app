MPortal.home = function (params) {
    //"use strict";
    var db = openDatabase('mportalglico', '1.0', 'local database', 51200);

    var tileViewDataSource = [
        {
            id: 1,
            name: "GLICO END – OF – SERVICE BENEFITS (ESB)",
            desc: "The ESB is essentially an additional pension plan an individual takes in addition to his or her statutory pensions. It has investment and protection benefits put together to provide cash benefit at maturity or to a named beneficiary when death occurs before maturity.",
            ImageSrc: "images/gallery/coffee.png"
        },
        {
            id: 2,
            name: "GLICO FUNERAL POLICY (GFP)",
            desc: "The GFP is designed for individuals to pay out cash to attend to the funeral of family members. The monies paid by GLICO LIFE are to help family members defray funeral-related and final medical expenses of the insured in the event of his/her premature death.",
            ImageSrc: "images/gallery/coffee.png"
        }
    ];

    var window_height = $(window).height();
    var window_width = $(window).width();

    var is_synced = new DevExpress.data.LocalStore({
        name: "is_synced",
        key: "id"
    });

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
        //handle the tileview here
        dxtile_height: ko.observable(window_height * 0.6),
        tile_height: ko.observable(window_height*0.2),
        tile_width: ko.observable(window_width*0.4),
        tileViewDataSource: tileViewDataSource,
        itemTemplate: function (itemData, itemIndex, itemElement) {
            itemElement.append("<div class=\"price\">" + itemData.name +
                "</div><div class=\"image\" style=\"background-image: url('" + itemData.ImageSrc + "')\"></div>");
        },
        ///end of tileview

        client_name: ko.observable(MPortal.names()),
        user: ko.observable(''),
        mail: ko.observable(''),
        clientno: ko.observable(''),
        LoadPanelShown: ko.observable(false),
        viewShown: function () {

            if (params.item == "1" || params.item == 1) {
                var cache = MPortal.app.viewCache;
                cache.clear();
                //alert("here");
            }

            viewModel.user(MPortal.names());
            viewModel.clientno(MPortal.clientno());
            viewModel.mail(MPortal.webemail());

            MPortal.config.navigation[0].visible(true);
            MPortal.config.navigation[1].visible(true);
            MPortal.config.navigation[2].visible(true);
            MPortal.config.navigation[3].visible(true);
            MPortal.config.navigation[5].visible(true);
            //MPortal.config.navigation[4].visible(false);
            MPortal.config.navigation[6].visible(true);

            viewModel.check_synced();

            $("#stat_click").click(function () {
                viewModel.gotoStatements();
            });
            $("#pay_click").click(function () {
                viewModel.gotoPayment();
            });
            $("#buy_click").click(function () {
                viewModel.gotoBuy();
            });
            $("#claim_click").click(function () {
                viewModel.claim_request();
            });
            $("#about_click").click(function () {
                viewModel.about_glico();
            });
            $("#contact_click").click(function () {
                viewModel.contact_glico();
            });
        },

        today_date: ko.observable(new Date()),
        check_synced: function(){
            is_synced.byKey(1).done(function (values) {
                //check if value for synced is 1 if not sync
                if (values.synced == 1) {
                    //just load the parameters
                    viewModel.loadParameters();
                } else {
                    //sync
                    viewModel.getParameters();
                }
            }).fail(function (error) {
                // handle error
                console.log(error);
                is_synced.insert({
                    id: 1,
                    synced: 0,
                    synced_date: viewModel.today_date()
                }).done(function (values, key) {
                    console.log(values);
                    viewModel.getParameters();
                }).fail(function (error) {
                    console.log(error);
                });

            });
        },

        loadParameters: function(){
            //viewModel.LoadPanelShown(true);
            var loadpanel = $('#loadpanel').dxLoadPanel('instance');
            //initialize sync class
            var load_data = new Load_params({
                name: "loading parameters",
                loadpanel: loadpanel
            });
            load_data.load_all_parameters(db, loadpanel);
        },

        getParameters: function () {
            //TODO read from the localstore if empty then sync else do nothing
            viewModel.LoadPanelShown(true);
            var loadpanel = $('#loadpanel').dxLoadPanel('instance');
            //initialize sync class
            var sync_data = new Sync({
                name: "syncing batches",
                loadpanel: loadpanel
            });
            sync_data.sync_parameters(db, loadpanel, is_synced);
        },

        claim_request: function () {
            viewModel.navigateForward("request_claim_list", "");  
        },
        gotoStatements: function ()
        {
            viewModel.navigateForward("view_statement", "");
        },
        gotoPayment: function () {
            viewModel.navigateForward("make_a_payment", "");
        },
        gotoBuy: function () {
            viewModel.navigateForward("new_policy_list", "");
            /*MPortal.app.navigate({
                view: "dashboard",
                item: "",
                id: "3"
            });*/
        },
        about_glico: function () {
            viewModel.navigateForward("about", "");
        },
        contact_glico: function () {
            viewModel.navigateForward("contact_us", "");
        }


    };

    return viewModel;
};