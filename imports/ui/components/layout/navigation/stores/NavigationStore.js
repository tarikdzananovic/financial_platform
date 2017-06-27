import Reflux from 'reflux'

import MenuItem from './MenuItem.js'

import History from '../classes/History.js'

import NavigationActions from './../actions/NavigationActions.js'

let data = {
    item: undefined,
    items: []
};



let NavigationStore = Reflux.createStore({

    load:false,

    listenables: NavigationActions,

    onGetItemsCompleted: function (items) {
        data.items = this.normalize(items);
        this.load = true;
        this._setInitialItem(data.items);
        this.trigger(data);
    },

    onActivate: function (item) {
        data.item = item;
        if(item.route)
            History.pushState(null, item.route)
        this.trigger({
            item: item
        })
    },

    initRawItems: function(rawItems){
        if(!rawItems){
            rawItems = [];
        }
        data.items = this.normalize(rawItems);
        this._setInitialItem(data.items)
    },
    _setInitialItem: function(items){
        items.forEach(function(item){
            if (item.isActive){
                data.item = item
            }
            if(item.items){
                this._setInitialItem(item.items)
            }
        }.bind(this))

    },
    normalize: function (items) {
        return _.map(items, function (item) {
            return new MenuItem(item)
        })
    },
    getData: function () {
        return data
    }

});


export default NavigationStore