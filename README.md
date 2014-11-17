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

should give you 


```
{
	"_id" : ObjectId("546a25ad3eb52efb56f76518"),
	"start" : ISODate("2014-11-17T16:43:24.974Z"),
	"stop" : ISODate("2014-11-17T16:43:25.645Z"),
	"error" : "null",
	"url" : "...",
	"req_method" : "GET",
	"req_headers" : "...",
	"req_body" : "",
	"res_code" : "200",
	"res_body" : "...",
	"__v" : 0
}
```






