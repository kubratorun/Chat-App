# Chat App

## About

This Chat App is a real-time messaging application built using WebSockets, enabling users to communicate instantly across multiple clients. The application is divided into two main parts: the server, which handles the WebSocket connections and message routing, and the client, which provides a user-friendly interface for sending and receiving messages.

## Key Features
Real-Time Messaging: Instantly send and receive messages across multiple clients.
WebSocket Integration: Utilizes WebSocket for efficient and persistent connections.
Simple Interface: Easy-to-use interface that allows users to join chatrooms and start messaging with just a username.
Scalable Architecture: Backend and frontend are decoupled, allowing for easier scaling and maintenance.

## Technologies Used
Frontend: React, JavaScript, HTML, CSS

Backend: Node.js, Express, WebSocket

Other: npm for package management

## Setup and Run

Ensure you  have `Node.js` (LTS version) and `npm` installed on your machine.

### Step 1: Start the Server

1. Open a terminal and navigate to the `server` directory:

    ```bash
    cd server
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the server:

    ```bash
    npm run start
    ```

    *Note: The server is pre-configured and serves as the backend environment for this chat app.*

### Step 2: Start the Client

1. Open a second terminal and navigate to the `client` directory:

    ```bash
    cd client
    ```

2. Install the required dependencies:

    ```bash
    npm install
    ```

3. Start the client:

    ```bash
    npm run start
    ```

### Step 3: Test the Chat App

1. Open two tabs or windows in your browser.
2. In both tabs, navigate to `localhost:3000`.
3. Enter a random username and click `Enter chatroom` in both tabs.

You should now have a WebSocket connection established, allowing you to send messages between connected clients in real-time.

### ENJOY THE CHAT APP 🥳
<img width="461" alt="bart" src="https://github.com/user-attachments/assets/1df10409-0688-4f09-bdd9-9e876b7948a8">
<img width="1429" alt="homer" src="https://github.com/user-attachments/assets/a0953d99-1025-43b3-88ec-d9586cccba85">
