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

NavigationActions.getItems.listen(function () {
    //TODO:: call end point to get user biz cabinets

    Meteor.call('bizes.get', function(error, response) {
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
            items.push(getSettingsMenuItem(items.length));

            NavigationActions.getItems.completed(items);     

            //console.log("Bizes: " + response);
            //response.map((biz) => {
                //console.log("Biz list: " + JSON.stringify(biz));
            //});
            //browserHistory.push(`/documents/${response.insertedId || biz._id}`);
        }
    });
});


export default NavigationActions



