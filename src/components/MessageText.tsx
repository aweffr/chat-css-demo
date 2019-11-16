import React from 'react';
import classNames from 'classnames';
import './MessageText.styl';

export const MessagePoi: { left: 'left', right: 'right' } = {
  left: 'left',
  right: 'right'
};

export type MessageTextProps = {
  msgId: string,
  avatar: string,
  name: string,
  poi: 'left' | 'right',
  content: string,
  showName?: boolean,
}

const MessageText = (props: MessageTextProps) => {
  const { poi, content, name, avatar, showName } = props;
  return (
    <div className={classNames('message-text', poi)}>
      <div className="person-info">
        {showName && <div className="name">{name}</div>}
        <img className="avatar" src={avatar} alt={avatar}/>
      </div>
      <p className={poi}>{content}</p>
    </div>
  );
};

export default MessageText;