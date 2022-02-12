import {fireEvent, render, screen} from '@testing-library/react';
import React from 'react';
import Filter from '../components/Filter';

describe("Filter Component", () => {
  test('should render filter form', async () => {
    render(<Filter setFilters={() => {}} />);
    const filterForm = screen.getByTestId('filter-form');
    expect(filterForm).toBeInTheDocument();
  });

  test('should have form with correct fields', async () => {
    render(<Filter setFilters={() => {}} />);
    const filterForm = screen.getByTestId('filter-form');
    expect(filterForm).toHaveFormValues({
      ['start-date']: '',
      ['end-date']: '',
      status: ''
    });
  });

  test('should trigger setFilters on submit', async () => {
    const onSetFilters = jest.fn();
    render(<Filter setFilters={onSetFilters} />);
    const submit = screen.getByTestId('submit');
    fireEvent.click(submit);
    expect(onSetFilters).toHaveBeenCalled();
  });
})