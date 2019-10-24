import React from 'react';
import ReactDOM from 'react-dom';


let messages = [];
let currentMessage = "";

const MessageComponent = (props) => <div>{props.text}</div>;

const MessageField = (props) => {
    return props.messages.map(message => <MessageComponent text={message}/>);
};

const handleChange = (e) => {
    currentMessage = e.target.value;
};

const handleClick = () => {
    messages.push(currentMessage);
    console.log(currentMessage);

    ReactDOM.render(
        <Render/>,
        document.getElementById('root'),
    );
};

const Render = () => {
    return (
        <div>
            <div style={{display: 'flex'}}>Your message: &ensp;
                <input type="text" name="fname" onChange={handleChange}/>
                <input
                    type="button" value="Send" onClick={handleClick}
                />

            </div>
            <div>
                <h3>Message history:</h3>
                <MessageField messages={messages}/>
            </div>
        </div>
    );
};

ReactDOM.render(
    <Render/>,
    document.getElementById('root'),
);

