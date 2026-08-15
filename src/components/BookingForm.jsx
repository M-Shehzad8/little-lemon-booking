// BookingForm.jsx
// CHILD component of BookingPage.
// It receives `availableTimes` (state owned by the parent) and an
// `onDateChange` callback so the parent can refresh available times.
// It owns its own form field state + validation errors, and calls
// `onSubmit` (provided by the parent) when the form is valid.

import { useState } from 'react';
import { validateField } from '../utils/validate';
import './BookingForm.css';

const OCCASIONS = ['Birthday', 'Anniversary', 'Engagement', 'Business', 'Other'];

export default function BookingForm({ availableTimes, onDateChange, onSubmit }) {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    guests: 1,
    name: '',
    email: '',
    occasion: '',
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Update a single field, validate it, and clear/set its error.
  function handleChange(event) {
    const { name, value } = event.target;
    // Keep the guest count as a real number for submission.
    const nextValue = name === 'guests' ? (value === '' ? '' : Number(value)) : value;
    setFormData((prev) => ({ ...prev, [name]: nextValue }));

    // When the date changes, notify the parent so it can update times.
    if (name === 'date') {
      onDateChange(new Date(value));
    }

    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  // Mark a field as touched on blur so we only show errors after interaction.
  function handleBlur(event) {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Validate every field before submitting.
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    setTouched({
      date: true, time: true, guests: true,
      name: true, email: true, occasion: true,
    });

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
    }
  }

  // Helper to decide whether to show an error for a field.
  const showError = (field) => touched[field] && errors[field];

  return (
    <form className="booking-form" onSubmit={handleSubmit} noValidate>
      <div className="booking-form__row">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('date') ? 'true' : 'false'}
          aria-describedby={showError('date') ? 'date-error' : undefined}
        />
        {showError('date') && (
          <span className="booking-form__error" id="date-error" role="alert">
            {errors.date}
          </span>
        )}
      </div>

      <div className="booking-form__row">
        <label htmlFor="time">Time</label>
        <select
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('time') ? 'true' : 'false'}
          aria-describedby={showError('time') ? 'time-error' : undefined}
        >
          <option value="">Select a time</option>
          {availableTimes.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        {showError('time') && (
          <span className="booking-form__error" id="time-error" role="alert">
            {errors.time}
          </span>
        )}
      </div>

      <div className="booking-form__row">
        <label htmlFor="guests">Number of guests</label>
        <input
          type="number"
          id="guests"
          name="guests"
          min="1"
          max="10"
          value={formData.guests}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('guests') ? 'true' : 'false'}
          aria-describedby={showError('guests') ? 'guests-error' : undefined}
        />
        {showError('guests') && (
          <span className="booking-form__error" id="guests-error" role="alert">
            {errors.guests}
          </span>
        )}
      </div>

      <div className="booking-form__row">
        <label htmlFor="name">Full name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('name') ? 'true' : 'false'}
          aria-describedby={showError('name') ? 'name-error' : undefined}
        />
        {showError('name') && (
          <span className="booking-form__error" id="name-error" role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className="booking-form__row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="jane@example.com"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('email') ? 'true' : 'false'}
          aria-describedby={showError('email') ? 'email-error' : undefined}
        />
        {showError('email') && (
          <span className="booking-form__error" id="email-error" role="alert">
            {errors.email}
          </span>
        )}
      </div>

      <div className="booking-form__row">
        <label htmlFor="occasion">Occasion</label>
        <select
          id="occasion"
          name="occasion"
          value={formData.occasion}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={showError('occasion') ? 'true' : 'false'}
          aria-describedby={showError('occasion') ? 'occasion-error' : undefined}
        >
          <option value="">Select an occasion</option>
          {OCCASIONS.map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
        {showError('occasion') && (
          <span className="booking-form__error" id="occasion-error" role="alert">
            {errors.occasion}
          </span>
        )}
      </div>

      <button type="submit" className="booking-form__submit">
        Reserve a table
      </button>
    </form>
  );
}
