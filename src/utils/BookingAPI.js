// BookingAPI.js
// Mock API for the Little Lemon booking system.
// In a real app these would be network calls; here they are simulated
// so the app runs without a backend.

// Deterministic pseudo-random generator so results are stable per date.
function seededRandom(seed) {
  const m = 2 ** 35 - 31;
  const a = 185852;
  let state = seed % m;
  return () => {
    state = (state * a) % m;
    return state / m;
  };
}

/**
 * fetchAPI(date) -> Promise<string[]>
 * Returns a list of available booking times for the given date.
 * @param {Date} date
 * @returns {Promise<string[]>}
 */
export function fetchAPI(date) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const result = [];
      const random = seededRandom(
        date.getDate() + date.getMonth() + date.getFullYear()
      );
      const baseTimes = [
        '17:00', '17:30', '18:00', '18:30', '19:00',
        '19:30', '20:00', '20:30', '21:00', '21:30',
      ];
      baseTimes.forEach((time) => {
        // Randomly include each time slot.
        if (random() < 0.7) result.push(time);
      });
      // Guarantee at least one slot so the form is never empty.
      if (result.length === 0) result.push('18:00');
      resolve(result);
    }, 100);
  });
}

/**
 * submitAPI(formData) -> Promise<boolean>
 * Simulates submitting a booking. Always succeeds in this mock.
 * @param {object} formData
 * @returns {Promise<boolean>}
 */
export function submitAPI(formData) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 100);
  });
}

/**
 * initializeTimes() -> string[]
 * Returns the default available times shown on first render.
 */
export function initializeTimes() {
  return ['17:00', '18:00', '19:00', '20:00', '21:00'];
}

/**
 * updateTimes(state, action) -> string[]
 * Reducer used by the parent BookingPage to refresh times when the
 * date changes. `action.payload` is the new Date selected by the user.
 */
export function updateTimes(state, action) {
  if (action.type === 'UPDATE_TIMES') {
    // Synchronously derive from the date using the same logic as fetchAPI
    // (without the async wrapper) so the reducer stays pure.
    const date = action.payload;
    const random = seededRandom(
      date.getDate() + date.getMonth() + date.getFullYear()
    );
    const baseTimes = [
      '17:00', '17:30', '18:00', '18:30', '19:00',
      '19:30', '20:00', '20:30', '21:00', '21:30',
    ];
    const result = baseTimes.filter(() => random() < 0.7);
    return result.length ? result : ['18:00'];
  }
  return state;
}
