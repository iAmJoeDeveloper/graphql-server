import { gql, ApolloServer } from 'apollo-server'
// import { ApolloServer } from 'apollo-server-express'

const persons = [
	{
		name: 'Joe',
		phone: '8292821107',
		street: 'Frontend Av.',
		city: 'Toronto - Canada',
		id: '23626777',
	},
	{
		name: 'Gabriella',
		phone: '04125559655',
		street: 'Europa Street',
		city: 'España',
		id: '30123123',
	},
	{
		name: 'Arisela',
		phone: '04127859655',
		street: 'Happy Street',
		city: 'Miami',
		id: '13726951',
	},
]

const typeDefinitions = gql`
	type Person {
		name: String!
		phone: String
		street: String!
		city: String!
		id: ID!
	}

	type Query {
		personCount: Int!
		allPersons: [Person]!
	}
`

const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: () => persons,
	},
}

const server = new ApolloServer({
	typeDefs: typeDefinitions,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
