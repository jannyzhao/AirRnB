import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, getReservations } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";
import "./ReservationIndex.css";
import ListingIndex from "../Listings/ListingIndex";

const ReservationIndex = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  let reservations = useSelector(getReservations);
  let userReservations = reservations.filter(
    (reservation) => reservation.guestId === sessionUser.id
  );

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);


  if (sessionUser) {
    return (
      <ul className="reservations">
        {userReservations.map((reservation) => (
          <ReservationIndexItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </ul>
    );
  } else {
    return <ListingIndex />;
  }
};

export default ReservationIndex;
