import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Camera } from '../../types/types';
import AddToCartButton from './add-to-cart-button';

describe('Component: AddToCartButton', () => {
  it('should render correctly', () => {
    render(<AddToCartButton isAdded={false} currentCamera={undefined as unknown as Camera} openModal={jest.fn()} setCamera={jest.fn()}/>);

    expect(screen.getByTestId('add-to-cart-btn')).toBeInTheDocument();
  });

  it('should render correctly with isAdded', () => {
    render(
      <BrowserRouter>
        <AddToCartButton isAdded currentCamera={undefined as unknown as Camera} openModal={jest.fn()} setCamera={jest.fn()}/>
      </BrowserRouter>
    );

    expect(screen.getByTestId('add-to-cart-btn--added')).toBeInTheDocument();
  });

  it('should setCamera, openModal when user click to button', () => {
    const fakeOpenModal = jest.fn();
    const fakeSetCamera = jest.fn();

    render(
      <AddToCartButton isAdded={false} currentCamera={undefined as unknown as Camera} openModal={fakeOpenModal} setCamera={fakeSetCamera}/>
    );

    const button = screen.getByTestId('add-to-cart-btn');

    fireEvent.click(button);

    expect(fakeOpenModal).toHaveBeenCalled();
    expect(fakeSetCamera).toHaveBeenCalled();
  });
});
