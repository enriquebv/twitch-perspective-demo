# twitch-perpective-demo

A demo using Perspective API to read and measure toxicity in Twitch chats.

## Getting started

1. Get Pespective [API Key](https://github.com/conversationai/perspectiveapi/tree/master/1-get-started).
2. Create a .env file.
3. Add `PERSPECTIVE_API_KEY=<api-key>`
4. Run `yarn` or `npm i`.
5. Run `yarn dev:server` to start back-end server.
6. Run `yarn dev:front` to start front-end HMR server.

And after pressing "Connect" in the front-end, you will view messages and his toxiticy % in the back-end terminal.