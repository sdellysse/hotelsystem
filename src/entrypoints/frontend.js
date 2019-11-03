import AddReservationForm from "../components/AddReservationForm";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import React from "react";
import ReactDOM from "react-dom";
import ReservationList from "../components/ReservationList";
import { useMutation } from "@apollo/react-hooks";
import { useQuery } from "@apollo/react-hooks";
import { useState } from "react"

const gqlClient = new ApolloClient();

const gqls = {
  createReservation: gql`
    mutation CreateReservation($hotelName: String!, $guestName: String!, $arrivalDate: Date!, $departureDate: Date!) {
      reservation: createReservation(hotelName: $hotelName, guestName: $guestName, arrivalDate: $arrivalDate, departureDate: $departureDate) {
        id
        hotelName
        guestName
        arrivalDate
        departureDate
      }
    }
  `,

  reservations: gql`
    query GetReservations {
      reservations {
        id
        guestName
        hotelName
        arrivalDate
        departureDate
      }
    }
  `,
};

const App = () => {
  const [ fieldValues, setFieldValues ] = useState({
    hotelName: "",
    guestName: "",
    arrivalDate: "",
    departureDate: "",
  });

  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(gqls.reservations);
  const [ createReservation, { loading: mutationLoading, error: mutationError } ] = useMutation(gqls.createReservation, {
    update: (cache, { data: { reservation } }) => {
      const cachedData = cache.readQuery({ query: gqls.reservations });
      cache.writeQuery({
        query: gqls.reservations,
        data: {
          ...cachedData,
          reservations: cachedData.reservations.concat([ reservation ]),
        },
      });
    },

    onCompleted: () => setFieldValues({
      hotelName: "",
      guestName: "",
      arrivalDate: "",
      departureDate: "",
    }),
  });

  const error = (queryError || mutationError);
  const loading = (queryLoading || mutationLoading);

  return <React.Fragment>
    {error &&
      <div class="error">
        An error has occurred: <div>{error.message}</div>
      </div>
    }
    {loading &&
      <div class="loading">
        Loading...
      </div>
    }

    <AddReservationForm
      fieldValues={fieldValues}
      onFieldChange={(field, newValue) => setFieldValues(fvs => ({
        ...fvs,
        [field]: newValue,
      }))}
      onSubmit={() => createReservation({ variables: fieldValues })}
    />

    <br/>
    <br/>
    <br/>

    <ReservationList rows={(queryData || {}).reservations} />

  </React.Fragment>;
};

const jsx = <ApolloProvider client={gqlClient}>
  <App/>
</ApolloProvider>;

ReactDOM.render(jsx, document.querySelector("#app"));
