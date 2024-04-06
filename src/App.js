import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllProductsList from './component/AllProductsList';
import LoginPage from './component/LoginPage';

function App() {

  const router = createBrowserRouter([
    { path:"/", element:<LoginPage/> },
    { path:"/all-prodicts", element: <AllProductsList/> },


  ])

  return (
    <RouterProvider router={router}/>
  );
}

export default App;
