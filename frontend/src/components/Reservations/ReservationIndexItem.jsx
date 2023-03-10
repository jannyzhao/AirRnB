import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReservation, updateReservation } from "../../store/reservations";
import { fetchReservation, getReservation } from "../../store/reservations";
import "./ReservationIndex.css";
import { getListing, fetchListing } from "../../store/listings";
import image from "./bdhouse.png";
import { useState } from "react";
// import ReservationEditForm from "./ReservationEditForm";

export default function ReservationIndexItem({ reservation }) {
  const bdhouse = image;
  const dispatch = useDispatch();
  const listingId = reservation.listingId;
  const listing = useSelector(getListing(listingId));
  const [editReservationForm, setEditReservationForm] = useState(false);

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteReservation(reservation.id));
  };

  // const handleEdit = () => {
  //   setEditReservationForm(true);
  // };

  // const handleReservationUpdate = (updatedReservation) => {
  //   dispatch(updateReservation(updatedReservation));
  //   setEditReservationForm(false);
  // };

  return (
    <>
      {listing && (
        <div className="reservation-info">
          <img src={bdhouse} alt="placeholder" class="bdhouse" />
          <h1 className="title-header">{listing.title}</h1>
          <p>{listing.address}</p>
          <p>
            {listing.city}, {listing.state}
          </p>
          <p>Total Cost: ${listing.cost}/night</p>
        </div>
      )}
      <button>
        <Link to={`/listings/${listingId}`}>Edit Reservation</Link>
      </button>
      {/* <button onClick={handleEdit}>Edit Reservation</button> */}
      <button onClick={handleDelete}>Cancel Reservation</button>
      {/* {editReservationForm && (
        <ReservationEditForm
          reservation={reservation}
          onSubmit={handleReservationUpdate}
        />
      )} */}
    </>
  );
}
