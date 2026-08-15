// validate.test.js
// Unit tests for the pure validation functions.
import { validateField, validateForm, isValidForm } from './validate';

describe('validateField', () => {
  test('date: empty is invalid', () => {
    expect(validateField('date', '')).toBe('Please select a date.');
  });

  test('date: past date is invalid', () => {
    const past = new Date();
    past.setDate(past.getDate() - 1);
    const iso = past.toISOString().split('T')[0];
    expect(validateField('date', iso)).toBe('Date cannot be in the past.');
  });

  test('date: today is valid', () => {
    const today = new Date().toISOString().split('T')[0];
    expect(validateField('date', today)).toBe('');
  });

  test('time: empty is invalid', () => {
    expect(validateField('time', '')).toBe('Please select a time.');
  });

  test('time: value is valid', () => {
    expect(validateField('time', '18:00')).toBe('');
  });

  test('guests: below 1 is invalid', () => {
    expect(validateField('guests', 0)).toBe('At least 1 guest is required.');
  });

  test('guests: above 10 is invalid', () => {
    expect(validateField('guests', 11)).toBe('For parties larger than 10, please call us.');
  });

  test('guests: non-integer is invalid', () => {
    expect(validateField('guests', 2.5)).toBe('Guests must be a whole number.');
  });

  test('guests: valid number', () => {
    expect(validateField('guests', 4)).toBe('');
  });

  test('name: too short is invalid', () => {
    expect(validateField('name', 'A')).toBe('Name must be at least 2 characters.');
  });

  test('name: valid', () => {
    expect(validateField('name', 'Jane Doe')).toBe('');
  });

  test('email: invalid format', () => {
    expect(validateField('email', 'not-an-email')).toBe('Please enter a valid email.');
  });

  test('email: valid', () => {
    expect(validateField('email', 'jane@example.com')).toBe('');
  });

  test('occasion: empty is invalid', () => {
    expect(validateField('occasion', '')).toBe('Please select an occasion.');
  });
});

describe('validateForm / isValidForm', () => {
  const valid = {
    date: new Date().toISOString().split('T')[0],
    time: '18:00',
    guests: 2,
    name: 'Jane Doe',
    email: 'jane@example.com',
    occasion: 'Birthday',
  };

  test('valid form has no errors', () => {
    expect(validateForm(valid)).toEqual({});
    expect(isValidForm(valid)).toBe(true);
  });

  test('invalid form collects all errors', () => {
    const bad = { date: '', time: '', guests: 0, name: '', email: 'x', occasion: '' };
    const errors = validateForm(bad);
    expect(Object.keys(errors).length).toBe(6);
    expect(isValidForm(bad)).toBe(false);
  });
});
