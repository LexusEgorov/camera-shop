import { createAPI } from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import { State } from '../types/types';
import { Action } from 'redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { FISH_PRODUCTS, FISH_PROMO, FISH_REVIEWS, FISH_REVIEW_POST } from '../fish/fish';
import { APIRoute, PAGINATION_OUTPUT_COUNT } from '../const';
import { fetchCameraAction, fetchCamerasAction, fetchPromoAction, fetchReviewsAction, fetchSimilarAction, sendReviewAction } from './api-actions';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const fakeCameras = FISH_PRODUCTS;
  const fakeCamera = FISH_PRODUCTS[0];
  const fakeReviews = FISH_REVIEWS;
  const fakeReview = FISH_REVIEWS[0];
  const fakeReviewPost = FISH_REVIEW_POST;
  const fakePromo = FISH_PROMO;

  const fakeId = 1;
  const fakePage = 2;

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch loadCameras when GET /cameras', async () => {
    mockAPI
      .onGet(APIRoute.Cameras, {
        params: {
          '_limit': PAGINATION_OUTPUT_COUNT,
          '_start': (fakePage - 1) * PAGINATION_OUTPUT_COUNT,
          '_sort': '',
          '_order': '',
        }
      })
      .reply(200, fakeCameras, {
        'x-total-count': fakeCameras.length
      });

    const store = mockStore();

    await store.dispatch(fetchCamerasAction({page: fakePage}));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCamerasAction.pending.type,
      fetchCamerasAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadCamera when GET /cameras/:id', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}${fakeId}`)
      .reply(200, fakeCamera);

    const store = mockStore();

    await store.dispatch(fetchCameraAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraAction.pending.type,
      fetchCameraAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadPromo when GET /promo', async () => {
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, fakePromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadSimilar when GET /cameras/:id/similar', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}${fakeId}${APIRoute.Similar}`)
      .reply(200, fakeCameras);

    const store = mockStore();

    await store.dispatch(fetchSimilarAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarAction.pending.type,
      fetchSimilarAction.fulfilled.type,
    ]);
  });

  it('should dispatch loadReviews when GET /cameras/:id/reviews', async () => {
    mockAPI
      .onGet(`${APIRoute.Cameras}${fakeId}${APIRoute.Reviews}`)
      .reply(200, fakeReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendReviews when POST /reviews', async () => {
    mockAPI
      .onPost(APIRoute.Reviews)
      .reply(200, fakeReview);

    const store = mockStore();

    await store.dispatch(sendReviewAction(fakeReviewPost));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendReviewAction.pending.type,
      sendReviewAction.fulfilled.type,
    ]);
  });
});
