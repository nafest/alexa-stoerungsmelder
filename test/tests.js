var scrape = require('./../app/scrape.js');
var fs = require('fs');

var assert = require('assert');

describe('scrape()', function() {
    it ('should return no disruption correctly', function() {
        console.log(scrape);
        console.log(scrape.scrape);
        var html = fs.readFileSync('test/frame3.html','utf8');
        var result = scrape.scrape(html);
        assert.equal("Aktuell liegen uns keine Meldungen vor.", result);
    });

    it ('should return a disruption correctly', function() {
        console.log(scrape);
        console.log(scrape.scrape);
        var html = fs.readFileSync('test/frame1.html','utf8');
        var result = scrape.scrape(html);
        assert.equal("Stammstrecke: Verzögerungen nach vorangegangenem Polizeieinsatz (Stand 15.11.2016, 10:00 Uhr)", result);
    });
});
