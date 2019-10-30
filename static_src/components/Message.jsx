import React from 'react';
import PropTypes from 'prop-types';

export default class Message extends React.Component {
    static propTypes = {
        text: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
    };

    render() {
        return <div><p>{this.props.author}: {this.props.text}</p></div>
    }
}
