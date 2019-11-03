import { gql } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql";
import queries from "./mongodb";

export const schema = gql`
  scalar Date

  type Reservation {
    id: ID!
    guestName: String!
    hotelName: String!
    arrivalDate: Date!
    departureDate: Date!
  }

  type Query {
    reservation(id: ID!): Reservation

    # In a real app we'd want to use pagination and return reservations in a
    # wrapper
    reservations: [Reservation!]!
  }

  type Mutation {
    createReservation(guestName: String!, hotelName: String!, arrivalDate: Date!, departureDate: Date!): Reservation
  }
`;

const throwIfDateInvalid = (value) => {
  if (!(/^\d{4}-\d{2}-\d{2}$/.test(value))) {
    throw new Error(`Invalid Date: ${ value }`);
  } else {
    return value;
  }
};

export const resolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    parseValue: throwIfDateInvalid,
    serialize: throwIfDateInvalid,
    parseLiteral: (ast) => throwIfDateInvalid(ast.value),
  }),

  Query: {
    reservation: async (_parent, { id }, { dbconn }) => {
      return queries.getReservation(dbconn, id);
    },

    reservations: async (_parent, {}, { dbconn }) => {
      return queries.getReservations(dbconn);
    },
  },

  Mutation: {
    createReservation: async (_parent, { guestName, hotelName, arrivalDate, departureDate }, { dbconn }) => {
      return queries.createReservation(dbconn, { guestName, hotelName, arrivalDate, departureDate });
    },
  },
};
