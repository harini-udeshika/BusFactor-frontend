# Bus Factor Frontend

This project is the frontend application for the Bus Factor analysis tool. It is built using React and provides a user-friendly interface for visualizing data such as code contributions, task completion, and repository insights.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js** (v16 or later) - [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js)

## Getting Started

Follow these steps to set up and run the project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/harini-udeshika/BusFactor-frontend.git
cd harini-udeshika-busfactor-frontend
```


### 2. Install Dependencies
Install the required packages using npm:
```bash
npm install
```

### 3. Start the Development Server
Run the following command to start the development server:
```bash
npm start
```
This will start the React app and open it in your default web browser. The app will be accessible at `http://localhost:3000/`.

### 4. Run Tests (Optional)
To run the test suite:
```bash
npm test
```

### 5. Build for Production (Optional)
To create a production build of the application:
```bash
npm run build
```
The optimized build will be located in the `build/` directory.

## Project Structure
The project is organized into the following directories:

- **`public/`**: Contains static assets like `index.html`, `manifest.json`, and `robots.txt`.
- **`src/`**: Contains the source code of the application.
  - **`Components/`**: Reusable components, each with their own styles.
    - **`GraphsDisplay/`**: Displays graphical data.
    - **`Navbar/`**: The navigation bar component.
    - **`RepoItem/`**: Displays repository information.
    - **`SearchBar/`**: The search bar component.
    - **`SearchResultsList/`**: Displays search results.
    - **`TreeMap/`**: Component for tree map visualization.
  - **`Global/`**: Contains the global state management provider.
  - **`Views/`**: Contains the main views of the application.
    - **`Graphs.jsx`**: View for displaying graphs.
    - **`Home.jsx`**: Home view of the application.
    - **`CompletedTasks/`**: Displays completed tasks.
    - **`FileContributions/`**: Displays file contribution data.

## Additional Notes
- **Development Tools**: Ensure your IDE/editor supports JavaScript/React for the best development experience.

## Troubleshooting
If you encounter issues:
1. Ensure Node.js and npm are installed correctly.
2. Delete the `node_modules` folder and reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```
3. Check for error messages in the terminal or browser console.


