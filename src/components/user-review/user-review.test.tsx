import { render, screen } from '@testing-library/react';
import { FISH_REVIEWS } from '../../fish/fish';
import UserReview from './user-review';

const fakeReview = FISH_REVIEWS[0];

describe('Component: UserReview', () => {
  it('should render correctly', () => {
    render(<UserReview reviewData={fakeReview}/>);

    expect(screen.getByText(fakeReview.userName)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.advantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.disadvantage)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.review)).toBeInTheDocument();
  });
});
