const express = require('express');

const { PORT } = require('../config');
const { GitHubEventHandler } = require('./gitHubEventHandler');

const app = express();

app.use(express.json());

const gitHubEventHandler = new GitHubEventHandler();

app.post('/webhook', (req, res) => {
  const eventType = req.headers['x-github-event'];
  gitHubEventHandler.handle(req.body, eventType);
  res.status(200).end();
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}\n`);
});

