import {List, ListItem} from 'material-ui/List';
import {Link} from 'react-router-dom';
import ContentSend from 'material-ui/svg-icons/content/send';
import React from "react";
import PropTypes from "prop-types";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default class ChatList extends React.Component {
    static propTypes = {
        chats: PropTypes.object,
    };

    render() {
        const chats = this.props.chats;

        const chatLinks = Object.keys(chats).map((chatId, index) => (
            <Link
                key={index}
                to={`/chat/${chatId}/`}
                style={{textDecoration: "none"}}>
                <ListItem
                    primaryText={chats[chatId].title}
                    leftIcon={<ContentSend/>}/>
            </Link>
        ));

        return (<div>
                <List>
                    {chatLinks}
                </List>
                <Fab style={{backgroundColor: "lightblue", marginLeft: "10px"}} aria-label="add">
                    <AddIcon onClick={ () => this.props.addChat() }/>
                </Fab>
            </div>
        )
    }
}