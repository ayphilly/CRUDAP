const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString} = graphql;

const paintingType = new GraphQLObjectType({
    name : 'Painting',
    fields : ()=> ({
        id : {type:GraphQLString },
        name : {type:GraphQLString },
        url  : {type:GraphQLString },
        technique : {type:GraphQLString }
    })
})

module.exports = paintingType;

