import {List, ListItem} from 'material-ui';
import React from "react";

export default class ChatList extends React.Component {
    render() {
        return <div>
            <List>
                <ListItem>chat 1</ListItem>
                <ListItem>chat 2</ListItem>
                <ListItem>chat 3</ListItem>
                <ListItem>chat 4</ListItem>
            </List>
        </div>
    }
}