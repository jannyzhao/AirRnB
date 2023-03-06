import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListing, fetchListing } from "../../store/listings";
import "./ListingShow.css";
import placeholder1Img from "./sfhouse.png";


export default function ListingShow() {
  const sfhouseImg = placeholder1Img;
  const dispatch = useDispatch();
  const { listingId } = useParams();
  const listing = useSelector(getListing(listingId));

  useEffect(() => {
    dispatch(fetchListing(listingId));
  }, [dispatch, listingId]);

  console.log(listingId);
  console.log(listing);
  return (
    <>
      {listing && (
        <ul className="listingshow">
          <div>
            <img src={sfhouseImg} alt="placeholder1" className="img" />
          </div>
          <h1>{listing.title}</h1>
          <p>{listing.description}</p>
          <p>{listing.city}</p>
          <br></br>
          {/* <button className="editButton">Edit Reservation</button>
          <button>Cancel Reservation</button> */}
        </ul>
      )}
    </>
  );
}
