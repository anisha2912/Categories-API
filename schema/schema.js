const graphql = require('graphql');
const _ = require('lodash');
const {GraphQLObjectType,
        GraphQLString,
        GraphQLSchema,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull
        } = graphql;
const Category = require('../models/category');


const CategoryType = new GraphQLObjectType ({
    name:'Category',
    fields: () => ({
        categoryname: { type: GraphQLString},
        categoryid: {type: GraphQLInt},
        products: {type: GraphQLInt},
    })
});

const RootQuery = new GraphQLObjectType ({
    name:"RootQueryType", 
    fields: () => ({
        category: {
            type: CategoryType, 
            args: {categoryname:{type: GraphQLString}},
            resolve(parent,args){
                //code to get data from db/ other source
                return Category.findOne({categoryname: args.categoryname});
                //return _.find(categories, {categoryname: args.categoryname});
            }
        },
        categories: {
            type:new GraphQLList(CategoryType),
            resolve(parent,args){
                return Category.find({});
            }
        },
    })

});

//mutations will be changed and linked to the database, once the database is ready
const Mutation = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        //addCategory mutation will let you add the new joining customers information
        addCategory : {
            type:CategoryType,
            args: {
                categoryname: {type:new GraphQLNonNull(GraphQLString)},
                categoryid: {type: new GraphQLNonNull(GraphQLInt)},
                products: {type: new GraphQLNonNull(GraphQLInt)}

            },
            resolve(parent,args){
                let category = new Category({
                    categoryname : args.categoryname,
                    categoryid : args.categoryid,
                    products : args.products
                });
                return category.save();
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery ,
    mutation: Mutation
});
