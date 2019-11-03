import { MongoClient } from "mongodb";
import { ObjectID } from "mongodb";

const applyId = (reservation) => {
  if (reservation) {
    return {
      ...reservation,
      id: reservation._id.toHexString(),
    };
  } else {
    return null;
  }
};

export default {
  getReservations: async (conn) => {
    console.log("QUERY: getting all reservations");

    const result = await conn.collection("reservations")
      .find({}, {
        projection: {
          _id: 1,
          guestName: 1,
          hotelName: 1,
          arrivalDate: 1,
          departureDate: 1,
        },
      })
      .toArray()
    ;

    return result.map(applyId);
  },

  getReservation: async (conn, id) => {
    console.log(`QUERY: getting reservation ${ id }`);

    const result = await conn.collection("reservations").findOne(
      {
        _id: ObjectID.createFromHexString(id),
      },
      {
        projection: {
          _id: 1,
          guestName: 1,
          hotelName: 1,
          arrivalDate: 1,
          departureDate: 1,
        },
      }
    );

    return applyId(result);
  },

  createReservation: async (conn, reservation) => {
    console.log(`QUERY: creating reservation ${ JSON.stringify(reservation) }`);
    const result = await conn.collection("reservations").insertOne(reservation);

    return applyId(result.ops[0]);
  },
};
