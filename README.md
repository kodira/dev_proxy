dev_proxy
=========

This is a node.js based Reverse-HTTP proxy which logs all request to a Mongo DB. Usefull for debugging and testing your REST apps. 


INSTALL
=======

To install the proxy

```
git clone https://github.com/kodira/dev_proxy.git
cd dev_proxy/node/
npm install
```

CONFIGURATION
=============

Change index.js


RUN
===

Make sure you mongo database is running, than

```
node index.js
```

You should see:

```
Proxy listen on port 8086
```


LOG
===

To see all logged request, open your mongo shell, and connect to the database ``proxy``. Alle requests are stored in the ``entries`` collection.

E.g.:

```
mongo
> use proxy
> db.entries.find().pretty()
````

A log entry comprises:


```
{
	"start" : ISDate of the client request ,
	"stop" : ISODate of the trarget server response,
	"error" : A error message if there was an error, e.g. a connection error
	"url" : the requested URL
	"req_method" : the request method, e.g. 'GET' or 'POST'
	"req_headers" : the request headers
	"req_body" : the request body if any
	"res_code" : the response code
	"res_body" : the response body if any
}
```






