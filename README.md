chiguire-express
================

*Boilerplate for Express 4*

**Dependencies**
* express 4.1.0
* compression 1.0.1
* cookie-parser 1.0.1
* express-session 1.0.3
* connect-redis 2.0.0
* mongodb 1.4.2

**System requirements**
* MongoDB server
* Redis server

After download the code from GitHub, install dependencies:
```bash
$ sudo npm install
```

**Configuration**
* cookie-parser: It needs a password; use a strong one:
  ```javascript
  app.use(cookieParser("password"));
  ```

* express-session: It needs another password or the same one used in cookie-parser; use a strong one. Setup the connection and modify TTL for your needs:
  ```javascript
  app.use(expressSession({
     secret: "another password",
     store: new connectRedis({
       host: '127.0.0.1',
       port: 6379,
       ttl: 60
     })
  }));
  ```

* static: You can use multiple locations for static content:
  ```javascript
  app.use(express.static('./static'));
  ```

* routing: You can use multiple routes in order to have an organized code:
  ```javascript
  var router1 = require('./router/router1')(app, db);
  ```

**To run in development environment (port 3000):**
```bash
$ node app
```

**To run in production environment (port 80):**
```bash
$ npm start
```
