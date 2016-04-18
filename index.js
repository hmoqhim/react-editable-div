/** @jsx React.DOM */
"use strict";
var classnames = require('classnames');
//import ReactDom from 'react-dom';

if ("undefined" == typeof React)
    var React = require('react');
        //escapeTextForBrowser = require('react/lib/escapeTextForBrowser');

module.exports = React.createClass({
    displayName: "Editable",

    propTypes: {
        html: React.PropTypes.string
    },
    shouldComponentUpdate: function (nextProps) {
        return nextProps.editable !== this.props.editable;
    },
    componentDidUpdate: function () {
        if (this.props.html !== this.getDOMNode().innerHTML) {
            this.refs.editor.innerHTML = this.props.html;
        }
    },
    handleChange: function (e) {
        var html = this.refs.editor.innerHTML;
        if (this.props.onChange && html !== this.lastHtml) {
            e.target = {value: html};
            this.props.onChange(e);
        }
        this.lastHtml = html;
    },
    render: function () {
        return React.createElement('div', {
                onInput: this.handleChange,
                onBlur: this.handleChange,
                ref='editor',
                className={classnames(this.props.className)},
                contentEditable: undefined === this.props.editable ? true: this.props.editable,
                dangerouslySetInnerHTML: {__html: this.props.html}});
    }
});