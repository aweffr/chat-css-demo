import React from 'react';
import classNames from 'classnames';
import './Message.css';

export const MessagePoi: { left: 0, right: 1 } = {
  left: 0,
  right: 1
};

export type MessageTextProps = {
  avatar: string,
  name: string,
  poi: 0 | 1,
  content: string,
}

const MessageText = (props: MessageTextProps) => {
  const { poi, content, name, avatar } = props;
  const poiClassName = (poi === MessagePoi.left) ? 'left' : 'right';
  return (
    <div className={classNames('message-text', poiClassName)}>
      <div className="person-info">
        <div className="name">{name}</div>
        <img className="avatar" src={avatar} alt={avatar}/>
      </div>
      <p className={poiClassName}>{content}</p>
    </div>
  );
};

export default MessageText;