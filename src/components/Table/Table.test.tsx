import '@testing-library/jest-dom/extend-expect'; // For additional matchers

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { Table } from './Table';

const mockData = [
  {
    id: 1,
    name: 'Bulbasaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    stats: {
      HP: 45,
      Attack: 49,
      Defense: 49,
      'Sp. Attack': 65,
      'Sp. Defense': 65,
      Speed: 45,
    },
  },
  {
    id: 2,
    name: 'Ivysaur',
    image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    stats: {
      HP: 60,
      Attack: 62,
      Defense: 63,
      'Sp. Attack': 80,
      'Sp. Defense': 80,
      Speed: 60,
    },
  },
];

const mockColumns: string[] = ['id', 'name', 'type', 'hP'];

describe('Table Component', () => {
  test('Renders EmptyState when data is empty', () => {
    render(<Table data={[]} columns={mockColumns} />);
    expect(screen.getByText('No data to display')).toBeInTheDocument();
  });

  test('Renders the table with correct data and columns', () => {
    render(<Table data={mockData} columns={mockColumns} />);
    expect(screen.getByTestId('table-header')).toBeInTheDocument();
    expect(screen.queryAllByTestId('pokemon-row')).toHaveLength(mockData.length);
  });

  test('Sorts the data when header is clicked', () => {
    render(<Table data={mockData} columns={mockColumns} />);

    fireEvent.click(screen.getByText('HP'));

    const rows = screen.getAllByRole('row');
    screen.debug(rows);

    const rowData = rows.map((row) => {
      return row.textContent;
    });

    const isSortedAscending = rowData.every((value, index) => {
      if (index === 0) return true; // Skip the header row

      const currentValue = rowData[index];
      const nextValue = rowData[index + 1];
      return currentValue.localeCompare(nextValue) <= 0;
    });

    expect(isSortedAscending).toBe(true);
  });

  test('Changes sort direction when same header is clicked twice', () => {
    render(<Table data={mockData} columns={mockColumns} />);

    fireEvent.click(screen.getByText('HP'));
    fireEvent.click(screen.getByText('HP'));

    const rows = screen.getAllByRole('row');

    const rowData = rows.map((row) => {
      return row.textContent;
    });

    const isSortedDescending = rowData.every((value, index) => {
      if (index === 0) return true; // Skip the header row
      if (index === rowData.length - 1) return true; // skip the last row

      const currentValue = rowData[index];
      const nextValue = rowData[index + 1];
      return nextValue.localeCompare(currentValue) <= 0;
    });

    expect(isSortedDescending).toBe(true);
  });
});
