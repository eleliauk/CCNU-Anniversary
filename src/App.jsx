import './App.css'
import { useRoutes } from 'react-router-dom'
import router from './router'
import { useEffect, useState } from 'react';

function App() {
  return useRoutes(router);
}

export default App
