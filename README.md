chiguire-express
================

*Boilerplate for Express 4 optimized to run on Heroku*

**Dependencies**
* supervisor 0.6.x
* express 4.1.0
* compression 1.0.1
* cookie-parser 1.0.1
* express-session 1.0.3
* connect-redis 2.0.0
* mongodb 1.4.2
* passport 0.2.1
* passport-facebook 1.0.3

**System requirements**
* MongoDB server
* Redis server
* Facebook app

After download the code from GitHub, install dependencies:
```bash
$ sudo npm install
```

**Configuration**
* Just fill the setup.js file.

* static: You can use multiple locations for static content:
  ```javascript
  app.use(express.static('./static'));
  ```

* routing: You can use multiple routes in order to have an organized code:
  ```javascript
  var router = require('./router/router')(app, db);
  ```

**To run in development environment (port 3000):**
```bash
$ node app
```

**To run in production environment (port 80):**
```bash
$ sudo PORT=80 npm start
```
