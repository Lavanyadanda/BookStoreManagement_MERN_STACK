import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateBook from './pages/CreateBooks';
import ShowBook from './pages/ShowBook';
import EditBook from './pages/EditBook';
import DeleteBook from './pages/DeleteBook';

const App = () => {
  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl p-8">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/books/create' element={<CreateBook />} />
      <Route path='/books/details/:id' element={<ShowBook />} />
      <Route path='/books/edit/:id' element={<EditBook />} />
      <Route path='/books/delete/:id' element={<DeleteBook />} />
    </Routes>
    </div>
    </div>
  );
};

export default App;