import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store.js';
import Home from './components/Home/Home.jsx';

// Define your routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children : [
      {
        path : "",
        element : <Home/>
      }
    ]
  },
  // Add more routes here if needed
]);

// Render the app
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
