import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getListing, fetchListing } from "../../store/listings";
import "./ListingShow.css";

export default function ListingShow() {
    const dispatch = useDispatch();
    const { listingId } = useParams();
    const listing = useSelector(getListing(listingId));

    useEffect(() => {
        dispatch(fetchListing(listingId));
    }, [dispatch, listingId])

    console.log(listingId)
    console.log(listing)
    return (
        <>
            {listing && (
                <ul className="listingshow">
                    <h1>{listing.title}</h1>
                    <p>{listing.body}</p>
                    <p>{listing.city}</p>
                </ul>
            )}
        </>
    );

}
