# legit-home-assigment

**Nofar's solution**

I used ngrok to create the static payload URL.

1. First start ngrok: run `ngrok http <PORT>`.
   Note: the default port this app listens to is 3001.

2. Copy the forwarding address from the ngrok session details:
   
   <img width="742" alt="Screenshot 2024-05-19 at 20 19 47" src="https://github.com/nofars-exercise/legit-home-assigment/assets/162495395/12d5f7f0-449b-4694-b3d3-e9a174591f9f">

   and paste it in the Payolad URL in the organization's Webhooks settings, and add `\webhook`.
   URL for exmaple: `https://2a6e-176-230-32-166.ngrok-free.app\webhook`

4. Next, start the command line app by running `npm start`.
   - You can change the port number in `config.js`
   - **NOTE: To get full details of the event, change `VERBOSE` in `config.js` to true.**

5. Perform actions on any of the repositories of the organizaion **nofars-exercise** and watch the magic happen!
