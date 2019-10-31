import MessageField from './MessageField'
import ChatList from './ChatList'
import '../styles/styles.css';
import Header from './Header'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import React from "react";


export default class Layout extends React.Component {
    render() {
        return <div>
            <MuiThemeProvider>
                <Header />
                <div className="chat">
                    <div style={{flexGrow: '3'}}>
                        <ChatList />
                    </div>
                    <div style={{flexGrow: '7'}}>
                        <MessageField/>
                    </div>
                </div>
            </MuiThemeProvider>
        </div>
    }
}
