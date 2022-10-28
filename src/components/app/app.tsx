import { useEffect } from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import Layout from '../../pages/layout/layout';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';
import { getIsServerError } from '../../store/app-process/selectors';
import { toast } from 'react-toastify';

function App(): JSX.Element {
  const isError = useAppSelector(getIsServerError);

  useEffect(() => {
    if(isError){
      toast.dismiss();
      toast.error('Данные не были загружены!');
    }
  }, [isError]);

  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route path={AppRoute.Catalog} element={<Catalog />}/>
          <Route path={AppRoute.Product} element={<Product />} />
        </Route>
        <Route path={AppRoute.AnyPage} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
