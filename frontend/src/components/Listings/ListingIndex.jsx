import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings, getListings } from "../../store/listings";
import ListingIndexItem from "./ListingIndexItem";
import "./ListingIndex.css";

const ListingIndex = () => {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);

  useEffect(() => {
    dispatch(fetchListings());
    
  }, [dispatch]);

  return (
    <ul className="listings">
      {listings.map((listing) => (
        <ListingIndexItem listing={listing} key={listing.id} />
      ))}
    </ul>
  );
};

export default ListingIndex;
