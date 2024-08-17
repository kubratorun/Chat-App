import React, { useState } from 'react';

import ChatGates from './components/chat-gates/ChatGates';
import Chat from './components/chat/Chat';

import './App.scss';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <div className='container'>
      {userName ? <Chat userName={userName} /> : <ChatGates setUserName={setUserName} />}
    </div>
  );
}

export default App;
