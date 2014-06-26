var casper = require('casper').create({
    verbose: false,
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,         // The WebPage instance used by Casper will
         loadPlugins: false,         // use these settings
         userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.4 (KHTML, like Gecko) Chrome/22.0.1229.94 Safari/537.4'
    }
});

var login = casper.cli.get("login");
var password = casper.cli.get("password");
var imageLocation = casper.cli.get("imagedest") || "" ;

casper.start('https://www.noip.com/login', function() {
    //this.capture(imageLocation+login+'-1-prelogin.png', { top: 0, left: 0, width: 1280, height: 1024 });
    this.fill('form[id="clogs"]', {
          'username': login,
          'password': password
      }, true);
    //this.capture(imageLocation+login+'-2-postlogin.png', { top: 0, left: 0, width: 1280, height: 1024 });
});

casper.waitForSelector('#right-inner > ul > li:nth-child(4) > a', function then() {
        this.capture(imageLocation+login+'-login.png', { top: 0, left: 0, width: 1280, height: 1024 });
}, function timeout() {
    this.echo("I can't log-in").exit();
}, 100000);

casper.thenClick('#right-inner > ul > li:nth-child(4) > a', function() {
  this.capture(imageLocation+login+'-hosts.png', { top: 0, left: 0, width: 1280, height: 1024 });
})

casper.run();
