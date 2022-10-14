import { NameSpace } from '../../const';
import { IsLoading, State } from '../../types/types';

export const getIsCamerasLoading = (state: State) : IsLoading => state[NameSpace.App].isCamerasLoading;

export const getIsCameraLoading = (state: State) : IsLoading => state[NameSpace.App].isCameraLoading;

export const getIsPromoLoading = (state: State) : IsLoading => state[NameSpace.App].isPromoLoading;

export const getIsSimilarLoading = (state: State) : IsLoading => state[NameSpace.App].isSimilarLoading;

export const getIsReviewsLoading = (state: State) : IsLoading => state[NameSpace.App].isReviewsLoading;