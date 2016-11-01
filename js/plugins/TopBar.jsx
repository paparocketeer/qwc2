/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const {connect} = require('react-redux');
const {Glyphicon} = require('react-bootstrap');
const Message = require('../../MapStore2/web/client/components/I18N/Message');
const {AppMenu} = require("../components/AppMenu");
const {FullscreenSwitcher} = require("../components/FullscreenSwitcher");
const {Search} = require("../components/Search");
const {resultsPurge, resetSearch, searchTextChanged} = require("../../MapStore2/web/client/actions/search");
const {qwc2TextSearch} = require("../actions/search");
require('./style/TopBar.css');

const TopBar = React.createClass({
    propTypes: {
        mobile: React.PropTypes.bool,
        menuItems: React.PropTypes.array,
        fullscreen: React.PropTypes.bool
    },
    getDefaultProps() {
        return {
        }
    },
    render() {
        let buttonContents;
        let logo;
        if(this.props.mobile) {
            buttonContents = (
                <span className="appmenu-button">
                    <Glyphicon className="appmenu-icon" glyph="menu-hamburger"/>
                </span>
            );
            logo = "assets/img/logo-mobile.svg";
        } else {
            buttonContents = (
                <span className="appmenu-button">
                    <span className="appmenu-label"><Message msgId="appmenu.menulabel" /></span>
                    <Glyphicon className="appmenu-icon" glyph="menu-hamburger"/>
                </span>
            );
            logo = "assets/img/logo.svg";
        }

        return (
            <div id="TopBar" className={this.props.mobile ? "mobile" : ""}>
                <img className="logo" src={logo} />
                <Search />
                {this.props.mobile ? null : <FullscreenSwitcher />}
                <AppMenu menuItems={this.props.menuItems} buttonContents={buttonContents} />
            </div>
         );
     }
});

const selector = (state) => ({
    mobile: state.browser ? state.browser.mobile : false,
    fullscreen: state.display && state.display.fullscreen
});

module.exports = {
    TopBarPlugin: connect(selector, {})(TopBar),
    reducers: {
        display: require("../reducers/display"),
        search: require('../../MapStore2/web/client/reducers/search'),
    }
};
