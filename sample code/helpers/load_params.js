//TODO load parameters from local database.
var Load_params = (function (window, $Load_params) {
    "use strict";

    if (window[$Load_params] && !window.opera) return window[$Load_params];


    var
        undefined,
        db2 = null,
        Load_paramsPrototype = Load_params.prototype
    ;

    Load_paramsPrototype.load_all_parameters = load_all_parameters;
    Load_paramsPrototype.errCallback = errCallback;
    Load_paramsPrototype.successCallback = successCallback;


    function Load_params(options) {
        //TODO insert Load_paramsed data
        var self = this;
        console.log(options.name);
        return self;
    }

    function errCallback() {
        this.loadpanel.hide();
        console.log("datamabase error!");
    }

    function successCallback(results) {
        console.log('db operation successfull.');
    }

    function load_all_parameters(db,loadpanel) {

        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS planinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Planinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM planinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        //delete all from planinfo..
                        console.log('planinfo found');
                        tx.executeSql(("SELECT * FROM planinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.planinfo = JSON.parse(results.rows.item(0).Planinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('planinfo not found');
                    MPortal.planinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of planinfo////////////
        ///////////////////riderinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS riderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Riderinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM riderinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        //delete all from planinfo..
                        console.log('riderinfo found');
                        tx.executeSql(("SELECT * FROM riderinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.riderinfo = JSON.parse(results.rows.item(0).Riderinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('riderinfo not found');
                    MPortal.riderinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of riderinfo////////////
        ///////////////////plan_rider_config/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS PlanRiderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,PlanRiderinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        //delete all from PlanRiderinfo..
                        console.log('PlanRiderinfo found');
                        tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.PlanRiderinfo = JSON.parse(results.rows.item(0).PlanRiderinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('PlanRiderinfo not found');
                    MPortal.PlanRiderinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of plan_rider_config////////////
        ///////////////////plan_rider_config/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS PlanRiderinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,PlanRiderinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        //delete all from PlanRiderinfo..
                        console.log('PlanRiderinfo found');
                        tx.executeSql(("SELECT * FROM PlanRiderinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.PlanRiderinfo = JSON.parse(results.rows.item(0).PlanRiderinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('PlanRiderinfo not found');
                    MPortal.PlanRiderinfo = [];
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
                        //delete all from Relationshipinfo..
                        console.log('Relationshipinfo found');
                        tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Relationshipinfo = JSON.parse(results.rows.item(0).Relationshipinfo);
                            //create a relationship_depandants array
                            MPortal.depantant_relationship = [];
                            for (var i = 0; i < MPortal.Relationshipinfo.length; i++) {

                                if (MPortal.Relationshipinfo[i].category == '' || MPortal.Relationshipinfo[i].category == 'null' || MPortal.Relationshipinfo[i].category == null) {

                                } else {
                                    //alert(MPortal.Relationshipinfo[i].category);
                                    MPortal.depantant_relationship.push(MPortal.Relationshipinfo[i]);
                                }
                            }


                        }, errCallback);
                    });
                } else {
                    console.log('Relationshipinfo not found');
                    MPortal.Relationshipinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Relationshipinfo////////////
        ///////////////////Relationshipinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Relationshipinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Relationshipinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        //delete all from Relationshipinfo..
                        console.log('Relationshipinfo found');
                        tx.executeSql(("SELECT * FROM Relationshipinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Relationshipinfo = JSON.parse(results.rows.item(0).Relationshipinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Relationshipinfo not found');
                    MPortal.Relationshipinfo = [];
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
                        console.log('Maritalinfo found');
                        tx.executeSql(("SELECT * FROM Maritalinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Maritalinfo = JSON.parse(results.rows.item(0).Maritalinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Maritalinfo not found');
                    MPortal.Maritalinfo = [];
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
                        console.log('Genderinfo found');
                        tx.executeSql(("SELECT * FROM Genderinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Genderinfo = JSON.parse(results.rows.item(0).Genderinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Genderinfo not found');
                    MPortal.Genderinfo = [];
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
                        console.log('Employerinfo found');
                        tx.executeSql(("SELECT * FROM Employerinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Employerinfo = JSON.parse(results.rows.item(0).Employerinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Employerinfo not found');
                    MPortal.Employerinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Employerinfo////////////
        ///////////////////LifeAgents/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LifeAgents (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,LifeAgents TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM LifeAgents WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('LifeAgents found');
                        tx.executeSql(("SELECT * FROM LifeAgents WHERE 1=?"), [1], function (tx, results) {
                            MPortal.LifeAgents = JSON.parse(results.rows.item(0).LifeAgents);
                        }, errCallback);
                    });
                } else {
                    console.log('LifeAgents not found');
                    MPortal.LifeAgents = [];
                }
            }, errCallback);
        });
        ////////////////end of LifeAgents////////////
        ///////////////////Paclassinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Paclassinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paclassinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Paclassinfo found');
                        tx.executeSql(("SELECT * FROM Paclassinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Paclassinfo = JSON.parse(results.rows.item(0).Paclassinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Paclassinfo not found');
                    MPortal.Paclassinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Paclassinfo////////////
        ///////////////////Occupationinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Occupationinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Occupationinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Occupationinfo found');
                        tx.executeSql(("SELECT * FROM Occupationinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Occupationinfo = JSON.parse(results.rows.item(0).Occupationinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Occupationinfo not found');
                    MPortal.Occupationinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Occupationinfo////////////
        ///////////////////Countryinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Countryinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Countryinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Countryinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Countryinfo found');
                        tx.executeSql(("SELECT * FROM Countryinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Countryinfo = JSON.parse(results.rows.item(0).Countryinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Countryinfo not found');
                    MPortal.Countryinfo = [];
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
                        console.log('Healthinfo found');
                        tx.executeSql(("SELECT * FROM Healthinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Healthinfo = JSON.parse(results.rows.item(0).Healthinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Healthinfo not found');
                    MPortal.Healthinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Healthinfo////////////
        ///////////////////Bankinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Bankinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Bankinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Bankinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Bankinfo found');
                        tx.executeSql(("SELECT * FROM Bankinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Bankinfo = JSON.parse(results.rows.item(0).Bankinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Bankinfo not found');
                    MPortal.Bankinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Bankinfo////////////
        ///////////////////Paysourcebr/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Paysourcebr (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paysourcebr TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Paysourcebr found');
                        tx.executeSql(("SELECT * FROM Paysourcebr WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Paysourcebr = JSON.parse(results.rows.item(0).Paysourcebr);
                        }, errCallback);
                    });
                } else {
                    console.log('Paysourcebr not found');
                    MPortal.Paysourcebr = [];
                }
            }, errCallback);
        });
        ////////////////end of Paysourcebr////////////
        ///////////////////Paymentinfo/////////////
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Paymentinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,Paymentinfo TEXT NOT NULL)');
            tx.executeSql(("SELECT * FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    db.transaction(function (tx) {
                        console.log('Paymentinfo found');
                        tx.executeSql(("SELECT * FROM Paymentinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Paymentinfo = JSON.parse(results.rows.item(0).Paymentinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Paymentinfo not found');
                    MPortal.Paymentinfo = [];
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
                        console.log('Paymentmode found');
                        tx.executeSql(("SELECT * FROM Paymentmode WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Paymentmode = JSON.parse(results.rows.item(0).Paymentmode);
                            console.log(MPortal.Paymentmode);
                        }, errCallback);
                    });
                } else {
                    console.log('Paymentmode not found');
                    MPortal.Paymentmode = [];
                }
            }, errCallback);
        });
        ////////////////end of Paymentmode////////////
        ///////////////////Paymentmode/////////////
        MPortal.Paymentmodeinfo = {};
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Paymentmodeinfo (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, plan_code TEXT, payment_mode TEXT, description TEXT, premyr TEXT, loadingfactor TEXT, coverperiod TEXT, singleprem BIT)');
            tx.executeSql(("SELECT * FROM Paymentmodeinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {
                    //console.log(results.rows[0]);
                    var obj_array = "";//is_synced //date_added
                    for (var i = 0; i < results.rows.length; i++) {
                        MPortal.Paymentmodeinfo["plan_code"] = results.rows.item(i).plan_code;
                        //console.log(MPortal.Paymentmodeinfo["plan_code"]);
                        MPortal.Paymentmodeinfo["payment_mode"] = results.rows.item(i).payment_mode;
                        MPortal.Paymentmodeinfo["description"] = results.rows.item(i).description;
                        MPortal.Paymentmodeinfo["premyr"] = results.rows.item(i).premyr;
                        MPortal.Paymentmodeinfo["loadingfactor"] = results.rows.item(i).loadingfactor;
                        MPortal.Paymentmodeinfo["coverperiod"] = results.rows.item(i).coverperiod;
                        MPortal.Paymentmodeinfo["singleprem"] = results.rows.item(i).singleprem;

                        //console.log(MPortal.Paymentmodeinfo);

                        if (i == 0) {
                            obj_array = JSON.stringify(MPortal.Paymentmodeinfo);
                        } else {
                            obj_array = obj_array + "," + JSON.stringify(MPortal.Paymentmodeinfo);
                        }
                    }
                    MPortal.Paymentmodeinfo = JSON.parse("[" + obj_array + "]");
                    //alert(obj_array);
                    //console.log(MPortal.Paymentmodeinfo[0].plan_code);

                } else {
                    console.log('Paymentmodeinfo not found');
                    MPortal.Paymentmodeinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Paymentmode////////////
        //id,table_code, plan_code, term, age, age2, rate, rate2, pay_period, rate4
        ///////////////////Paymentmode/////////////
        MPortal.Premrateinfo = {};
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Premrateinfo (id INTEGER NOT NULL PRIMARY KEY, table_code TEXT, plan_code TEXT, term TEXT, age TEXT, age2 TEXT, rate TEXT, rate2 TEXT, pay_period TEXT, rate4 TEXT )');
            tx.executeSql(("SELECT * FROM Premrateinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {

                    var obj_array = "";//is_synced //date_added
                    for (var i = 0; i < results.rows.length; i++) {

                        MPortal.Premrateinfo["id"] = results.rows.item(i).id;
                        MPortal.Premrateinfo["table_code"] = results.rows.item(i).table_code;
                        MPortal.Premrateinfo["plan_code"] = results.rows.item(i).plan_code;
                        MPortal.Premrateinfo["term"] = results.rows.item(i).term;
                        MPortal.Premrateinfo["age"] = results.rows.item(i).age;
                        MPortal.Premrateinfo["age2"] = results.rows.item(i).age2;
                        MPortal.Premrateinfo["rate"] = results.rows.item(i).rate;
                        MPortal.Premrateinfo["rate2"] = results.rows.item(i).rate2;
                        MPortal.Premrateinfo["pay_period"] = results.rows.item(i).pay_period;
                        MPortal.Premrateinfo["rate4"] = results.rows.item(i).rate4;


                        if (i == 0) {
                            obj_array = JSON.stringify(MPortal.Premrateinfo);
                        } else {
                            obj_array = obj_array + "," + JSON.stringify(MPortal.Premrateinfo);
                        }
                    }

                    MPortal.Premrateinfo = JSON.parse("[" + obj_array + "]");
                    console.log(MPortal.Paymentmodeinfo[0].plan_code);

                } else {
                    console.log('Premrateinfo not found');
                    MPortal.Premrateinfo = [];
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
                        console.log('Defaultsinfo found');
                        tx.executeSql(("SELECT * FROM Defaultsinfo WHERE 1=?"), [1], function (tx, results) {
                            MPortal.Defaultsinfo = JSON.parse(results.rows.item(0).Defaultsinfo);
                            console.log(MPortal.Defaultsinfo);
                        }, errCallback);
                    });
                } else {
                    console.log('Defaultsinfo not found');
                    MPortal.Defaultsinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Defaultsinfo////////////
        ///////////////////Riderpremuimrate/////////////
        MPortal.Riderpremuimrate = {};
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Riderpremuimrate (id INTEGER NOT NULL PRIMARY KEY, plan TEXT, rider_code TEXT, age TEXT, normal_rate TEXT, age2 TEXT, female_rate TEXT, term_from TEXT, term_to TEXT, isForMale TEXT, isForFemale TEXT, Pay_period TEXT, smoker_rate TEXT)');
            tx.executeSql(("SELECT * FROM Riderpremuimrate WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {

                    var obj_array = "";//is_synced //date_added
                    for (var i = 0; i < results.rows.length; i++) {
                        //plan, rider_code, age, normal_rate, age2, female_rate, 
                        //term_from, term_to, isForMale, isForFemale, Pay_period, smoker_rate

                        MPortal.Riderpremuimrate["plan"] = results.rows.item(i).plan;
                        MPortal.Riderpremuimrate["rider_code"] = results.rows.item(i).rider_code;
                        MPortal.Riderpremuimrate["age"] = results.rows.item(i).age;
                        MPortal.Riderpremuimrate["normal_rate"] = results.rows.item(i).normal_rate;
                        MPortal.Riderpremuimrate["age2"] = results.rows.item(i).age2;
                        MPortal.Riderpremuimrate["female_rate"] = results.rows.item(i).female_rate;
                        MPortal.Riderpremuimrate["term_from"] = results.rows.item(i).term_from;
                        MPortal.Riderpremuimrate["term_to"] = results.rows.item(i).term_to;
                        MPortal.Riderpremuimrate["isForMale"] = results.rows.item(i).isForMale;
                        MPortal.Riderpremuimrate["isForFemale"] = results.rows.item(i).isForFemale;
                        MPortal.Riderpremuimrate["Pay_period"] = results.rows.item(i).Pay_period;
                        MPortal.Riderpremuimrate["smoker_rate"] = results.rows.item(i).smoker_rate;


                        if (i == 0) {
                            obj_array = JSON.stringify(MPortal.Riderpremuimrate);
                        } else {
                            obj_array = obj_array + "," + JSON.stringify(MPortal.Riderpremuimrate);
                        }
                    }
                    //alert(obj_array);
                    MPortal.Riderpremuimrate = JSON.parse("[" + obj_array + "]");
                    //console.log(MPortal.Riderpremuimrate[0].plan_code);

                } else {
                    console.log('Riderpremuimrate not found');
                    MPortal.Riderpremuimrate = [];
                }
            }, errCallback);
        });
        ////////////////end of Riderpremuimrate////////////
        ///////////////////Funeralratesinfo/////////////
        MPortal.Funeralratesinfo = {};
        db.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS Funeralratesinfo (id INTEGER NOT NULL PRIMARY KEY, code TEXT, min_age TEXT, max_age TEXT, rate TEXT, rate2 TEXT, plan_code TEXT)');
            tx.executeSql(("SELECT * FROM Funeralratesinfo WHERE 1=?"), [1], function (tx, results) {
                if (results.rows.length > 0) {

                    var obj_array = "";//is_synced //date_added
                    for (var i = 0; i < results.rows.length; i++) {
                        //id, code, min_age, max_age, rate, rate2, plan_code

                        MPortal.Funeralratesinfo["id"] = results.rows.item(i).id;
                        MPortal.Funeralratesinfo["code"] = results.rows.item(i).code;
                        MPortal.Funeralratesinfo["min_age"] = results.rows.item(i).min_age;
                        MPortal.Funeralratesinfo["max_age"] = results.rows.item(i).max_age;
                        MPortal.Funeralratesinfo["rate"] = results.rows.item(i).rate;
                        MPortal.Funeralratesinfo["rate2"] = results.rows.item(i).rate2;
                        MPortal.Funeralratesinfo["plan_code"] = results.rows.item(i).plan_code;


                        if (i == 0) {
                            obj_array = JSON.stringify(MPortal.Funeralratesinfo);
                        } else {
                            obj_array = obj_array + "," + JSON.stringify(MPortal.Funeralratesinfo);
                        }
                    }
                    //alert(obj_array);
                    MPortal.Funeralratesinfo = JSON.parse("[" + obj_array + "]");
                    //console.log(MPortal.Riderpremuimrate[0].plan_code);

                } else {
                    console.log('Funeralratesinfo not found');
                    MPortal.Funeralratesinfo = [];
                }
            }, errCallback);
        });
        ////////////////end of Funeralratesinfo////////////

    }


    return Load_params;

}(this, "Load_params"));