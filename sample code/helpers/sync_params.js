var Sync = (function (window, $Sync) {
    //"use strict";

    if (window[$Sync] && !window.opera) return window[$Sync];


    var
        undefined,
        Remote_params = [],
        db2 = null,
        loadpanel = null,
        SyncPrototype = Sync.prototype
    ;

    SyncPrototype.test = test;
    SyncPrototype.syncParams = syncParams;
    SyncPrototype.sync_parameters = sync_parameters;
    SyncPrototype.errCallback = errCallback;
    SyncPrototype.successCallback = successCallback;

    function Sync(options) {

        if (!(this instanceof Sync))
            return new Sync(options);
        //TODO insert synced data
        var self = this;
        loadpanel = options.loadpanel;
        console.log(options.name);
        return self;
    }

    function test_callback(x, y) {
        alert(x + y);
        return x + y;
    }

    function test(x, y, test_callback) {
        x = 'this ';
        y = 'and that';
        if (typeof test_callback === "function") {
            test_callback(x, y);
        }
    }

    function errCallback() {
        ///this.loadpanel.hide();
        console.log("datamabase error!");
    }

    function successCallback(results) {
        console.log('db operation successfull.');
    }

    function sync_parameters(db, loadpanel, is_synced, synced_is, video_component, btnskipp) {
        // get the system parameters from remote server and save in the localstorage/db.
        syncParams().done(function (result) {

            //DevExpress.ui.dialog.alert("Parameters Successfully Synced.");
            //insert into local database.   //planinfo, rider_info, plan_rider_config, relationship, maritalinfo
            //Planinfo,Riderinfo,PlanRiderinfo,Relationshipinfo,Maritalinfo,Genderinfo, Employerinfo

            ///////////////////planinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS planinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Planinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM planinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from planinfo..
                            console.log('planinfo found');
                            tx.executeSql(("DELETE FROM planinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO planinfo (Planinfo) VALUES (?);"), [JSON.stringify(result.Planinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM planinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.planinfo = JSON.parse(results.rows.item(0).Planinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('planinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO planinfo (Planinfo) VALUES (?);"), [JSON.stringify(result.Planinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM planinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.planinfo = JSON.parse(results.rows.item(0).Planinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of planinfo////////////
            ///////////////////Riderinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS riderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Riderinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM riderinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('riderinfo found');
                            tx.executeSql(("DELETE FROM riderinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO riderinfo (Riderinfo) VALUES (?);"), [JSON.stringify(result.Riderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM riderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.riderinfo = JSON.parse(results.rows.item(0).Riderinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('riderinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO riderinfo (Riderinfo) VALUES (?);"), [JSON.stringify(result.Riderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM riderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.riderinfo = JSON.parse(results.rows.item(0).Riderinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Riderinfo////////////
            ///////////////////plan_rider_config/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS PlanRiderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,PlanRiderinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('PlanRiderinfo found');
                            tx.executeSql(("DELETE FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO PlanRiderinfo (PlanRiderinfo) VALUES (?);"), [JSON.stringify(result.PlanRiderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.PlanRiderinfo = JSON.parse(results.rows.item(0).PlanRiderinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('PlanRiderinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO PlanRiderinfo (PlanRiderinfo) VALUES (?);"), [JSON.stringify(result.PlanRiderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.PlanRiderinfo = JSON.parse(results.rows.item(0).PlanRiderinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of plan_rider_config////////////
            ///////////////////Relationshipinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Relationshipinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Relationshipinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Relationshipinfo found');
                            tx.executeSql(("DELETE FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Relationshipinfo (Relationshipinfo) VALUES (?);"), [JSON.stringify(result.Relationshipinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Relationshipinfo = JSON.parse(results.rows.item(0).Relationshipinfo);
                                //create a relationship_depandants array
                                MPortal.depantant_relationship = [];
                                for (var i = 0; i < MPortal.Relationshipinfo.length; i++) {
                                    if (MPortal.Relationshipinfo[i].category == '' || MPortal.Relationshipinfo[i].category == 'null' || MPortal.Relationshipinfo[i].category == null) {

                                    } else {
                                        MPortal.depantant_relationship.push(MPortal.Relationshipinfo[i]);
                                    }
                                }
                            }, errCallback);
                        });
                    } else {
                        console.log('Relationshipinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Relationshipinfo (Relationshipinfo) VALUES (?);"), [JSON.stringify(result.Relationshipinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Relationshipinfo = JSON.parse(results.rows.item(0).Relationshipinfo);
                                //create a relationship_depandants array
                                MPortal.depantant_relationship = [];
                                for (var i = 0; i < MPortal.Relationshipinfo.length; i++) {
                                    if (MPortal.Relationshipinfo[i].category == '' || MPortal.Relationshipinfo[i].category == 'null' || MPortal.Relationshipinfo[i].category == null) {

                                    } else {
                                        MPortal.depantant_relationship.push(MPortal.Relationshipinfo[i]);
                                    }
                                }
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Relationshipinfo////////////
            ///////////////////Maritalinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Maritalinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Maritalinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Maritalinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Maritalinfo found');
                            tx.executeSql(("DELETE FROM Maritalinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Maritalinfo (Maritalinfo) VALUES (?);"), [JSON.stringify(result.Maritalinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Maritalinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Maritalinfo = JSON.parse(results.rows.item(0).Maritalinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('Maritalinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Maritalinfo (Maritalinfo) VALUES (?);"), [JSON.stringify(result.Maritalinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Maritalinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Maritalinfo = JSON.parse(results.rows.item(0).Maritalinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Maritalinfo////////////
            ///////////////////Genderinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Genderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Genderinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Genderinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Genderinfo found');
                            tx.executeSql(("DELETE FROM Genderinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Genderinfo (Genderinfo) VALUES (?);"), [JSON.stringify(result.Genderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Genderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Genderinfo = JSON.parse(results.rows.item(0).Genderinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('Genderinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Genderinfo (Genderinfo) VALUES (?);"), [JSON.stringify(result.Genderinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Genderinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Genderinfo = JSON.parse(results.rows.item(0).Genderinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Genderinfo////////////
            ///////////////////Employerinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Employerinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Employerinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Employerinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Employerinfo found');
                            tx.executeSql(("DELETE FROM Employerinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Employerinfo (Employerinfo) VALUES (?);"), [JSON.stringify(result.Employerinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Employerinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Employerinfo = JSON.parse(results.rows.item(0).Employerinfo);
                            }, errCallback);
                        });
                    } else {
                        console.log('Employerinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Employerinfo (Employerinfo) VALUES (?);"), [JSON.stringify(result.Employerinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Employerinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Employerinfo = JSON.parse(results.rows.item(0).Employerinfo);
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Employerinfo////////////
            ///////////////////paclass/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Paclassinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paclassinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Paclassinfo found');
                            tx.executeSql(("DELETE FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Paclassinfo (Paclassinfo) VALUES (?);"), [JSON.stringify(result.Paclassinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paclassinfo = JSON.parse(results.rows.item(0).Paclassinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Paclassinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Paclassinfo (Paclassinfo) VALUES (?);"), [JSON.stringify(result.Paclassinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paclassinfo = JSON.parse(results.rows.item(0).Paclassinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of paclass////////////
            ///////////////////occupationinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Occupationinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Occupationinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Occupationinfo found');
                            tx.executeSql(("DELETE FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Occupationinfo (Occupationinfo) VALUES (?);"), [JSON.stringify(result.Occupationinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Occupationinfo = JSON.parse(results.rows.item(0).Occupationinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Occupationinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Occupationinfo (Occupationinfo) VALUES (?);"), [JSON.stringify(result.Occupationinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Occupationinfo = JSON.parse(results.rows.item(0).Occupationinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of occupationinfo////////////
            ///////////////////Countryinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Countryinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Countryinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Countryinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Countryinfo found');
                            tx.executeSql(("DELETE FROM Countryinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Countryinfo (Countryinfo) VALUES (?);"), [JSON.stringify(result.Countryinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Countryinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Countryinfo = JSON.parse(results.rows.item(0).Countryinfo);
                                //
                            }, errCallback);
                        });
                    } else {
                        console.log('Countryinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Countryinfo (Countryinfo) VALUES (?);"), [JSON.stringify(result.Countryinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Countryinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Countryinfo = JSON.parse(results.rows.item(0).Countryinfo);
                                //
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Countryinfo////////////
            ///////////////////Healthinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Healthinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Healthinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Healthinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Healthinfo found');
                            tx.executeSql(("DELETE FROM Healthinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Healthinfo (Healthinfo) VALUES (?);"), [JSON.stringify(result.Healthinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Healthinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Healthinfo = JSON.parse(results.rows.item(0).Healthinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Healthinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Healthinfo (Healthinfo) VALUES (?);"), [JSON.stringify(result.Healthinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Healthinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Healthinfo = JSON.parse(results.rows.item(0).Healthinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Healthinfo////////////
            ///////////////////LifeAgents/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS LifeAgents (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,LifeAgents TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM LifeAgents WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from LifeAgents..
                            console.log('LifeAgents found');
                            tx.executeSql(("DELETE FROM LifeAgents WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO LifeAgents (LifeAgents) VALUES (?);"), [JSON.stringify(result.LifeAgents)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM LifeAgents WHERE 1=?"), [1], function (tx, results) {
                                MPortal.LifeAgents = JSON.parse(results.rows.item(0).LifeAgents);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('LifeAgents not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO LifeAgents (LifeAgents) VALUES (?);"), [JSON.stringify(result.LifeAgents)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM LifeAgents WHERE 1=?"), [1], function (tx, results) {
                                MPortal.LifeAgents = JSON.parse(results.rows.item(0).LifeAgents);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of LifeAgents////////////

            ///////////////////Bankinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Bankinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Bankinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Bankinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Bankinfo found');
                            tx.executeSql(("DELETE FROM Bankinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Bankinfo (Bankinfo) VALUES (?);"), [JSON.stringify(result.Bankinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Bankinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Bankinfo = JSON.parse(results.rows.item(0).Bankinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Bankinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Bankinfo (Bankinfo) VALUES (?);"), [JSON.stringify(result.Bankinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Bankinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Bankinfo = JSON.parse(results.rows.item(0).Bankinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Bankinfo////////////
            ///////////////////Paymentinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Paymentinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paymentinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Paymentinfo found');
                            tx.executeSql(("DELETE FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Paymentinfo (Paymentinfo) VALUES (?);"), [JSON.stringify(result.Paymentinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paymentinfo = JSON.parse(results.rows.item(0).Paymentinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Paymentinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Paymentinfo (Paymentinfo) VALUES (?);"), [JSON.stringify(result.Paymentinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paymentinfo = JSON.parse(results.rows.item(0).Paymentinfo);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Paymentinfo////////////
            ///////////////////Paymentmode/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Paymentmode (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paymentmode TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Paymentmode WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Paymentmode found');
                            tx.executeSql(("DELETE FROM Paymentmode WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Paymentmode (Paymentmode) VALUES (?);"), [JSON.stringify(result.Paymentmode)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paymentmode WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paymentmode = JSON.parse(results.rows.item(0).Paymentmode);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Paymentmode not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Paymentmode (Paymentmode) VALUES (?);"), [JSON.stringify(result.Paymentmode)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paymentmode WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paymentmode = JSON.parse(results.rows.item(0).Paymentmode);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Paymentmode////////////
            ///////////////////Paysourcebr/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Paysourcebr (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paysourcebr TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Paysourcebr found');
                            tx.executeSql(("DELETE FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Paysourcebr (Paysourcebr) VALUES (?);"), [JSON.stringify(result.Paysourcebr)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paysourcebr = JSON.parse(results.rows.item(0).Paysourcebr);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Paysourcebr not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Paysourcebr (Paysourcebr) VALUES (?);"), [JSON.stringify(result.Paysourcebr)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Paysourcebr = JSON.parse(results.rows.item(0).Paysourcebr);
                                //
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Paysourcebr////////////
            ///////////////////Paymentmodeinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Paymentmodeinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plan_code TEXT, payment_mode TEXT, description TEXT, premyr TEXT, loadingfactor TEXT, coverperiod TEXT, singleprem BIT )');
                tx.executeSql(("SELECT * FROM Paymentmodeinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {

                            MPortal.Paymentmodeinfo = result.Paymentmodeinfo;
                            console.log('Paymentmodeinfo found');
                            tx.executeSql(("DELETE FROM Paymentmodeinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            for (var i = 0; i < MPortal.Paymentmodeinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Paymentmodeinfo (plan_code, payment_mode, description, premyr, loadingfactor, coverperiod, singleprem) VALUES (?,?,?,?,?,?,?);"), [MPortal.Paymentmodeinfo[i].plan, MPortal.Paymentmodeinfo[i].payment_mode, MPortal.Paymentmodeinfo[i].description, MPortal.Paymentmodeinfo[i].premyr, MPortal.Paymentmodeinfo[i].loadingfactor, MPortal.Paymentmodeinfo[i].coverperiod, MPortal.Paymentmodeinfo[i].singleprem], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Paymentmodeinfo));
                        });
                    } else {
                        console.log('Paymentmodeinfo not found');
                        db.transaction(function (tx) {

                            MPortal.Paymentmodeinfo = result.Paymentmodeinfo;
                            for (var i = 0; i < MPortal.Paymentmodeinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Paymentmodeinfo (plan_code, payment_mode, description, premyr, loadingfactor, coverperiod, singleprem) VALUES (?,?,?,?,?,?,?);"), [MPortal.Paymentmodeinfo[i].plan, MPortal.Paymentmodeinfo[i].payment_mode, MPortal.Paymentmodeinfo[i].description, MPortal.Paymentmodeinfo[i].premyr, MPortal.Paymentmodeinfo[i].loadingfactor, MPortal.Paymentmodeinfo[i].coverperiod, MPortal.Paymentmodeinfo[i].singleprem], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Paymentmodeinfo));
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Paymentmodeinfo////////////
            ///////////////////Premrateinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Premrateinfo (id INTEGER NOT NULL PRIMARY KEY, table_code TEXT, plan_code TEXT, term TEXT, age TEXT, age2 TEXT, rate TEXT, rate2 TEXT, pay_period TEXT, rate4 TEXT )');
                tx.executeSql(("SELECT * FROM Premrateinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {

                            MPortal.Premrateinfo = result.Premrateinfo;
                            console.log('Premrateinfo found');
                            tx.executeSql(("DELETE FROM Premrateinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            for (var i = 0; i < MPortal.Premrateinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Premrateinfo (id,table_code, plan_code, term, age, age2, rate, rate2, pay_period, rate4) VALUES (?,?,?,?,?,?,?,?,?,?);"), [MPortal.Premrateinfo[i].id, MPortal.Premrateinfo[i].table_code, MPortal.Premrateinfo[i].plan_code, MPortal.Premrateinfo[i].term, MPortal.Premrateinfo[i].age, MPortal.Premrateinfo[i].age2, MPortal.Premrateinfo[i].rate, MPortal.Premrateinfo[i].rate2, MPortal.Premrateinfo[i].pay_period, MPortal.Premrateinfo[i].rate4], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Paymentmodeinfo));
                        });
                    } else {
                        console.log('Premrateinfo not found');
                        db.transaction(function (tx) {

                            MPortal.Premrateinfo = result.Premrateinfo;
                            for (var i = 0; i < MPortal.Premrateinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Premrateinfo (id,table_code, plan_code, term, age, age2, rate, rate2, pay_period, rate4) VALUES (?,?,?,?,?,?,?,?,?,?);"), [MPortal.Premrateinfo[i].id, MPortal.Premrateinfo[i].table_code, MPortal.Premrateinfo[i].plan_code, MPortal.Premrateinfo[i].term, MPortal.Premrateinfo[i].age, MPortal.Premrateinfo[i].age2, MPortal.Premrateinfo[i].rate, MPortal.Premrateinfo[i].rate2, MPortal.Premrateinfo[i].pay_period, MPortal.Premrateinfo[i].rate4], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Premrateinfo));
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Premrateinfo////////////
            ///////////////////Defaultsinfo/////////////
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Defaultsinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Defaultsinfo TEXT NOT NULL)');
                tx.executeSql(("SELECT * FROM Defaultsinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {
                            //delete all from riderinfo..
                            console.log('Defaultsinfo found');
                            tx.executeSql(("DELETE FROM Defaultsinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("INSERT INTO Defaultsinfo (Defaultsinfo) VALUES (?);"), [JSON.stringify(result.Defaultsinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Defaultsinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Defaultsinfo = JSON.parse(results.rows.item(0).Defaultsinfo);
                                
                                if (loadpanel == undefined) {

                                } else {
                                    loadpanel.hide();
                                }
                                //var cache = MPortal.app.viewCache;
                                //cache.clear();
                                //cache.removeView("proposal_form");
                                is_synced.update(1, {
                                    synced: 1
                                }).done(function (key, result) {
                                    console.log("is synced: " + result.synced);
                                    if (synced_is == 0 || synced_is == "0") {
                                        btnskipp.option("disabled", false);
                                        MPortal.is_playing_vid = 1;
                                        play_video(video_component);
                                    }
                                }).fail(function (error) {
                                    console.log(error);
                                });

                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");
                            }, errCallback);
                        });
                    } else {
                        console.log('Defaultsinfo not found');
                        db.transaction(function (tx) {
                            tx.executeSql(("INSERT INTO Defaultsinfo (Defaultsinfo) VALUES (?);"), [JSON.stringify(result.Defaultsinfo)], function (tx, results) { successCallback(results); }, errCallback);
                            tx.executeSql(("SELECT * FROM Defaultsinfo WHERE 1=?"), [1], function (tx, results) {
                                MPortal.Defaultsinfo = JSON.parse(results.rows.item(0).Defaultsinfo);
                                //var cache = MPortal.app.viewCache;
                                //cache.clear();
                                if (loadpanel == undefined) {

                                } else {
                                    loadpanel.hide();
                                }
                                
                                is_synced.update(1, {
                                    synced: 1
                                }).done(function (key, result) {
                                    console.log("is synced: " + result.synced);
                                    if (synced_is == 0 || synced_is == "0") {
                                        btnskipp.option("disabled", false);
                                        MPortal.is_playing_vid = 1;
                                        play_video(video_component);
                                    }
                                }).fail(function (error) {
                                    console.log(error);
                                });
                                //DevExpress.ui.dialog.alert("Parameters successfully synchronised.");

                            }, errCallback);
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Defaultsinfo////////////
            ///////////////////Riderpremuimrate/////////////
            //plan, rider_code, age, normal_rate, age2, female_rate, term_from, term_to, isForMale, isForFemale, Pay_period, smoker_rate
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Riderpremuimrate (id INTEGER NOT NULL PRIMARY KEY, plan TEXT, rider_code TEXT, age TEXT, normal_rate TEXT, age2 TEXT, female_rate TEXT, term_from TEXT, term_to TEXT, isForMale TEXT, isForFemale TEXT, Pay_period TEXT, smoker_rate TEXT)');
                tx.executeSql(("SELECT * FROM Riderpremuimrate WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {

                            MPortal.Riderpremuimrate = result.Riderpremuimrate;
                            console.log('Riderpremuimrate found');
                            tx.executeSql(("DELETE FROM Riderpremuimrate WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            for (var i = 0; i < MPortal.Riderpremuimrate.length; i++) {
                                tx.executeSql(("INSERT INTO Riderpremuimrate (plan, rider_code, age, normal_rate, age2, female_rate, term_from, term_to, isForMale, isForFemale, Pay_period, smoker_rate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"), [MPortal.Riderpremuimrate[i].plan, MPortal.Riderpremuimrate[i].rider_code, MPortal.Riderpremuimrate[i].age, MPortal.Riderpremuimrate[i].normal_rate, MPortal.Riderpremuimrate[i].age2, MPortal.Riderpremuimrate[i].female_rate, MPortal.Riderpremuimrate[i].term_from, MPortal.Riderpremuimrate[i].term_to, MPortal.Riderpremuimrate[i].isForMale, MPortal.Riderpremuimrate[i].isForFemale, MPortal.Riderpremuimrate[i].Pay_period, MPortal.Riderpremuimrate[i].smoker_rate], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Paymentmodeinfo));
                        });
                    } else {
                        console.log('Riderpremuimrate not found');
                        db.transaction(function (tx) {

                            MPortal.Riderpremuimrate = result.Riderpremuimrate;
                            for (var i = 0; i < MPortal.Riderpremuimrate.length; i++) {
                                tx.executeSql(("INSERT INTO Riderpremuimrate (plan, rider_code, age, normal_rate, age2, female_rate, term_from, term_to, isForMale, isForFemale, Pay_period, smoker_rate) VALUES (?,?,?,?,?,?,?,?,?,?,?,?);"), [MPortal.Riderpremuimrate[i].plan, MPortal.Riderpremuimrate[i].rider_code, MPortal.Riderpremuimrate[i].age, MPortal.Riderpremuimrate[i].normal_rate, MPortal.Riderpremuimrate[i].age2, MPortal.Riderpremuimrate[i].female_rate, MPortal.Riderpremuimrate[i].term_from, MPortal.Riderpremuimrate[i].term_to, MPortal.Riderpremuimrate[i].isForMale, MPortal.Riderpremuimrate[i].isForFemale, MPortal.Riderpremuimrate[i].Pay_period, MPortal.Riderpremuimrate[i].smoker_rate], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Premrateinfo));
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Premrateinfo////////////
            ///////////////////Funeralratesinfo/////////////
            //id, code, min_age, max_age, rate, rate2, plan_code
            db.transaction(function (tx) {
                tx.executeSql('CREATE TABLE IF NOT EXISTS Funeralratesinfo (id INTEGER NOT NULL PRIMARY KEY, code TEXT, min_age TEXT, max_age TEXT, rate TEXT, rate2 TEXT, plan_code TEXT, sumAssured TEXT)');
                tx.executeSql(("SELECT * FROM Funeralratesinfo WHERE 1=?"), [1], function (tx, results) {
                    if (results.rows.length > 0) {
                        db.transaction(function (tx) {

                            MPortal.Funeralratesinfo = result.Funeralratesinfo;
                            console.log('Funeralratesinfo found');
                            tx.executeSql(("DELETE FROM Funeralratesinfo WHERE 1=?"), [1], function (tx, results) { successCallback(results); }, errCallback);
                            for (var i = 0; i < MPortal.Funeralratesinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Funeralratesinfo (code, min_age, max_age, rate, rate2, plan_code, sumAssured) VALUES (?,?,?,?,?,?,?);"), [MPortal.Funeralratesinfo[i].code, MPortal.Funeralratesinfo[i].min_age, MPortal.Funeralratesinfo[i].max_age, MPortal.Funeralratesinfo[i].rate, MPortal.Funeralratesinfo[i].rate2, MPortal.Funeralratesinfo[i].plan_code, MPortal.Funeralratesinfo[i].sumAssured], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Paymentmodeinfo));
                        });
                    } else {
                        console.log('Funeralratesinfo not found');
                        db.transaction(function (tx) {

                            MPortal.Funeralratesinfo = result.Funeralratesinfo;
                            for (var i = 0; i < MPortal.Funeralratesinfo.length; i++) {
                                tx.executeSql(("INSERT INTO Funeralratesinfo (code, min_age, max_age, rate, rate2, plan_code, sumAssured) VALUES (?,?,?,?,?,?,?);"), [MPortal.Funeralratesinfo[i].code, MPortal.Funeralratesinfo[i].min_age, MPortal.Funeralratesinfo[i].max_age, MPortal.Funeralratesinfo[i].rate, MPortal.Funeralratesinfo[i].rate2, MPortal.Funeralratesinfo[i].plan_code, MPortal.Funeralratesinfo[i].sumAssured], function (tx, results) { successCallback(results); }, errCallback);
                            }
                            //console.log(JSON.stringify(MPortal.Premrateinfo));
                        });
                    }
                }, errCallback);
            });
            ////////////////end of Premrateinfo////////////

        }).fail(function () {
            if (loadpanel == undefined) {

            } else {
                loadpanel.hide();
            }
            //DevExpress.ui.dialog.alert("Server not accessible. Check internet connectivity. Connect to the internet.");
            DevExpress.ui.notify("Server not accessible. Check internet connectivity. Connect to the internet.", "", 5000);
            //todo handle recursion here.
            setTimeout(function () {
                loadpanel.show();
                sync_parameters(db, loadpanel, is_synced, synced_is, video_component, btnskipp);
            }, 5000);
        });

    }

    function play_video(video_component) {
        if (video_component == undefined) {
            //do nothing
        } else {
            video_component.play();
            setTimeout(function () {
                next_scrn(video_component);
            }, 61000);
        }
    }

    function next_scrn(video_component) {
        if (video_component == undefined) {
            //do nothing
        } else {
            video_component.pause();
            if (MPortal.is_playing_vid == 1) {
                MPortal.app.navigate('new_dashboard', { root: true });
            }
        }
    }

    function syncParams() {
        var url = MPortal.url + "policyParams?";
        return $.ajax({
            method: "GET",
            url: url,
            timeout: 300000,
            async: true,
            dataType: "json",
            contentType: "application/x-www-form-urlencoded; charset=utf-8",
            error: function (xhr, status, error) { // flow always comes in error callback even url returns true and this is the issue.
                //DevExpress.ui.notify('User not allowed', error, 2000);
            }
        });
    }

    return Sync;

}(this, "Sync"));