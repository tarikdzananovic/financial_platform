/**
 * Created by griga on 11/24/15.
 */

import Reflux from 'reflux'
import { Meteor } from 'meteor/meteor';

var NavigationActions = Reflux.createActions({
    'getItems' : {children : ['completed', 'failed']},
    'activate': {},
    'fromMap': {}
});

var getNewBizMenuItem = function (id) {
    var createNewBiz = {};
    createNewBiz._id = id;
    createNewBiz.title = "New BIZ";
    createNewBiz.icon = "fa fa-lg fa-fw fa-plus-circle";
    createNewBiz.route = "/biz/new";
    return createNewBiz;
};

var getBizsMenuItem = function (id) {
    var bizMenu = {};
    bizMenu._id = id;
    bizMenu.title = "My BIZs";
    bizMenu.icon = "fa fa-lg fa-fw fa-suitcase";
    bizMenu.items = [];
    return bizMenu;
};


var getBizMenuItem = function (biz, id) {
    var bizItem = {};
    bizItem._id = id;
    bizItem.title = biz.name;
    bizItem.icon = "fa fa-lg fa-fw fa-circle-o";
    bizItem.route = "/biz/"+biz._id;
    return bizItem;
};

var getOtherBizesMenuItem = function (id) {
    var otherBizes = {};
    otherBizes._id = id;
    otherBizes.title = "Other BIZs";
    otherBizes.icon = "fa fa-lg fa-fw fa-globe";
    otherBizes.route = "/biz/otherBizes";
    return otherBizes;
};

var getSettingsMenuItem = function (id) {
    var settings = {};
    settings._id = id;
    settings.title = "Settings";
    settings.icon = "fa fa-lg fa-fw fa-gear";

    var settingsItems = [];
    var profile = {};
    profile.title = "My Profile";
    profile.icon = "fa fa-lg fa-fw fa-user";
    profile.route = "/profile";
    settingsItems.push(profile);
    settings.items = settingsItems;
    return settings;
};

var getCtTest = function (id) {
    var createNewBiz = {};
    createNewBiz._id = id;
    createNewBiz.title = "Test Message";
    createNewBiz.icon = "fa fa-lg fa-fw fa-plus-circle";
    createNewBiz.route = "/biz/PDJK9tHQ4mfj8FBmb/contractTalkMsg";
    return createNewBiz;
};

NavigationActions.getItems.listen(function () {

    Meteor.call('bizes.getForUser', Meteor.userId(), function(error, response) {
        if (error) {
            Bert.alert(error.reason, 'danger');
        } else {
            var items = [];
            items.push(getNewBizMenuItem(items.length));
            var bizMenu = getBizsMenuItem(items.length);
            response.map((biz) => {
                bizMenu.items.push(getBizMenuItem(biz, items.length));
            });
            items.push(bizMenu);
            items.push(getOtherBizesMenuItem(items.length));
            items.push(getSettingsMenuItem(items.length));
            //items.push(getCtTest(items.length));

            NavigationActions.getItems.completed(items);     

            //console.log("Bizes: " + response);
            //esponse.map((biz) => {
                //console.log("Biz list: " + JSON.stringify(biz));
            //});
            //browserHistory.push(`/documents/${response.insertedId || biz._id}`);
        }
    });
});


export default NavigationActions



