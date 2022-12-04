import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { FISH_PRODUCTS } from '../../fish/fish';
import ModalDeleteItem from './modal-delete-item';
import * as shoppingCartActions from '../../store/shopping-cart-data/shopping-cart-data';

const mockStore = configureMockStore();

const fakeStore = mockStore();

const fakeCamera = FISH_PRODUCTS[0];

const fakeApp = (
  <Provider store={fakeStore}>
    <BrowserRouter>
      <ModalDeleteItem isOpened setIsOpened={jest.fn} camera={fakeCamera}/>
    </BrowserRouter>
  </Provider>
);

describe('Component: ModalDeleteItem', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('modal-delete-btn')).toBeInTheDocument();
  });

  it('should dispatch delete when click deleteBtn', () => {
    const fakeDelete = jest.spyOn(shoppingCartActions, 'deleteProduct');
    render(fakeApp);

    const deleteButton = screen.getByTestId('modal-delete-btn');
    fireEvent.click(deleteButton);

    expect(fakeDelete).toHaveBeenCalledWith(fakeCamera.id);
  });

  it('should setIsOpened(false), when click to continueShopping', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalDeleteItem isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    const continueShopping = screen.getByText('Продолжить покупки');
    fireEvent.click(continueShopping);

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });

  it('should setIsOpened(false), when keyDown(esc)', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore}>
        <BrowserRouter>
          <ModalDeleteItem isOpened setIsOpened={fakeSetIsOpened} camera={fakeCamera}/>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.keyDown(global.document, {
      key: 'Escape'
    });

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });
});
