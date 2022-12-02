import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import publicRoutes from './routes';

import Defaultlayout from './components/Layout';

function App() {

  return (
    <Router>

      <div className='app'>
        <Routes>
          {
            publicRoutes.map((route, index) => {
              const Page = route.component
              return (
                <Route key={index} path={route.path} element={
                  <Defaultlayout> <Page /></Defaultlayout>
                }>
                </Route>
              )
            })
          }

        </Routes>
      </div>
    </Router>

  );
}

export default App;
