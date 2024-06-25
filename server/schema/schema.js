// const { projects, clients } = require("../sampledata");

//mongoose models:
const Project = require("../models/Project")
const Client = require("../models/Client")  

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType
} = require("graphql");

const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});


const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },
    client:{
      type: ClientType,
      resolve(parent, args) {
        return Client.findById(parent.clientId);
      }
    }
  }),
});


//find all find by id query:
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        return Client.find();
      }
    },

    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Client.findById(args.id);
      }

    },

    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find();
      }
    },

    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id);
      }

    }


  }
});


//mutations:

const mutation=new GraphQLObjectType({
  name:'Mutation',
  fields:{

    //add a client
    addClient:{
      type:ClientType,
      args:{
        name:{type: GraphQLNonNull(GraphQLString) },
        email:{type: GraphQLNonNull(GraphQLString) },
        phone:{type: GraphQLNonNull(GraphQLString) },
      },
      resolve(parent,args){
        let client=new Client({
          name:args.name,
          email:args.email,
          phone:args.phone
        });
        return client.save();
      }
    },
    //delete client:

    deleteClientById:{
      type:ClientType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent,args){
        return Client.findByIdAndDelete(args.id);
      }
    },

    //add a project:
    addProject:{
      type:ProjectType,
      args:{
        name:{type: GraphQLNonNull(GraphQLString) },
        description:{type: GraphQLNonNull(GraphQLString) },
        status:{
          type: new GraphQLEnumType({
          name:'ProjectStatus',
          values:{
            'new':{value:'Not Started'},
            'completed':{value:'Completed'},
            'progress':{value:'In Progress'}
          }
        }),
        defaultValue: 'Not Started'
          
        },
        clientId:{type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent,args){
        let project=new Project({
          name:args.name,
          description:args.description,
          status:args.status,
          clientId:args.clientId
        });
        return project.save();
      }
    },
    //delete project:

    deleteProjectById:{
      type:ProjectType,
      args:{
        id:{type:GraphQLNonNull(GraphQLID)}
      },
      async resolve(parent,args){
        return Project.findByIdAndDelete(args.id);
      }
    },

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
