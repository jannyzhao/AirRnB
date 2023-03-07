import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getListing } from "../../store/listings";
import {
  getReservation,
  fetchReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../store/reservations";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "./ReservationForm.css";
import { useHistory } from "react-router-dom";

export default function ReservationForm({ onClose }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));
  const [numGuests, setNumGuests] = useState(1);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dates, setDates] = useState({
    startDate: null,
    endDate: null,
  });

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

    const listingData = {
      listing_id: listing.id,
      guest_id: sessionUser.id,
      num_guests: numGuests,
      check_in: dates.startDate,
      check_out: dates.endDate,
    };

    console.log(listingData);

    dispatch(createReservation(listingData))
      .then(() => {
        // alert("Reservation created successfully!");
        setDates({ startDate: null, endDate: null });
        setNumGuests(1);
        onClose();
        history.push("/reservations");

      })
      .catch((err) => {
        alert(`Failed to create reservation: ${err.message}`);
      });
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
            endDateId="checkout"
            onDatesChange={({ startDate, endDate }) =>
              setDates({ startDate, endDate })
            }
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            numberOfMonths={1}
            daySize={32}
            hideKeyboardShortcutsPanel={true}
          />
        </div>

        <div className="form-group">
          <label htmlFor="numGuests">Guests</label>
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
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
