import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListing } from "../../store/listings";
import {
  getReservation,
  fetchReservation,
  updateReservation,
  deleteReservation,
} from "../../store/reservations";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
// import "react-dates/lib/css/_datepicker.css";
import "./DateRangePicker.css";
import "./ReservationForm.css";

export default function ReservationEditForm({ onClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { reservationId } = useParams();
  const {listingId } = useParams();
  const reservation = useSelector(getReservation(reservationId));
  const listing = useSelector(getListing(reservation.listingId));
  const [numGuests, setNumGuests] = useState(reservation.numGuests);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dates, setDates] = useState({
    startDate: reservation.checkIn,
    endDate: reservation.checkOut,
  });

  useEffect(() => {
    dispatch(fetchReservation(reservationId));
  }, [dispatch, reservationId]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (numGuests < listing.numGuests) {
      setNumGuests(numGuests + 1);
    }
  };

  const handleSubtract = (e) => {
    e.preventDefault();
    if (numGuests > 1) {
      setNumGuests(numGuests - 1);
    }
  };

  const sessionUser = useSelector((state) => state.session.user);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dates.startDate || !dates.endDate) {
      alert("Please select a check-in and check-out date for your stay.");
      return;
    }
    if (numGuests <= 0) {
      alert("Please enter at least 1 guest for your stay.");
      return;
    }

    const reservationData = {
      id: reservation.id,
      listing_id: listing.id,
      guest_id: sessionUser.id,
      num_guests: numGuests,
      check_in: dates.startDate,
      check_out: dates.endDate,
    };

    console.log(reservationData);

    dispatch(updateReservation(reservationData))
      .then(() => {
        // alert("Reservation updated successfully!");
        setDates({ startDate: null, endDate: null });
        setNumGuests(1);
        history.push("/reservations");
      })
      .catch((err) => {
        alert(`Failed to update reservation: ${err.message}`);
      });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to cancel this reservation?")) {
      dispatch(deleteReservation(reservation.id))
        .then(() => {
          // alert("Reservation canceled successfully!");
          onClose();
          history.push("/reservations");
        })
        .catch((err) => {
          alert(`Failed to cancel reservation: ${err.message}`);
        });
    }
  };

  return (
    <div className="reservation-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="checkin">SELECT DATES</label>
          <DateRangePicker
            startDate={dates.startDate}
            startDateId="checkin"
            endDate={dates.endDate}
            // endDate={dates.endDate}
            endDateId="checkout"
            onDatesChange={({ startDate, endDate }) =>
              setDates({ startDate, endDate })
            }
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            numberOfMonths={1}
            daySize={32}
            // hideKeyboardShortcutsPanel={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numGuests">GUESTS</label>
          <div className="input-group">
            <button className="btn" onClick={handleSubtract}>
              -
            </button>
            <input
              type="number"
              name="numGuests"
              value={numGuests}
              onChange={(e) => setNumGuests(Number(e.target.value))}
            />
            <button className="btn" onClick={handleAdd}>
              +
            </button>
          </div>
        </div>

        <div className="form-group">
          <button type="submit" className="btn">
            Reserve
          </button>
        </div>
      </form>
    </div>
  );
}
