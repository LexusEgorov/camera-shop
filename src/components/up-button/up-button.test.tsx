import { fireEvent, render, screen } from '@testing-library/react';
import UpButton from './up-button';

describe('Component: UpButton', () => {
  it('should render correctly', () => {
    render(<UpButton />);
    const button = screen.getByTestId('up-button');
    global.scrollTo = jest.fn();
    expect(global.scrollTo).toBeCalledTimes(0);
    fireEvent.click(button);
    expect(global.scrollTo).toBeCalledTimes(1);
  });
});
