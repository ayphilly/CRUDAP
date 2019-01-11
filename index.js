const hapi = require('hapi');
const monqoose = require('mongoose');
const painting = require('./models/paint');
const { graphqlHapi, graphiqlHapi} = require('apollo-server-hapi');
const schema = require ('./graphql/schema');

const graphql = require('graphql');
const Inert = require('inert');
//const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server  = hapi.server({
    port : 4000,
    host : 'localhost'
}
);

monqoose.connect('mongodb://Blanco98:radamelfalcao9@ds229648.mlab.com:29648/monq');

monqoose.connection.once('open', () => {
    console.log('db connected');
});

const init = async () => {
    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    });

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    });

    await server.register([
        Inert,
        //Vision,
        {
            plugin : HapiSwagger,
            options :{
                info : {
                    title : 'Paintn Documentation API',
                    version : Pack.version
                }
            }
        }
    ]);
    server.route([
        {
            method : 'GET',
            path : '/',

            handler : (request, reply) => {
                return `<h1> Call Me PAPI </h1>`;
            }

        },
        {
            method: 'GET',
            path: '/api/v1/painting',
            config : {
                description : 'Get All Paintings',
                tags : ['api', 'v1', 'paintings']
            },
            handler: (req, reply) => {
                return painting.find();

            }
        },
        {
            method: 'POST',
            path: '/api/v1/painting',
            config : {
                description : 'Get  Paintings by ID',
                tags : ['api', 'v1', 'paintings']
            },
            handler: (req, reply) => {
                const {name, url, technique} = req.payload;
                const paint = new painting({
                    name,
                    url,
                    technique
                })
                return paint.save();

            }
        }
    ]);


    await server.start();
    console.log(`server running at : ${server.info.uri}`);
};
init();


process.on('unHandledRejection', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});