# Human37 Fakestream Package

Authors -- Maxime Wauthy & Glenn Vanderlinden @Human37

![Fakestream logo](https://i.ibb.co/QvFnw0Bd/Screenshot-2025-07-28-at-17-56-12.png)

## Purpose & Architecture

The Fakestream package is developed in order to generate synthetic data using [Faker](https://fakerjs.dev/) and send it to [Segment](https://segment.com), which in turn can dispatch it to final destinations. We have chosen to send it to Segment as Segment can act as a event pipeline from which data can then be distributed towards a number of tools for testing, training and demo applications. One SDK to rule them all if you will. 

![Architecture](https://i.ibb.co/Yy7bZbN/Measurecamp-Copy-of-Page-1-1.png)

Out of the box the script will generate event for the following customer journey. To modify see the section on event creation.

![Default customer journey](https://i.ibb.co/p343whR/Screenshot-2023-11-30-at-16-38-18.png)

## Demo and application documentation

* [Unlocking the Power of Synthetic Data – A short introduction](https://www.human37.com/post/unlocking-the-power-of-synthetic-data-a-short-introduction)
* [Synthetic data - An introduction to Faker.js](https://www.youtube.com/watch?v=kEnZslyQaS4&list=PL4YD95ENcSNTRAW5k65PDrzzQd2OsJs_c&ab_channel=Human37)
* [Synthetic data - A practical application](https://www.youtube.com/watch?v=JSyif515NFU&list=PL4YD95ENcSNTRAW5k65PDrzzQd2OsJs_c&index=2&ab_channel=Human37)

## Installation

On MacOS - Go to your folder location in which the script is stored using terminal. Then execute the following:

To install the Faker.js library:

```sh
npm install @faker-js/faker --save-dev
```
To install the Segment Node library:
```sh
 npm install @segment/analytics-node
```
## Configuration

### Segment write key 

Insert your Segment write key.
```sh 
const analytics = new Analytics({
  writeKey: "{{INSERT KEY HERE}}",
});
```
### User count

Define the number of user you would like to be generated.
```sh 
const numUsers = 10;
```

### Event creation

Create events in the templated structure.

```sh
  {
    name: "CTA Selected",
    properties: {
      cta_type: ["Sign-up Now", "Sign-up For Free"],
    },
    probability: 1.0,
  }
 ```

Where

- name -- corresponds to the event name
- Properties -- properties contains the relevant properties linked to an event. The value can be an array of possible values you wish to eventually send with the event payload. The value which will eventually be chosen at random.
- Probability -- Indicates the chance that this event will be executes where 1.0 represents 100% chance.

### User trait generation

Add traits where needed

```sh
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
 ```
## Running the script

In your IDE hit run.

In terminal - navigate to the root folder and run:
```sh
node FakeStream.js
 ```

