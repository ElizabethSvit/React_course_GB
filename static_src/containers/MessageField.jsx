import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import Message from '../components/Message';
import { sendMessage, loadMessages } from '../actions/messageActions';
import '../styles/messages.css';
import CircularProgress from 'material-ui/CircularProgress';
import { loadChats } from '../actions/chatActions';

class MessageField extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
        messages: PropTypes.object.isRequired,
        chats: PropTypes.object.isRequired,
        sendMessage: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,

    };

    state = {
        input: '',
    };

    handleSendMessage = (message, sender) => {
        const { chatId, messages } = this.props;

        const messageId = Object.keys(messages).length + 1;

        if (this.state.input.length > 0 || sender === 'bot') {
            this.props.sendMessage(messageId, message, sender, chatId);
        }
        if (sender === 'me') {
            this.setState({ input: '' });
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.handleSendMessage(this.state.input, 'me');
        }
    };

    componentDidMount() {
        this.props.loadChats();

        fetch('/api/messages.json'
        ).then(body => body.json()).
        then(json => {
            json.forEach(msg => {
                this.props.sendMessage(msg.id, msg.text, msg.sender, msg.chatId);
            })
        });
        this.props.loadMessages();
    }


    render() {
        const { chatId, messages, chats } = this.props;

        const messageElements = chats[chatId].messageList.map(messageId => (
            <Message
                key={ messageId }
                text={ messages[messageId].text }
                sender={ messages[messageId].sender }
            />));

        return [
            <div key='messageElements' className="message-field">
                { messageElements }
            </div>,
            <div key='textInput' style={ { width: '100%', display: 'flex' } }>
                <TextField
                    name="input"
                    fullWidth={ true }
                    hintText="Введите сообщение"
                    style={ { fontSize: '22px' } }
                    onChange={ this.handleChange }
                    value={ this.state.input }
                    onKeyUp={ this.handleKeyUp }
                />
                <FloatingActionButton
                    onClick={ () => this.handleSendMessage(this.state.input, 'me') }>
                    <SendIcon />
                </FloatingActionButton>
            </div>
        ]
    }
}

const mapStateToProps = ({ chatReducer, messageReducer }) => ({
    chats: chatReducer.chats,
    messages: messageReducer.messages,
    isLoading: messageReducer.isLoading,
});

const mapDispatchToProps = dispatch => bindActionCreators({ sendMessage, loadMessages, loadChats }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MessageField);