// validate.js
// Pure client-side validation functions for the booking form.
// Keeping them pure makes them trivially unit-testable.

/**
 * Validate a single booking field.
 * @param {string} name - field name
 * @param {string|number} value - field value
 * @returns {string} error message, or '' when valid
 */
export function validateField(name, value) {
  switch (name) {
    case 'date': {
      if (!value) return 'Please select a date.';
      const chosen = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (Number.isNaN(chosen.getTime())) return 'Please enter a valid date.';
      if (chosen < today) return 'Date cannot be in the past.';
      return '';
    }
    case 'time': {
      if (!value) return 'Please select a time.';
      return '';
    }
    case 'guests': {
      // Treat empty string / null / undefined as "missing", but allow 0
      // to fall through to the "at least 1" check below.
      if (value === '' || value === null || value === undefined)
        return 'Please enter the number of guests.';
      const n = Number(value);
      if (!Number.isInteger(n)) return 'Guests must be a whole number.';
      if (n < 1) return 'At least 1 guest is required.';
      if (n > 10) return 'For parties larger than 10, please call us.';
      return '';
    }
    case 'name': {
      if (!value || value.trim().length === 0)
        return 'Please enter your name.';
      if (value.trim().length < 2)
        return 'Name must be at least 2 characters.';
      return '';
    }
    case 'email': {
      if (!value) return 'Please enter your email.';
      // Simple, robust email pattern.
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) return 'Please enter a valid email.';
      return '';
    }
    case 'occasion': {
      if (!value) return 'Please select an occasion.';
      return '';
    }
    default:
      return '';
  }
}

/**
 * Validate the entire form object.
 * @param {object} values - { date, time, guests, name, email, occasion }
 * @returns {object} map of field -> error message (only invalid fields)
 */
export function validateForm(values) {
  const errors = {};
  const fields = ['date', 'time', 'guests', 'name', 'email', 'occasion'];
  fields.forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

/**
 * Returns true when the form has no validation errors.
 */
export function isValidForm(values) {
  return Object.keys(validateForm(values)).length === 0;
}
