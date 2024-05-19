const express = require('express');
const app = express();

app.post('/webhook', (req, res) => {
  // Handle the incoming webhook payload
  const payload = req.body;

  // Implement your logic to detect and notify suspicious behaviors based on use cases a, b, and c
  // ...
  console.log('Hi');
  res.status(200).end(); // Responding is important to let GitHub know the webhook was received
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {

});