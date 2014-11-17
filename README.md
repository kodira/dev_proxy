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



