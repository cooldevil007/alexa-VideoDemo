'use strict';

var Alexa = require("alexa-sdk");
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

exports.handler = function(event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};

var handlers = {

  'LaunchRequest' : function(){
      this.emit('PlayVideoIntent');
  },

  'PlayVideoIntent' : function(){

      if(this.event.context.System.device.supportedInterfaces.VideoApp){
          let builder = new Alexa.templateBuilders.BodyTemplate1Builder();

          let template = builder.setTitle("Snow City")
                                .setBackgroundImage(makeImage("https://s3.amazonaws.com/cdn.dabblelab.com/img/echo-show-bg-blue.png"))
                                .setTextContent(makePlainText("A 1 min snow city view"))
                                .build();

          let meta = {
            title: "Video about snow city in lights",
            subtitle: "Used under creative commons"
          }

          this.response.playVideo("https://s3.amazonaws.com/media.dabblelab.com/video/visual-escape-01.mp4", meta)
                        .renderTemplate(template);
      }else {
        this.response.speak("The video can't be played on your device. To watch this video try launching this skill from an echo show device");

      }
      this.emit(':responseReady');
  },

  'AboutIntent': function(){

    if(this.event.context.System.device.supportedInterfaces.VideoApp){
      this.response.speak("This skill is about creating a video skill").listen("To see a video say : watch video");

    }else {
      this.response.speak("The video can't be played on your device. To watch this video try launching this skill from an echo show device");
    }
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function(){
    console.log("Session ended with reason: " + this.event.request.reason);
  },
  'AMAZON.StopIntent': function(){
    this.response.speak("Byee !!");
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function(){
    this.response.speak("You can say: 'Watch video'");
    this.emit(':responseReady');
  },
  'AMAZON.CancelIntent': function(){
    this.response.speak("Byeee");
    this.emit(':responseReady');
  },
  'Unhandled': function(){
    this.response.speak("Sorry I didn't get that");
  }

};
