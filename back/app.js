import dotenv from 'dotenv';
import socketio from 'socket.io';
import express, { json } from 'express';
import { Server } from 'http';
import cors from 'cors';

dotenv.config();

const { PERSPECTIVE_API_KEY } = process.env;
const app = express();
const http = Server(app);
const io = socketio(http);

app.use(json());
app.use(cors());

const PORT = process.env.PORT || 8080;

app.put('/api/channel', (req, res) => {
  require('./chat').default(req.body.channel, console.info);
  res.send('');
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

http.listen(PORT, () => console.log('listening on *:', PORT));

