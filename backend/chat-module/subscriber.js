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
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  if (req.method === "OPTIONS") {
    return res.status(204).send("Success");
  }

  const timeout = 30;
  const { PubSub } = require("@google-cloud/pubsub");

  const projectId = "testproject-277421";

  const pubSubClient = new PubSub({ projectId });

  let output = [];
  try {
    console.log("listenForMessages 1", new Date());

    let subscriptionList = [];
    pubSubClient.getSubscriptions().then(function (data) {
      if (data && data[0]) {
        Object.values(data[0]).forEach((value) => {
          console.log(value["name"]);
          let fullName = value["name"];
          if (fullName) {
            let arr = fullName.split("/");
            if (arr && arr.length > 3) {
              let name = arr[3];
              subscriptionList.push(name);
            }
          }
        });
        console.log(subscriptionList);
      }
    });

    console.log("listenForMessages 2", new Date());
    if (subscriptionList.includes(subscriptionName)) {
      const subscription = pubSubClient.subscription(subscriptionName);

      let messageCount = 0;
      const messageHandler = (message) => {
        if (message) {
          let data = message.data;
          if (data) {
            let dataStr = message.data.toString();
            if (dataStr.length > 10) {
              let dataJson = JSON.parse(dataStr);

              let arr = subscriptionName.split("-");
              let userId;
              console.log("arr", arr);
              console.log("dataJson", dataJson);
              if (arr.length > 1) {
                userId = parseInt(arr[1]);
              }
              if (
                dataJson.message &&
                dataJson.message.userId &&
                userId !== dataJson.message.userId &&
                dataJson.message.orgName &&
                dataJson.message.orgId
              ) {
                let orgCheck =
                  dataJson.message.orgName.charAt(0) + dataJson.message.orgId;

                if (orgCheck === arr[0]) {
                  output.push(dataJson);
                }
              }
            }
            messageCount += 1;
            message.ack();
          }
        }
      };

      subscription.on("message", messageHandler);

      setTimeout(() => {
        subscription.removeListener("message", messageHandler);
        console.log(`${messageCount} message(s) received.`);
        console.log("output", output, new Date());
        return res.status(200).send(output);
      }, timeout * 100);
    } else {
      return res.status(200).send(output);
    }
  } catch (e) {
    console.log("exception", e);
    res.status(400).send("failed");
  }
};
