/*
chiguire-express
Copyright (c) 2014 Luis Enrique Arriojas
http://opensource.org/licenses/MIT

██╗     ██╗   ██╗██╗███████╗     █████╗ ██████╗ ██████╗ ██╗ ██████╗      ██╗ █████╗ ███████╗    
██║     ██║   ██║██║██╔════╝    ██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗     ██║██╔══██╗██╔════╝    
██║     ██║   ██║██║███████╗    ███████║██████╔╝██████╔╝██║██║   ██║     ██║███████║███████╗    
██║     ██║   ██║██║╚════██║    ██╔══██║██╔══██╗██╔══██╗██║██║   ██║██   ██║██╔══██║╚════██║    
███████╗╚██████╔╝██║███████║    ██║  ██║██║  ██║██║  ██║██║╚██████╔╝╚█████╔╝██║  ██║███████║    
╚══════╝ ╚═════╝ ╚═╝╚══════╝    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝ ╚═════╝  ╚════╝ ╚═╝  ╚═╝╚══════╝  

You're reading. I want to work for you.
https://www.linkedin.com/in/luisarriojas

*/
module.exports = function(environment) {
    if (environment == 'production') {
        var setup = {
            mongodb: {
                user: '',
                password: '',
                host: '',
                port: 47030,
                database: ''
            },
            redis: {
                host: '',
                port: 13492,
                pass: '',
                ttl: 57600
            },
            session: {
                cookieParserSecret: '',
                expressSessionSecret: ''
            },
            passport: {
                clientID: '',
                clientSecret: '',
                callbackURL: 'https://afternoon-sands-4604.herokuapp.com/loginCallback' //Path of FB's callback URL.
            }
        }
    } else {
        var setup = {
            mongodb: {
                host: 'localhost',
                port: 27017,
                database: 'myDB'
            },
            redis: {
                host: 'localhost',
                port: 6379,
                pass: '',
                ttl: 57600
            },
            session: {
                cookieParserSecret: 'JRjs*rrF5WN3h$@l1nTnPVffMg*tKz5!r6a7rDffXM%4H%bng6ModqRdEI*9aXkD',
                expressSessionSecret: 'uXNkT45QgILnzUd5d8f$Kygy1VGukM8FDbw8#X2o1Qe$tTTad%QoLfb0vI4oSgVp'
            },
            passport: {
                clientID: '',
                clientSecret: '',
                callbackURL: ''
            }
        }
    }

    return setup;
};