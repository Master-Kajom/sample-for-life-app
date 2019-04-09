MPortal.new_sig = function (params) {
    //"use strict";

    


    var viewModel = {
        //  Put the binding properties here
        vs_sig_popup: ko.observable(false),
        show_sig: function () {
            viewModel.vs_sig_popup(true);
            var sig_show = new Sig({
                name: "displaying signature"
            });
            sig_show.Sig_main("signaturepad", "[data-action=clear]", "[data-action=change-color]", "[data-action=undo]", "[data-action=save-png]", "[data-action=save-jpg]", "[data-action=save-svg]", "canvas");

        },
        viewShown: function () {
            
            /*$(function () {

                
                
            });*/
        },


    };

    return viewModel;
};