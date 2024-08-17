import { useState, useEffect, useRef } from 'react';
import { w3cwebsocket as Socket } from 'websocket';
import EmojiPicker from 'emoji-picker-react';
import { useOutsideClick } from '../../services/hooks';
import { ReactComponent as AddIcon } from '../../icons/add-emoji.svg';
import { ReactComponent as SendIcon } from '../../icons/send.svg';
import { getEmojisDictionary } from '../../services/emojis-dictionary-helper';

import './Chat.scss';

const pickerSize = 300;
const client = new Socket('ws://127.0.0.1:8000');

const Chat = ({ userName }) => {
  const [myMessage, setMyMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isPickerOpened, setIsPickerOpened] = useState(false);
  const [emojiMap, setEmojiMap] = useState({});

  const inputRef = useRef();

  const handleClickOutside = () => {
    setIsPickerOpened(false);
  };
  const ref = useOutsideClick(handleClickOutside);

  useEffect(() => {
    (async () => {
      const map = await getEmojisDictionary();
      setEmojiMap(map);
    })();
  }, []);

  const emojifyMessage = (message) => {
    let newMessage = message;
    for (const code in emojiMap) {
      const emojiRegExp = new RegExp(code, 'g');
      newMessage = newMessage.replace(emojiRegExp, emojiMap[code]);
    }
    return newMessage;
  };

  const handleClickEmoji = (emoji) => {
    setMyMessage((prev) => prev + emoji.emoji);
    inputRef.current.focus();
  };

  const onSend = () => {
    client.send(
      JSON.stringify({
        type: 'message',
        message: myMessage,
        userName
      })
    );
    setMyMessage('');
  };

  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const data = JSON.parse(message.data);
      setMessages((messages) => [
        ...messages,
        {
          message: data.message,
          userName: data.userName
        }
      ]);
    };
  }, []);

  return (
    <>
      <div className='title'>

        Chat App: {userName}</div>

      <div className='chat-container'>
        <section className='chat'>
          <div className='messages'>
            {messages.map((message, key) => (
              <div
                key={key}
                className={`message ${
                  userName === message.userName ? 'message--outgoing' : 'message--incoming'
                }`}
              >
                <div className='avatar'>{message.userName[0].toUpperCase()}</div>
                <div>
                  <h4>{message.userName + ':'}</h4>
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
          </div>
          <section className='send'>
            <input
              type='myMessage'
              className='input send__input'
              ref={inputRef}
              value={myMessage}
              onChange={(e) => setMyMessage(emojifyMessage(e.target.value))}
              onKeyUp={(e) => e.key === 'Enter' && onSend()}
              placeholder='Message'
            />
            <button className='button send__button' onClick={onSend}>
              <SendIcon />
            </button>
            <div ref={ref} className='picker__container'>
              <button
                className='button emoji__button'
                onClick={() => setIsPickerOpened(!isPickerOpened)}
              >
                <AddIcon />
              </button>
              <div className='emoji__picker'>
                <EmojiPicker
                  open={isPickerOpened}
                  height={pickerSize}
                  width={pickerSize}
                  onEmojiClick={handleClickEmoji}
                  skinTonesDisabled
                  previewConfig={{ showPreview: false }}
                />
              </div>
            </div>
          </section>
        </section>
      </div>
    </>
  );
};

export default Chat;
