import React from 'react';
import * as heads from './assets/heads';
import './assets/normalize.css';
import './App.css';
import MessageText, { MessageTextProps } from "./components/MessageText";


const msgs: MessageTextProps[] = [];
for (let i = 0; i < 20; i++) {
  msgs.push({
    poi: i % 2 as 0 | 1,
    name: 'man',
    avatar: heads.man1,
    content: '长河落日圆 msg msg msg msg msg x' + i,
  })
}


const App: React.FC = () => {
  return (
    <div className="App">
      {
        msgs.map((msg, idx) => <MessageText {...msg} key={idx}/>)
      }
    </div>
  );
};

export default App;
