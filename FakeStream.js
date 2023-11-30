const { faker } = require("@faker-js/faker");
const { Analytics } = require("@segment/analytics-node");

// Initialize Segment client with your write key
const analytics = new Analytics({
  writeKey: "{{INSERT KEY HERE}}",
});

// Define the number of users to generate
const numUsers = 10;

// Define event names and their associated properties with probabilities
const events = [
  {
    name: "CTA Selected",
    properties: {
      cta_type: ["Sign-up Now", "Sign-up For Free"],
    },
    probability: 1.0,
  },
  {
    name: "Upgrade Initiated",
    properties: {},
    probability: 1.0,
  },
  {
    name: "Plan Selected",
    properties: {
      plan_type: ["Free", "Paid"],
    },
    probability: 0.9,
  },
  {
    name: "Payment Details Completed",
    properties: {
      payment_type: ["Visa", "Paypal", "Crypto"],
      payment_plan: ["Monthly", "Yearly"],
    },
    probability: 0.7,
  },

  {
    name: "Upgrade Completed",
    properties: {},
    probability: 0.4,
  },
];

// Function to generate a user with traits
function generateUser() {
  const userId = faker.string.uuid();
  const name = faker.person.fullName();
  const userTraits = {
    company: faker.company.name(),
    name: name,
    email: `${name.split(" ")[1].toLowerCase()}${Math.round(
      Math.random() * 100
    )}@fakeHuman.37`,
  };
  return { userId, userTraits };
}

// Function to generate and send events for a user with a delay
function generateAndSendEventsWithDelay(userId, delay) {
  let eventIndex = 0; // Keep track of the current event
  const numEvents = events.length;

  function sendNextEvent() {
    if (eventIndex < numEvents) {
      const event = events[eventIndex];
      if (Math.random() <= event.probability) {
        const eventName = event.name;
        const eventProperties = {};

        for (const property in event.properties) {
          const randomIndex = Math.floor(
            Math.random() * event.properties[property].length
          );
          eventProperties[property] = event.properties[property][randomIndex];
        }

        // Use setTimeout to send the event after a specified delay
        setTimeout(() => {
          analytics.track({
            userId: userId,
            event: eventName,
            properties: eventProperties,
          });

          console.log(`Sent event: ${eventName} for user: ${userId}`);
          eventIndex++; // Move to the next event
          sendNextEvent(); // Send the next event with the same delay
        }, delay);
      } else {
        eventIndex++; // Move to the next event even if it's not sent
        sendNextEvent(); // Send the next event with the same delay
      }
    }
  }

  // Start sending events
  sendNextEvent();
}

// Generate and send events for multiple users with a delay
let delay = 5000; // Initial delay
for (let userIndex = 0; userIndex < numUsers; userIndex++) {
  const { userId, userTraits } = generateUser();

  // Identify the user with their traits using Segment
  analytics.identify({
    userId: userId,
    traits: userTraits,
  });

  console.log(`Identified user: ${userId}`);
  generateAndSendEventsWithDelay(userId, delay);
}
