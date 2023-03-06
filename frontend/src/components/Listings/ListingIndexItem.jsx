import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./ListingIndex.css";
import placeholder1Img from "./sfhouse.png";
// import placeholder2Img from './bdhouse.png'
// import placeholderImg from './sfhouse.png'

export default function ListingIndexItem({ listing }) {
  const sfhouseImg = placeholder1Img;
  const dispatch = useDispatch();

  return (
    <>
      <Link to={`/listings/${listing.id}`} className="listItem">
        <div>
          <img src={sfhouseImg} alt="placeholder1" className="img" />
        </div>

        <ul>
          <li>
            {listing.city}, {listing.state}
          </li>
          <li>
            {listing.numGuests} guests • {listing.numBedrooms} bedrooms •{" "}
            {listing.numBeds} beds • {listing.numBaths} baths{" "}
          </li>
          <li>${listing.cost} per night</li>
        </ul>
      </Link>
    </>
  );
}
