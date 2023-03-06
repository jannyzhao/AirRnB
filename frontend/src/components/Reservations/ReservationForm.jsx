import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getReservation,
  fetchReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../../store/reservations";

export default function ReservationForm() {
  const { reservationId } = useParams();
  
}
