import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FilterBar from '.';
import { FILE_TYPE } from '../../../constants';

describe('FilterBar', () => {
  const mockHandleFileTypeChange = jest.fn();
  const mockHandlePublishedTypeChange = jest.fn();
  const mockSetStartDate = jest.fn();
  const mockSetEndDate = jest.fn();

  test('renders the component with props', () => {
    render(
      <FilterBar
        startDate="Start Date"
        endDate="End Date"
        fileType="File type"
        publishedType="Published Type"
        handleFileTypeChange={mockHandleFileTypeChange}
        handlePublishedTypeChange={mockHandlePublishedTypeChange}
        setStartDate={mockSetStartDate}
        setEndDate={mockSetEndDate}
      />
    );

  });

  test('triggers the handleFileTypeChange function on Dropdown change', () => {
    render(
      <FilterBar
        startDate="Start Date"
        endDate="End Date"
        fileType="File type"
        publishedType="Published Type"
        handleFileTypeChange={mockHandleFileTypeChange}
        handlePublishedTypeChange={mockHandlePublishedTypeChange}
        setStartDate={mockSetStartDate}
        setEndDate={mockSetEndDate}
      />
    );

    const fileTypeDropDown=screen.getByText(FILE_TYPE)

    fireEvent.mouseDown(fileTypeDropDown);
  });

});
