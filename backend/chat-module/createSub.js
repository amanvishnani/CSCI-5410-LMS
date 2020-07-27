/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.helloWorld = (req, res) => {
  console.log("entered");

  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Max-Age", "3600");

  console.log("req.body", req.body);

  if (req.method === "OPTIONS") {
    return res.status(204).send("Success");
  }

  if (req.body && req.body.orgId && req.body.orgName && req.body.userId) {
    console.log("req.body.orgId", req.body.orgId);
    console.log("req.body.orgName", req.body.orgName);
    console.log("req.body.userId", req.body.userId);

    const { PubSub } = require("@google-cloud/pubsub");

    const projectId = "testproject-277421";
    const pubSubClient = new PubSub({ projectId });
    const topicName = "trial";

    try {
      let subscriptionName =
        req.body.orgName.charAt(0) + req.body.orgId + "-" + req.body.userId;
      console.log("subscriptionName", subscriptionName);

      async function createSubscription() {
        await pubSubClient
          .topic(topicName)
          .createSubscription(subscriptionName);

        console.log(`Subscription ${subscriptionName} created.`);
        return res.status(200).send("success");
      }

      createSubscription();
    } catch (e) {
      console.log("exception");
      return res.status(400).send("failed");
    }
  } else {
    return res.status(400).send("invalid request");
  }
};
