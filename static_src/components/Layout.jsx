import MessageField from './MessageField'
import ChatList from './ChatList'
import Header from './Header'
import React from "react";
import PropTypes from "prop-types";
import '../styles/styles.css';

export default class Layout extends React.Component {
    static propTypes = {
        chatId: PropTypes.number.isRequired,
    };

    static defaultProps = {
        chatId: 1,
    };

    state = {
        chats: {
            1: {title: 'Чат 1', messageList: [1]},
            2: {title: 'Чат 2', messageList: [2]},
            3: {title: 'Чат 3', messageList: []},
        },
        messages: {
            1: { text: "Привет!", sender: 'bot' },
            2: { text: "Здравствуйте!", sender: 'bot' },
        },
        input: '',
    };

    componentDidUpdate(prevProps, prevState) {
        const { messages } = this.state;
        if (Object.keys(prevState.messages).length < Object.keys(messages).length &&
            Object.values(messages)[Object.values(messages).length - 1].sender === 'me') {
            setTimeout(() =>
                this.handleSendMessage('ama robot', 'bot'), 1000);
        }
    }

    handleSendMessage = (message, sender) => {
        const { messages, chats, input } = this.state;
        const { chatId } = this.props;

        if (input.length > 0 || sender === 'bot') {
            const messageId = Object.keys(messages).length + 1;
            this.setState({
                messages: {...messages,
                    [messageId]: {text: message, sender: sender}},
                chats: {...chats,
                    [chatId]: { ...chats[chatId],
                        messageList: [...chats[chatId]['messageList'], messageId]
                    }
                },
            })
        }
        if (sender === 'me') {
            this.setState({ input: '' })
        }
    };

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    };

    handleKeyUp = (event, message) => {
        if (event.keyCode === 13) { // Enter
            this.sendMessage(message)
        }
    };

    sendMessage = (message) => {
        this.setState({
            messages: [...this.state.messages, {text: message, sender: 'me'}],
        });
    };

    addChat = () => {
        const chatsLength = Object.keys(this.state.chats).length + 1;
        this.setState({
            chats: {...this.state.chats,
                [chatsLength]: {
                    title: `Чат ${chatsLength}`,
                    messageList: []
                }
            }
        });
    };

    render() {
        return <div>
            <div className="layout">
                <Header chatId={ this.props.chatId } />
                <div className="layout-canvas">
                    <div className="layout-left-side">
                        <ChatList
                            chats={ this.state.chats }
                            addChat={ this.addChat }
                        />
                    </div>
                    <div className="layout-right-side">
                        <MessageField
                            chatId={ this.props.chatId }
                            messages={this.state.messages}
                            chats={ this.state.chats }
                            input={ this.state.input }
                            handleSendMessage={ this.handleSendMessage }
                            handleChange={ this.handleChange }
                            handleKeyUp={ this.handleKeyUp }
                        />
                    </div>
                </div>
            </div>
        </div>
    }
}
