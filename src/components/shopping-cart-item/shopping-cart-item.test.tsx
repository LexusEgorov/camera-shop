import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';
import * as shoppingCartActions from '../../store/shopping-cart-data/shopping-cart-data';
import ShoppingCartItem from './shopping-cart-item';
import { FISH_PRODUCTS } from '../../fish/fish';

const fakeProduct = FISH_PRODUCTS[0];

const mockStore = configureMockStore();

const fakeStore = mockStore({
  [NameSpace.ShoppingCartData]: {
    products: [
      {
        camera: fakeProduct,
        count: 2,
      }
    ]
  }
});

const fakeApp = (
  <Provider store={fakeStore}>
    <ShoppingCartItem product={fakeProduct} openModal={jest.fn} setCamera={jest.fn()}/>
  </Provider>
);

describe('Component: ShoppingCartItem', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('shopping-cart-item')).toBeInTheDocument();
  });

  it('should dispatch updateProductCount when 0 < count < 99', () => {
    const fakeUpdateProductCount = jest.spyOn(shoppingCartActions, 'updateProductCount');
    render(fakeApp);

    const countInput : HTMLInputElement = screen.getByTestId('count-input');

    fireEvent.input(countInput, {
      target: {value: '5'}
    });
    fireEvent.blur(countInput);

    expect(fakeUpdateProductCount).toHaveBeenCalledWith({count: 5, id: 1});
  });

  it('should dispatch updateProductCount with 1 when count < 1', () => {
    const fakeUpdateProductCount = jest.spyOn(shoppingCartActions, 'updateProductCount');
    render(fakeApp);

    const countInput : HTMLInputElement = screen.getByTestId('count-input');

    fireEvent.input(countInput, {
      target: {value: '0'}
    });
    fireEvent.blur(countInput);

    expect(fakeUpdateProductCount).toHaveBeenCalledWith({count: 1, id: 1});
  });

  it('should dispatch updateProductCount with 99 when count > 99', () => {
    const fakeUpdateProductCount = jest.spyOn(shoppingCartActions, 'updateProductCount');
    render(fakeApp);

    const countInput : HTMLInputElement = screen.getByTestId('count-input');

    fireEvent.input(countInput, {
      target: {value: '100'}
    });
    fireEvent.blur(countInput);

    expect(fakeUpdateProductCount).toHaveBeenCalledWith({count: 99, id: 1});
  });

  it('should dispatch updateProductCount with count - 1 when click to decrement', () => {
    const fakeUpdateProductCount = jest.spyOn(shoppingCartActions, 'updateProductCount');
    render(fakeApp);

    const countDecrement = screen.getByTestId('count-decrement');

    fireEvent.click(countDecrement);

    expect(fakeUpdateProductCount).toHaveBeenCalledWith({count: 1, id: 1});
  });

  it('should dispatch updateProductCount with count + 1 when click to increment', () => {
    const fakeUpdateProductCount = jest.spyOn(shoppingCartActions, 'updateProductCount');
    render(fakeApp);

    const countIncrement = screen.getByTestId('count-increment');

    fireEvent.click(countIncrement);

    expect(fakeUpdateProductCount).toHaveBeenCalledWith({count: 3, id: 1});
  });

  it('should call openModal(true), setCamera(fakeCamera) when click to delete', () => {
    const fakeOpenModal = jest.fn();
    const fakeSetCamera = jest.fn();
    render(
      <Provider store={fakeStore}>
        <ShoppingCartItem product={fakeProduct} openModal={fakeOpenModal} setCamera={fakeSetCamera} />
      </Provider>
    );

    const deleteBtn = screen.getByTestId('delete-btn');

    fireEvent.click(deleteBtn);

    expect(fakeOpenModal).toHaveBeenCalledWith(true);
    expect(fakeSetCamera).toHaveBeenCalledWith(fakeProduct);
  });
});
