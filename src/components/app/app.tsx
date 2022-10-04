import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import Catalog from '../../pages/catalog/catalog';
import Layout from '../../pages/layout/layout';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
          <Route index element={<Catalog />}/>
          <Route path={AppRoute.Product} element={<Product />} />
        </Route>
        <Route path={AppRoute.AnyPage} element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
