import React from 'react';
import * as heads from './assets/heads';
import './assets/normalize.css';
import './App.css';
import MessageBox from "./components/MessageBox";
import MessageText, { MessageTextProps } from "./components/MessageText";


const msgs: MessageTextProps[] = [];
for (let i = 1; i <= 40; i++) {
  msgs.push({
    msgId: "" + i,
    poi: i % 2 === 0 ? 'left' : 'right',
    name: 'man',
    avatar: heads.man1,
    content: '长河落日圆 铁锅炖自己 msg msg msg msg msg x' + i,
    showName: true,
  })
}
msgs.reverse();


const App: React.FC = () => {
  return (
    <MessageBox messages={msgs} title='Title 1' subTitle=' Title 1.1'/>
  );
};

export default App;
