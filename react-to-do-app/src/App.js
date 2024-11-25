import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./common/Header";
import TodoListPage from './component/TodoListPage';

function App() {
  return (
    <Router> 
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<TodoListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
