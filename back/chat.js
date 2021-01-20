const tmi = require('tmi.js');
import { google } from 'googleapis';

const { PERSPECTIVE_API_KEY } = process.env;
const DISCOVERY_URL = 'https://commentanalyzer.googleapis.com/$discovery/rest?version=v1alpha1';

let info = {
  username: '',
  message: '',
  processed: false
}

let storedClient = null;
let interval = null;

export default (user, cb) => {
  if (storedClient !== null) {
    storedClient.disconnect();
    storedClient = null;
  }

  if (interval !== null) {
    clearInterval(interval);
    interval = null;
  }
  
  const client = new tmi.Client({
    options: { debug: false, messagesLogLevel: "info" },
    connection: {
      reconnect: true,
      secure: true
    },
    channels: [ user ]
  });

  client.connect().catch(console.error);
  
  client.on('message', (channel, tags, message, self) => {
    const { username } = tags;
    
    if (self) return;
    
    info = { username, message, processed: false };
  });

  storedClient = client;

  setInterval(async () => {
    if (!info.message) {
      // console.info(info, 'info.message esta vacio');
      return;
    }

    if (info.processed === true) {
      console.info('Mensaje ya procesado');
      return;
    }

    const client = await google.discoverAPI(DISCOVERY_URL);
    const message = info.message;

    info.processed = true;

    const analyzeRequest = {
      comment: {
        text: message,
      },
      requestedAttributes: {
        TOXICITY: {},
        // SEXUALLY_EXPLICIT: {},
        // FLIRTATION: {}
      },
    };

    client.comments.analyze(
      { key: PERSPECTIVE_API_KEY, resource: analyzeRequest },
      (error, response) => {
        if (error) {
          // console.info('>>> Error:', error.message);
          return;
        }

        cb({
          message,
          toxicity: Math.ceil(response.data.attributeScores.TOXICITY.summaryScore.value * 100),
          // sexuallyExplicit: Math.ceil(response.data.attributeScores.SEXUALLY_EXPLICIT.summaryScore.value * 100),
          // flirtation: Math.ceil(response.data.attributeScores.FLIRTATION.summaryScore.value * 100) - 20,
        });
      });

  }, 1500);
}