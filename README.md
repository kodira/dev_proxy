dev_proxy
=========

This is a node.js based HTTP proxy which logs all request to a Mongo DB. Usefull for debugging and testing you apps. 


INSTALL
=======

To install the proxy

```
git clone https://github.com/kodira/dev_proxy.git
cd dev_proxy/node/
npm install
node index.js
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
> use proxy
> db.entries.find().pretty()
````

An log entry contains:


```
{
	"_id" : The object ID,
	"start" : ISDate of the client request ,
	"stop" : ISODate of the trarget server response,
	"error" : A error message if there was an error, e.g. a connection error
	"url" : the requested URL
	"req_method" : the request method, e.g. 'GET' or 'POST'
	"req_headers" : the request headers
	"req_body" : the request body if any
	"res_code" : the result code
	"res_body" : the result body if any
}
```






