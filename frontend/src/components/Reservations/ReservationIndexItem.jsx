import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteReservation } from "../../store/reservations";
import { fetchReservation, getReservation } from "../../store/reservations";
import "./ReservationIndex.css";

export default function ReservationIndexItem({ reservation }) {
  const dispatch = useDispatch();
  const reservation = useSelector(getReservation);
}
