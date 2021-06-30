const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(98382);
    expect(rover.position).toEqual(98382);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  //test 8
  it("response returned by receiveMessage contains name of message", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK'), new Command('MODE_CHANGE', 'LOW_POWER')];
    let newMessage = new Message('New message!', commands);
    let actual = rover.receiveMessage(newMessage).message;
    expect(actual).toEqual('New message!');
  });

  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK'), new Command('STATUS_CHECK')];
    let newMessage = new Message('New message!', commands);
    let actual = rover.receiveMessage(newMessage).results.length;
    expect(actual).toEqual(2);
    //could also have .toequal(commands.length)
  });

  //test 10
  it("responds correctly to status check command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('STATUS_CHECK')];
    let newMessage = new Message('New message!', commands);
    let actual = rover.receiveMessage(newMessage).results[0];
    let expected = {
      completed: true,
      roverStatus: {
        mode: 'NORMAL',
        generatorWatts: 110,
        position: 98382
      }
    }
    expect(actual).toEqual(expected);
  });

  //test 11
  it("responds correctly to mode change command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let newMessage = new Message('New message!', commands);
    let actual = rover.receiveMessage(newMessage).results[0].completed;
    expect(rover.mode).toEqual('LOW_POWER');
    expect(actual).toEqual(true);
  });

  //test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 30)];
    let newMessage = new Message('New message!', commands);
    let actual = rover.receiveMessage(newMessage).results[1].completed;
    expect(actual).toEqual(false);
  });

  //test 13
  it("responds with position for move command", function() {
    let rover = new Rover(98382);
    let commands = [new Command('MOVE', 30)];
    let newMessage = new Message('New message!', commands);
    //let actual = rover.receiveMessage(newMessage).position;
    rover.receiveMessage(newMessage)
    expect(rover.position).toEqual(30);
  });

});

