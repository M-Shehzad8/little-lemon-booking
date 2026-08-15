// BookingForm.test.jsx
// Unit tests for the BookingForm component: rendering, validation,
// and the parent/child state relationship.
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BookingForm from './BookingForm';

const availableTimes = ['17:00', '18:00', '19:00'];

function renderForm(props = {}) {
  const onDateChange = props.onDateChange || vi.fn();
  const onSubmit = props.onSubmit || vi.fn();
  render(
    <BookingForm
      availableTimes={availableTimes}
      onDateChange={onDateChange}
      onSubmit={onSubmit}
    />
  );
  return { onDateChange, onSubmit };
}

describe('BookingForm rendering', () => {
  test('renders all required fields', () => {
    renderForm();
    expect(screen.getByLabelText(/date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();
  });

  test('renders available times passed from the parent', () => {
    renderForm();
    availableTimes.forEach((t) => {
      expect(screen.getByRole('option', { name: t })).toBeInTheDocument();
    });
  });
});

describe('BookingForm validation', () => {
  test('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm();
    await user.click(screen.getByRole('button', { name: /reserve a table/i }));
    expect(screen.getByText(/please select a date/i)).toBeInTheDocument();
    expect(screen.getByText(/please select a time/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter your email/i)).toBeInTheDocument();
    expect(screen.getByText(/please select an occasion/i)).toBeInTheDocument();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  test('calls onSubmit with valid data', async () => {
    const user = userEvent.setup();
    const { onSubmit } = renderForm();

    const future = new Date();
    future.setDate(future.getDate() + 1);
    const iso = future.toISOString().split('T')[0];

    await user.type(screen.getByLabelText(/date/i), iso);
    await user.selectOptions(screen.getByLabelText(/time/i), '18:00');
    await user.clear(screen.getByLabelText(/number of guests/i));
    await user.type(screen.getByLabelText(/number of guests/i), '3');
    await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
    await user.type(screen.getByLabelText(/email/i), 'jane@example.com');
    await user.selectOptions(screen.getByLabelText(/occasion/i), 'Birthday');

    await user.click(screen.getByRole('button', { name: /reserve a table/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      date: iso,
      time: '18:00',
      guests: 3,
      name: 'Jane Doe',
      email: 'jane@example.com',
      occasion: 'Birthday',
    });
  });

  test('notifies parent when date changes', async () => {
    const user = userEvent.setup();
    const { onDateChange } = renderForm();

    const future = new Date();
    future.setDate(future.getDate() + 2);
    const iso = future.toISOString().split('T')[0];

    await user.type(screen.getByLabelText(/date/i), iso);
    expect(onDateChange).toHaveBeenCalled();
  });
});
