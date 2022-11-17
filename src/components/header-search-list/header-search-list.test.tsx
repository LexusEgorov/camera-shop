import { render, screen } from '@testing-library/react';
import HeaderSearchList from './header-search-list';

const fakeApp = (<HeaderSearchList searchedCameras={[]} resetSearch={jest.fn()}/>);

describe('Component: HeaderSearchList', () => {
  it('should render correctly', () => {
    render(fakeApp);

    expect(screen.getByTestId('header-search-list')).toBeInTheDocument();
  });
});
