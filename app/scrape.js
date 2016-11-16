var cheerio = require('cheerio');

exports.scrape = function (html) {
    var $ = cheerio.load(html);

    // the contents start in a page1 div
    var page1 = $('#page1');
    var notification = $('.notification',page1.first());
    if (notification.length == 0) {
        var text = page1.text();
        return text;
    }
    else {
        var text = page1.find('h1').text();
        return text;
    }
    return "scraping failed";
}
