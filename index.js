var request = require('request');
var cheerio = require('cheerio');
var Alexa = require('alexa-sdk');
var scraper = require('./app/scrape.js');

var APP_ID = undefined;

url = 'https://img.srv2.de/customer/sbahnMuenchen/newsticker/newsticker.html';

function request_and_scrape() {
    var context = new Promise(function(resolve, reject) {
        request(url, function(error, response, html) {
            if (!error) {
                var text = scraper.scrape(html);
                resolve(text);
            }
            else {
                reject(error);
            }
        });
    });

    return context;    
}


var handlers = {
    'BetriebslageIntent': function () {
       var a = this;
       request_and_scrape().then(function(text) {
           a.emit(':tellWithCard', text, "Störungsmelder", text);
       });
    },
    'LaunchRequest': function () {
        this.emit('BetriebslageIntent');
    },
    'GetNewFactIntent': function () {
        this.emit('BetriebslageIntent');
    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t("Du kannst mich nach Störungen fragen");
        var reprompt = this.t("Du kannst mich nach Störungen fragen");
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', "Ok. Danke.");
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', "Ok. Danke.");
    }
}

exports.handler = function(event, context, callback) {
      var alexa = Alexa.handler(event, context);
      alexa.registerHandlers(handlers);
      alexa.execute();
  };
