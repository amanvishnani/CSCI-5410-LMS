/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  console.log("entered");

  const subscriptionName = req.query.id;
  console.log("subscriptionName", subscriptionName);

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  /*   let message = req.query.message || req.body.message || 'Hello World!';
  res.status(200).send(message); */

  const timeout = 30;
  const { PubSub } = require("@google-cloud/pubsub");

  const projectId = "testproject-277421";

  const pubSubClient = new PubSub({ projectId });

  let output = [];
  try {
    console.log("listenForMessages 1", new Date());
    const subscription = pubSubClient.subscription(subscriptionName);

    let messageCount = 0;
    const messageHandler = (message) => {
      let data = message.data;
      console.log(`Received message ${message.id}:`);
      console.log(`\tData: ${data}`);
      console.log(`\tData type:`, typeof data);
      let dataStr = message.data.toString();
      console.log(`\dataStr: ${dataStr}`);
      console.log(`\dataStr: type`, typeof dataStr);

      if (dataStr.length > 10) {
        let dataJson = JSON.parse(dataStr);
        console.log(`\dataJson: ${dataJson}`);
        console.log(`\dataJson: type`, typeof dataJson);

        console.log(`\tAttributes: ${message.attributes}`);
        output.push(dataJson);
      }
      messageCount += 1;
      message.ack();
    };

    subscription.on("message", messageHandler);

    setTimeout(() => {
      subscription.removeListener("message", messageHandler);
      console.log(`${messageCount} message(s) received.`);
      console.log("output", output, new Date());
      res.status(200).send(output);
    }, timeout * 100);
  } catch (e) {
    console.log("exception");
    res.status(400).send(output);
  }
};
