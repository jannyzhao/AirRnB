import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReservation } from "../../store/reservations";
import { fetchReservation, getReservation } from "../../store/reservations";
import "./ReservationIndex.css";
import { getListing, fetchListing } from "../../store/listings";

export default function ReservationIndexItem({ reservation }) {
  const dispatch = useDispatch();
  const listingId = reservation.listingId;
  const listing = useSelector(getListing(listingId));

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  console.log("Fetching listing", listingId);

  return (
    <>
      {listing && (
        <div>
          <h1>{listing.title}</h1>
          <p>{listing.address}</p>
          <p>
            {listing.city}, {listing.state}
          </p>
          <p>Total Cost: ${listing.cost}/night</p>
        </div>
      )}
      <button>
        <Link to={`/listings/${listingId}`}>Edit Listing</Link>
      </button>
      <button onClick={() => dispatch(deleteReservation(reservation.id))}>
        Cancel Reservation
      </button>
    </>
  );
}
