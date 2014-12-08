chiguire-express
================

*Boilerplate for Express 4 optimized to run on Heroku*

**Dependencies**
* supervisor 0.6.x
* express 4.1.x
* compression 1.0.x
* cookie-parser 1.0.x
* express-session 1.0.x
* body-parser 1.9.x
* connect-redis 2.0.x
* mongodb 1.4.x
* passport 0.2.x
* passport-facebook 1.0.x

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
