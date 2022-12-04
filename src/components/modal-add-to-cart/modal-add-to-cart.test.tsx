import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FISH_PRODUCTS } from '../../fish/fish';
import * as shoppingCartActions from '../../store/shopping-cart-data/shopping-cart-data';
import ModalAddToCart from './modal-add-to-cart';

const mockStore = configureMockStore();

const fakeStore = mockStore();

const fakeCamera = FISH_PRODUCTS[0];

const fakeApp = (
  <Provider store={fakeStore}>
    <BrowserRouter>
      <ModalAddToCart isOpened setIsOpened={jest.fn} camera={fakeCamera}/>
    </BrowserRouter>
  </Provider>
);

describe('Component: ModalAddToCart', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Добавить товар в корзину')).toBeInTheDocument();
  });

  it('should dispatch addToCart, when click to addButton', () => {
    const fakeAddProduct = jest.spyOn(shoppingCartActions, 'addProduct');
    render(fakeApp);

    const addButton = screen.getByText('Добавить в корзину');
    fireEvent.click(addButton);

    expect(fakeAddProduct).toHaveBeenCalled();
  });

  it('should setIsOpened(false), when click to overlay', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalAddToCart isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    const overlay = screen.getByTestId('modal-container');
    fireEvent.click(overlay);

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });

  it('should setIsOpened(false), when click to continueShopping', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalAddToCart isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    const addButton = screen.getByText('Добавить в корзину');
    fireEvent.click(addButton);
    const continueShopping = screen.getByText('Продолжить покупки');
    fireEvent.click(continueShopping);

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });

  it('should setIsOpened(false), when keyDown(esc)', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalAddToCart isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.keyDown(global.document, {
      key: 'Escape'
    });

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });

  it('should setIsOpened(false), when click to close popup', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalAddToCart isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    const closePopup = screen.getByTestId('close-popup-btn');
    fireEvent.click(closePopup);

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });
});
