import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '@/pages/index';
import '@testing-library/jest-dom';

describe('Home page', () => {
  it('renders the heading and input field', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { name: /Generate APA Reference/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/https:\/\/youtube.com\//i)).toBeInTheDocument();
  });
});
