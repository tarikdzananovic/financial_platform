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
    console.log('TODO: call API to load navigation');
    var createNewBiz = {};
    createNewBiz._id = 0;
    createNewBiz.title = "New BIZ";
    createNewBiz.icon = "fa fa-lg fa-fw fa-plus-circle"
    createNewBiz.route = "/biz/new";

    var items = [];
    items.push(createNewBiz);

    NavigationActions.getItems.completed(items);
});


export default NavigationActions



