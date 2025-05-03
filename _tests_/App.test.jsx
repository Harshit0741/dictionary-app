import { fireEvent, render, waitFor } from '@testing-library/react-native';
import React from 'react';
import App from '../app/index';


describe('Dictionary App', () => {
  it('renders input and button', () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    expect(getByPlaceholderText('Enter a term')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
    global.__TEST__ = true;
  });

  it('shows loading indicator on submit', async () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<App />);
    fireEvent.changeText(getByPlaceholderText('Enter a term'), 'test');
    fireEvent.press(getByText('Submit'));

    await waitFor(() => {
      expect(getByTestId('loading')).toBeTruthy();
    });
  });
});
