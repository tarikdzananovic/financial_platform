/**
 * Created by griga on 11/24/15.
 */

import Reflux from 'reflux'

/*let NavigationActions = Reflux.createActions({
    getItems: {asyncResult: true}
});

NavigationActions.getItems.listen( function() {
    console.log('listen to navigation actions');
   /!* $.getJSON('api/menu-items.json')
        .then( this.completed, this.failed )*!/
});*/

var NavigationActions = Reflux.createActions({
    'getItems' : {children : ['completed', 'failed']},
    'activate': {},
    'fromMap': {}
});

NavigationActions.getItems.listen(function () {
    //TODO:: call end point to get user biz cabinets
    var createNewBiz = {};
    createNewBiz._id = 0;
    createNewBiz.title = "New BIZ";
    createNewBiz.icon = "fa fa-lg fa-fw fa-plus-circle"
    createNewBiz.route = "/biz/new";

    var settings = {};
    settings._id = 1;
    settings.title = "Settings";
    settings.icon = "fa fa-lg fa-fw fa-gear";

    var settingsItems = [];
    var profile = {};
    profile.title = "My Profile";
    profile.icon = "fa fa-lg fa-fw fa-user"
    profile.route = "/profile";
    settingsItems.push(profile);
    settings.items = settingsItems;

    var items = [];
    items.push(createNewBiz);
    items.push(settings);

    NavigationActions.getItems.completed(items);
});


export default NavigationActions



