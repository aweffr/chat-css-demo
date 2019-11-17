import React from 'react';
import * as heads from './assets/heads';
import './assets/normalize.css';
import './App.css';
import MessageBox from "./components/MessageBox";
import MessageText, { MessageTextProps } from "./components/MessageText";
import { randInt } from "./utils";

const msgs: MessageTextProps[] = [];
for (let i = 1; i <= 4; i++) {
  msgs.push({
    msgId: "" + i,
    poi: i % 2 === 0 ? 'left' : 'right',
    name: 'man',
    avatar: i % 2 === 1 ? heads.man1 : [heads.man2, heads.woman1, heads.woman2][randInt(0, 3)],
    content: '长河落日圆 铁锅炖自己 msg msg msg msg msg x' + i,
    showName: true,
  })
}
msgs.reverse();

class App extends React.Component<any, any> {

  state: any = {
    msgs: msgs
  };

  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  onSend(text: string) {
    this.setState({
      msgs: [
        {
          msgId: "" + (this.state.msgs.length + 1),
          poi: 'right',
          name: 'man',
          avatar: heads.man1,
          content: text,
          showName: true
        },
        ...this.state.msgs
      ],
    })
  }

  render() {
    return (
      <MessageBox
        messages={this.state.msgs}
        title='Title 1'
        subTitle=' Title 1.1'
        onSend={this.onSend}
      />
    );
  }

}

export default App;
