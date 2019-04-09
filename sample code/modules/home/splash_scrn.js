MPortal.splash_scrn = function (params) {
    //"use strict";
    var db = openDatabase('mportalglico', '1.0', 'local database', 51200);
    //var myVideo = document.getElementById('dbx').innerHTML; //$("#video1");
    var is_synced = new DevExpress.data.LocalStore({
        name: "is_synced",
        key: "id"
    });

    var viewModel = {
        //Put the binding properties here
        backButtonVisible: ko.observable(false),
        backButtonAction: function (e) {
            MPortal.app.back();
        },
        LoadPanelShown: ko.observable(false),
        navigateForward: function (dxview, data) {
            MPortal.app.navigate({

                view: dxview,
                item: data,
                id: 1

            });
        },
        today_date: ko.observable(new Date()),
        loadParameters: function () {
            //viewModel.LoadPanelShown(true);
            var loadpanel = $('#loadpanel').dxLoadPanel('instance');
            //initialize sync class
            var load_data = new Load_params({
                name: "loading parameters",
                loadpanel: loadpanel
            });
            load_data.load_all_parameters(db, loadpanel);
        },
        getParameters: function (synced) {
            //TODO read from the localstore if empty then sync else do nothing
            viewModel.LoadPanelShown(true);
            var loadpanel = $('#loadpanel').dxLoadPanel('instance');
            var btnskipp = $('#btnskipp').dxButton('instance');
            //initialize sync class
            var sync_data = new Sync({
                name: "syncing batches",
                loadpanel: loadpanel
            });
            sync_data.sync_parameters(db, loadpanel, is_synced, synced, $("#dbx")[0], btnskipp);
        },
        check_synced: function () {
            is_synced.byKey(1).done(function (values) {
                //check if value for synced is 1 if not sync
                if (values.synced == 1 || values.synced == "1") {
                    //just load the parameters
                    viewModel.vs_next(false);
                    viewModel.show_video();
                    viewModel.loadParameters();
                } else {
                    //sync
                    viewModel.getParameters(0);
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
                    viewModel.getParameters(0);
                }).fail(function (error) {
                    console.log(error);
                });
            });
        },

        vs_next: ko.observable(true),

        viewShown: function () {
            //kwa load params pass the video component as well.
            //TODO
            //1. check if params are sync
            //2. if synced play video
            //3. else, sync then play video.
            //4. if not online, set interval to repeat the process when someone comes online
            viewModel.check_synced();
        },

        show_video: function () {
            if ($("#dbx")[0] == undefined) {
                //do nothing
            } else {
                $("#dbx")[0].play();
                setTimeout(function () {
                    viewModel.next_scrn();
                }, 61000);
            }
        },
        next_scrn: function () {
            if ($("#dbx")[0] == undefined) {
                //do nothing
            } else {
                $("#dbx")[0].pause();
                MPortal.is_playing_vid = 0;
                MPortal.app.navigate('new_dashboard', { root: true });
            }
        }

    };

    return viewModel;
};