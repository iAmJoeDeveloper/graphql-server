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
	type Address {
		street: String!
		city: String!
	}

	type Person {
		name: String!
		phone: String
		address: Address!
		id: ID!
	}

	type Query {
		personCount: Int!
		allPersons: [Person]!
		findPerson(name: String!): Person
	}
`

const resolvers = {
	Query: {
		personCount: () => persons.length,
		allPersons: () => persons,
		findPerson: (root, args) => {
			const { name } = args
			return persons.find((person) => person.name === name)
		},
	},
	Person: {
		// address: (root) => `${root.street}, ${root.city}`,
		address: (root) => {
			return {
				street: root.street,
				city: root.city,
			}
		},
	},
}

const server = new ApolloServer({
	typeDefs: typeDefinitions,
	resolvers,
})

server.listen().then(({ url }) => {
	console.log(`Server ready at ${url}`)
})
