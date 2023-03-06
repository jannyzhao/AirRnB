import csrfFetch from "./csrf";

//ACTION CONSTANTS
export const RECEIVE_RESERVATIONS = 'reservations/RECEIVE_RESERVATIONS';
export const RECEIVE_RESERVATION = 'reservations/RECEIVE_RESERVATION';
export const REMOVE_RESERVATION = 'reservations/REMOVE_RESERVATION';

const receiveReservations = (reservations) => {
    return {
        type: RECEIVE_RESERVATIONS,
        reservations
    }
}

const receiveReservation = (reservation) => {
    return {
        type: RECEIVE_RESERVATION,
        reservation
    }
}

const removeReservation = (reservationId) => {
    return {
        type: REMOVE_RESERVATION,
        reservationId
    }
}

export const getReservations = (state) => (
    state.reservations ? Object.values(state.reservations) : []
)

export const getReservation = (reservationId) => (state) => (
    state.reservations ? state.reservations[reservationId] : null
)

export const fetchReservations = () => async (dispatch) => {
    const response = await csrfFetch('/api/reservations');

    if (response.ok) {
        const reservations = await response.json();
        dispatch(receiveReservations(reservations))
    }
}

export const fetchReservation = (reservationId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`);

    if (response.ok) {
        const reservation = await response.json();
        dispatch(receiveReservation(reservation));
    }
}

export const createReservation = (reservation) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(reservation)
    })

    if (response.ok) {
        const reservation = await response.json();
        dispatch(receive_reservation(reservation));
    }
}

export const updateReservation = (reservation) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservation.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(reservation)
    })

    if (response.ok) {
        const reservation = await response.json();
        dispatch(receive_reservation(reservation));
    }
}

export const deleteReservation = (reservationId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reservations/${reservationId}`, {
        method: 'DELETE'
    })

    if (response.ok) {
        dispatch(remove_reservation(reservationId));
    }
}

 
const reservationsReducer = (state = {}, action) => {
    switch (action.type) {
        case RECEIVE_RESERVATIONS:
            return action.reservations;
        case RECEIVE_RESERVATION:
            const newState = { ...state };
            const reservation = action.reservation;
            newState[reservation.id] = reservation;
            return newState;
        default:
            return state;
    }
}

export default reservationsReducer;