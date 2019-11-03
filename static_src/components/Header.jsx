import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

export default class Header extends React.Component {
    static propTypes = {
        chatId: PropTypes.number,
    };

    static defaultProps = {
        chatId: 1,
    };

    render() {
        return (
            <div className="header">
                <span className="header-info">
                    <p>Чат { this.props.chatId }</p>
                    <p><Link to="/profile/">Профиль</Link></p>
                </span>
            </div>
        )
    }
}