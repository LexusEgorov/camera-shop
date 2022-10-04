import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { AppRoute } from '../../const';
import Layout from '../../pages/layout/layout';

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path={AppRoute.Root} element={<Layout />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
