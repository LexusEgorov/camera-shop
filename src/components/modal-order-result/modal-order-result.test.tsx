import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { NameSpace, OrderStatus } from '../../const';
import * as appProcessActions from '../../store/app-process/app-process';
import ModalOrderResult from '../modal-order-result/modal-order-result';

const mockStore = configureMockStore();

const fakeStore = (status: string) => mockStore({
  [NameSpace.App]: {
    orderStatus: status,
  }
});

const fakeApp = (
  <Provider store={fakeStore(OrderStatus.Accept)}>
    <BrowserRouter>
      <ModalOrderResult isOpened setIsOpened={jest.fn}/>
    </BrowserRouter>
  </Provider>
);

describe('Component: ModalDeleteItem', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByText('Спасибо за покупку')).toBeInTheDocument();
  });

  it('should setIsOpened(false), dispatch resetOrderStatuswhen click to continueShopping', () => {
    const fakeSetIsOpened = jest.fn();
    const fakeResetOrderStatus = jest.spyOn(appProcessActions, 'resetOrderStatus');
    render(
      <Provider store={fakeStore(OrderStatus.Accept)}>
        <BrowserRouter>
          <ModalOrderResult isOpened setIsOpened={fakeSetIsOpened}/>
        </BrowserRouter>
      </Provider>
    );

    const closeButton = screen.getByTestId('close-btn');
    fireEvent.click(closeButton);

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
    expect(fakeResetOrderStatus).toHaveBeenCalled();
  });

  it('should setIsOpened(false), when keyDown(esc)', () => {
    const fakeSetIsOpened = jest.fn();
    render(
      <Provider store={fakeStore(OrderStatus.Accept)}>
        <BrowserRouter>
          <ModalOrderResult isOpened setIsOpened={fakeSetIsOpened}/>
        </BrowserRouter>
      </Provider>
    );

    fireEvent.keyDown(global.document, {
      key: 'Escape'
    });

    expect(fakeSetIsOpened).toHaveBeenCalledWith(false);
  });
});

