import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

test('renders learn react link', () => {
  const { getByText} = render(<BrowserRouter><App /></BrowserRouter>);
  const linkElement = getByText("Covid Mode");
  expect(linkElement).toBeInTheDocument();
});
