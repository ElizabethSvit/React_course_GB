import React from 'react';
import Message from './Message';


class FullMessage {
    constructor(author, text) {
        this.messageText = text;
        this.messageAuthor = author;
    }
}

export default class MessageField extends React.Component {
    state = {
        messages: [new FullMessage("Пользователь", "Привет!"), new FullMessage("Пользователь", "Как дела?")],
    };

    handleClick = () => {
        this.setState({messages: [...this.state.messages, new FullMessage("Пользователь", "Нормально")]});
        this.state.author = "Робот";
    };

    componentDidUpdate() {
        if (this.state.author === "Робот") {
            setTimeout(() =>
                this.setState(
                    {messages: [...this.state.messages, new FullMessage("Робот", "Не приставай ко мне, я робот!")]}), 1000);
            this.state.author = "Пользователь";
        }
    }

    render() {
        const messageElements = this.state.messages.map((message, index) => (
            <Message key={index} text={message.messageText} author={message.messageAuthor}/>));

        return <div>
            {messageElements}
            <button onClick={this.handleClick}>Отправить сообщение</button>
        </div>
    }
}
