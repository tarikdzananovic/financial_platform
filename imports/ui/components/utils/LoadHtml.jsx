import React, { Component } from 'react'

export default class LoadHtml extends Component {

    componentDidMount(){
        this._process(this.props.url);
    }

    render() {
        return (
            <div ref="viewport" />
        );
    }

    _process(url) {
        $.get(url).then(function (res) {
            $(this.refs.viewport).html(res);
        }.bind(this))
    }
}
