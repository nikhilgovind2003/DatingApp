# Project Structure

This project is organized to maintain a clean and efficient structure, allowing for easy scalability and maintainability.

## Folder Structure

### Public Folder

- **public/images/**: This folder stores all the static image assets used across the project.

### Src Folder

- **components/**: This folder contains all the reusable components used throughout the application.
  - **layout/**: Contains layout-related components such as `Navbar`, `Sidebar`, and others that are essential for the overall structure of the application.

- **You may add a new folder inside the component if needed.**

- **pages/**: This folder contains the main pages of the application.
  - `HomePage.jsx`: The homepage of the application.
  - `AboutPage.jsx`: A page that provides information about the application.

- **datas/**: This folder holds all the dummy data used within the application.
  - `usersData.js`: Contains mock user details.
  - `buttonText.js`: Holds text strings used in buttons and other UI elements.

### Routing

- **App.jsx**: The main entry point for the React application where routing is set up using `react-router-dom`. Here's an example of how routing is configured:

```jsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
