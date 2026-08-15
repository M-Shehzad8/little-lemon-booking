// BookingPage.jsx
// PARENT component of BookingForm.
// It owns the `availableTimes` state (via useReducer) and passes it down
// to BookingForm as a prop. When the user picks a new date, BookingForm
// calls `dispatch` (through onDateChange) to refresh the available times.

import { useReducer, useState } from 'react';
import BookingForm from './BookingForm';
import { initializeTimes, updateTimes, submitAPI } from '../utils/BookingAPI';
import './BookingPage.css';

export default function BookingPage() {
  // availableTimes is managed HERE, in the parent.
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);
  const [confirmed, setConfirmed] = useState(null);

  // Called by BookingForm when the date input changes.
  function handleDateChange(date) {
    dispatch({ type: 'UPDATE_TIMES', payload: date });
  }

  // Called by BookingForm when the (valid) form is submitted.
  async function handleSubmit(formData) {
    const success = await submitAPI(formData);
    if (success) {
      setConfirmed(formData);
    }
  }

  return (
    <main className="booking-page" id="booking">
      <section className="booking-page__intro">
        <h1>Book a table</h1>
        <p>
          Reserve your seat at Little Lemon. We&apos;ll confirm your booking
          instantly.
        </p>
      </section>

      {confirmed ? (
        <section className="booking-page__confirm" aria-live="polite">
          <h2>Reservation confirmed!</h2>
          <p>
            Thank you, <strong>{confirmed.name}</strong>. We&apos;ve reserved a
            table for <strong>{confirmed.guests}</strong>{' '}
            {confirmed.guests === 1 ? 'guest' : 'guests'} on{' '}
            <strong>{confirmed.date}</strong> at{' '}
            <strong>{confirmed.time}</strong> for your{' '}
            <strong>{confirmed.occasion}</strong> celebration.
          </p>
          <p>A confirmation has been sent to {confirmed.email}.</p>
          <button
            type="button"
            className="booking-page__again"
            onClick={() => setConfirmed(null)}
          >
            Make another booking
          </button>
        </section>
      ) : (
        <BookingForm
          availableTimes={availableTimes}
          onDateChange={handleDateChange}
          onSubmit={handleSubmit}
        />
      )}
    </main>
  );
}
