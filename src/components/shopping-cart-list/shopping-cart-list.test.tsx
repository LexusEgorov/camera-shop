import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NameSpace } from '../../const';
import { FISH_PRODUCTS } from '../../fish/fish';
import ShoppingCartList from './shopping-cart-list';

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
    <ShoppingCartList openModal={jest.fn()} setCamera={jest.fn}/>
  </Provider>
);

describe('Component: ShoppingCartItem', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('shopping-cart-item')).toBeInTheDocument();
  });
});
