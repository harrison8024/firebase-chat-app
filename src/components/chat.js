import React, {Component} from 'react';
import db from '../firebase';
import {connect} from 'react-redux';
import {updateChat, setRoom, clearChatData} from '../actions';
import MessageInput from './message_input';

class Chat extends Component {
    componentDidMount(){
        const {id} = this.props.match.params;
        if(!this.props.roomName){
            db.ref('/chat-rooms').orderByChild('chatId').equalTo(id).once('value', snapshot => {
                const rooms = snapshot.val();
                const {name} = rooms[Object.keys(rooms)[0]];
                this.props.setRoom(name);
            });
        }
        this.dbRef = db.ref(`/chat-logs/${id}`);

        this.dbRef.on('value', (snapshot) =>{
            this.props.updateChat(snapshot.val());
        });
    }

    componentWillUnmount(){
        this.dbRef.off();
        this.props.clearChatData();
    }

    render(){
        const {chatLog, roomName, match: {params}} = this.props;
        const chatElements = Object.keys(chatLog || {}).map((key,index)=>{
            const {name, message} = chatLog[key];
            return <li className="collection-item" key={key}><b>{name}: </b> {message}</li>
        })
        return (
            <div>
                <h1 className="center">{roomName || 'Chat Room'}</h1>
                <ul className="collection">
                    {chatElements}
                </ul>
                <MessageInput roomId={params.id}/>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        chatLog: state.chat.log,
        roomName: state.chat.name
    }
}

export default connect(mapStateToProps, {updateChat, setRoom, clearChatData})(Chat);