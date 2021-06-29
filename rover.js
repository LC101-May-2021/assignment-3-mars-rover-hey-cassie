class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position;
      this.mode = mode;
      this.generatorWatts = generatorWatts;
   }
   receiveMessage(message){
     let response = {
      message: message.name,
      results: message.commands
     }
     return response;
   }
}

module.exports = Rover;