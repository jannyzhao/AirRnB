import csrfFetch from "./csrf";

//ACTION CONSTANTS
export const RECEIVE_LISTINGS = "listings/RECEIVE_LISTINGS";
export const RECEIVE_LISTING = "listings/RECEIVE_LISTING";

const receiveListings = (listings) => {
  return {
    type: RECEIVE_LISTINGS,
    listings,
  };
};

const receiveListing = (listing) => {
  return {
    type: RECEIVE_LISTING,
    listing,
  };
};

export const getListings = (state) =>
  state.listings ? Object.values(state.listings) : [];

export const getListing = (listingId) => (state) =>
  state.listings ? state.listings[listingId] : null;

export const fetchListings = () => async (dispatch) => {
  const response = await csrfFetch("/api/listings");

  if (response.ok) {
    const listings = await response.json();
    dispatch(receiveListings(listings));
  }
}; 

export const fetchListing = (listingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/listings/${listingId}`);

  if (response.ok) {
    const listing = await response.json();
    dispatch(receiveListing(listing));
  }
};

const listingsReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_LISTINGS:
      return action.listings;
    case RECEIVE_LISTING:
      const newState = { ...state };
      const listing = action.listing;
      newState[listing.id] = listing;
      return newState;
    default:
      return state;
  }
};

export default listingsReducer;
