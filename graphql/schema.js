const graphql = require('graphql');
const { paintingType } = require('./paintingtype');
const Painting = require('../models/paint');

const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
} = graphql;

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields :{
       painting : {
           type :paintingType,
           args : {id: {type : GraphQLString}},
           resolve(parent,args){
               return Painting.findById(args.id)
           }

       }
    }
});

module.exports = new GraphQLSchema({
    query :RootQuery
})