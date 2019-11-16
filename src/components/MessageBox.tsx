import React from 'react';
import MessageText, { MessageTextProps } from "./MessageText";
import './MessageBox.styl';

export type MessageBoxProps = {
  title: string,
  subTitle: string,
  messages: MessageTextProps[],
}

class MessageBox extends React.Component<MessageBoxProps> {
  render() {
    const { title, subTitle, messages } = this.props;
    return (
      <div className="message-box">
        <div className="header">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </div>

        <div className="message-list">
          {
            messages.map(msg => <MessageText {...msg} key={msg.msgId}/>)
          }
        </div>

        <div className="user-input-area">

        </div>
      </div>
    );
  }
}

export default MessageBox;