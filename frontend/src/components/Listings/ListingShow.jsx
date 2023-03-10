import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListing, fetchListing } from "../../store/listings";
import "./ListingShow.css";
import placeholder1Img from "./sfhouse.png";
import ReservationForm from "../Reservations/ReservationForm";
import GoogleMaps from "../GoogleMaps/GoogleMaps";

export default function ListingShow() {
  const sfhouseImg = placeholder1Img;
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));

  const [showReservation, setShowReservation] = useState(false);

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  // const handleReservation = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   setShowReservation(true);
  // };

  return (
    <>
      {listing && (
        <ul className="listingshow">
          <h1>{listing.title}</h1>
          <li>
            {"Reviews Placeholder "} • {listing.city}, {listing.state}, United States
          </li>
          <img src={sfhouseImg} alt="placeholder1" className="img" />
          <p>Entire home hosted by Janny</p>
          <p>{listing.description}</p>
          <p>{listing.numBaths} guests</p>
          <div className="reservation-form-container">
            <ReservationForm />
          </div>
          <div className="maps-container">
            <GoogleMaps />
          </div>
        </ul>
      )}
    </>
  );
}
