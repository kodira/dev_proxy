/**
 * Created by uw on 17/11/14.
 */
var http = require('http');
var httpProxy = require('http-proxy');
var mongoose = require('mongoose');


var options = {};

var proxy = httpProxy.createProxyServer(options);

//
// Configuration
//

var mongoDb = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME || 'mongodb://localhost/proxy';

var proxyTarget = process.env.PROXY_TARGET || 'http://gis-services.sk:8086';


//
// Bla
//

mongoose.connect(mongoDb);

var EntrySchema = new mongoose.Schema({
        start: Date,
        stop: Date,
        error: String,
        url: String,
        req_method: String,
        req_headers: Object,
        req_body: String,
        res_headers: Object,
        res_body: Object,
        res_code: Number
    },

    { capped: { max: 1000, size: 200 * 1024 * 1024, autoIndexId: true }
    });

var Entry = mongoose.model('Entry', EntrySchema);

var server = http.createServer(function (req, res, next) {

    req.time_start = Date.now();
    req.fullBody = '';
    req.on('data', function (chunk) {
        req.fullBody += chunk.toString();
    });

    console.log('Request ' + req.url);

    proxy.web(req, res, { target: proxyTarget });
});

function parse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}

function log(proxyErr, err, req, res) {

    var entry = new Entry({
        start: req.time_start,
        stop: req.time_end,
        error: JSON.stringify(err),
        url: req.url,
        req_method: req.method,
        req_headers: req.headers,
        req_body: parse(req.fullBody),
        res_code: res.statusCode,
        res_headers: res._headers,
        res_body: parse(req.resbody)
    });

    entry.save();
}

proxy.on('error', function (err, req, res) {
    console.log('Error URL' + req.url);
    req.time_end = Date.now();
    res.statusCode = 500;
    log(true, err, req, res);
    res.end(JSON.stringify(err));
});

proxy.on('proxyRes', function (proxyRes, req, res) {
    req.time_end = Date.now();
    var _write = res.write;
    res.write = function (data) {
        if (typeof data !== 'undefined') {
            req.resbody = req.resbody || '';
            req.resbody += data.toString();
        }
        _write.call(res, data);
    };

    var _end = res.end;
    res.end = function (arguments) {
        console.log('Req-Headers:' + JSON.stringify(req.headers));
        console.log('Success URL' + req.url + ' in ' + (req.time_end - req.time_start) + 'ms');
        log(false, null, req, res);
        _end.call(res, arguments)
    }
});


console.log('Proxy listen on port 8086');
server.listen(8086);


