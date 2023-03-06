import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReservations, getReservations } from "../../store/reservations";
import ReservationIndexItem from "./ReservationIndexItem";
import "./ReservationIndex.css";

const ReservationIndex = () => {
  const dispatch = useDispatch();
  const reservations = useSelector(getReservations);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  return (
    <>
      <ul className="reservations">
        {reservations.map((reservation) => (
          <ReservationIndexItem
            reservation={reservation}
            key={reservation.id}
          />
        ))}
      </ul>
    </>
  );
};

export default ReservationIndex;
