import React from 'react';
import MessageText, { MessageTextProps } from "./MessageText";
import classNames from 'classnames';
import './MessageBox.styl';
import produce from "immer";

export type MessageBoxProps = {
  title: string,
  subTitle: string,
  messages: MessageTextProps[],
  onSend: (text: string) => void,
}

type ScrollStatus = 'top' | 'middle' | 'bottom';

interface IState {
  scrollStatus: ScrollStatus | null,
  listHeight: number,
  childHeight: number,
  pasteImages: { url: string, file: File }[],
}


class MessageBox extends React.Component<MessageBoxProps, IState> {

  msgListRef = React.createRef<HTMLDivElement>();

  state: IState = {
    pasteImages: [],
    scrollStatus: null,
    listHeight: 0,
    childHeight: 0,
  };

  constructor(props: MessageBoxProps) {
    super(props);
    this.calcMsgListStyle = this.calcMsgListStyle.bind(this);
    this.onMessageListScroll = this.onMessageListScroll.bind(this);
    this.onPaste = this.onPaste.bind(this);
  }

  calcMsgListStyle() {
    const dom = this.msgListRef.current;
    let listHeight = dom?.offsetHeight || 0;

    let childHeight = 0;
    dom && dom.childNodes.forEach(node => {
      childHeight += (node as HTMLDivElement)?.offsetHeight || 0;
    });
    this.setState({
      listHeight, childHeight
    })
  }

  componentDidMount(): void {
    this.calcMsgListStyle();
    window.addEventListener('resize', this.calcMsgListStyle);
  }

  componentWillUnmount(): void {
    window.removeEventListener('resize', this.calcMsgListStyle);
  }

  componentDidUpdate(prevProps: MessageBoxProps, prevState: IState) {
    if (prevProps.messages !== this.props.messages) {
      this.calcMsgListStyle();
    }

    if (prevProps.messages[0]?.msgId !== this.props.messages[0]?.msgId) {
      if (this.state.scrollStatus === 'bottom' || this.props.messages[0].poi === 'right') {
        this.scrollToBottom();
      }
    }
  }

  scrollToBottom() {
    this.msgListRef.current && this.msgListRef.current.scroll(0, 10000);
  }

  onMessageListScroll(e: React.UIEvent<HTMLDivElement>) {
    const target = e.nativeEvent.target as HTMLDivElement;
    if (!target) {
      return;
    }
    const { scrollTop, offsetHeight, scrollHeight } = target;

    let newScrollStatus: ScrollStatus;
    if (scrollTop === 0) {
      newScrollStatus = 'top';
    } else if ((scrollTop + offsetHeight) === scrollHeight) {
      newScrollStatus = 'bottom';
    } else {
      newScrollStatus = 'middle';
    }

    if (this.state.scrollStatus !== newScrollStatus) {
      this.setState({ scrollStatus: newScrollStatus });
    }
  }

  get msgListAlignTop(): boolean {
    const { listHeight, childHeight } = this.state;
    return listHeight > childHeight;
  }

  onSend() {
    this.props.onSend('' + this.props.messages.length);
  }

  onPaste(event: React.ClipboardEvent<HTMLDivElement>) {
    const items = event.clipboardData.items;
    // @ts-ignore
    navigator.clipboard.read().then(items => {
      console.log(items)

    }).catch(err => {
      console.error(err);
    });


    this.setState(produce((state: IState) => {
      for (let i = 0; i < items.length; i++) {
        console.log(`items[${i}]:`, items[i]);

        if (items[i].type.includes('image')) {
          const imgFile = items[i].getAsFile();
          if (!imgFile) {
            return;
          }
          const imgUrl = URL.createObjectURL(imgFile);
          state.pasteImages.push({
            url: imgUrl,
            file: imgFile,
          });
        }
      }
    }));
  };

  onDrop(event: React.DragEvent<HTMLDivElement>) {
    console.log(event.nativeEvent);
    event.preventDefault();
    const items = event.dataTransfer.items;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const file = item.getAsFile();
      console.log(file);
    }
  };

  render() {
    const { title, subTitle, messages } = this.props;
    return (
      <div className="message-box">
        <div className="header">
          <h1>{title}</h1>
          <h2>{subTitle}</h2>
        </div>

        <div className={classNames("message-list", { top: this.msgListAlignTop })}
             onScroll={this.onMessageListScroll}
             ref={this.msgListRef}>
          {
            messages.map(msg => <MessageText {...msg} key={msg.msgId}/>)
          }
        </div>

        <div className="user-input-area" onPaste={this.onPaste} onDrop={this.onDrop}>
          {
            this.state.pasteImages.map(img => <img alt={img.url} src={img.url}/>)
          }
          <div contentEditable id="editor"/>
          <button onClick={() => this.onSend()}>send</button>
        </div>
      </div>
    );
  }
}

export default MessageBox;