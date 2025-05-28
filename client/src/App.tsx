import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';

import './App.css';
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from './categoriesSlice';
import { Submission } from './formSlice';
import QuizRequestForm from './components/Steps/QuizRequestForm';
import Questions from './components/Quiz/Questions';
import { getCategories } from './services/FormServices';


function App() {
  const form = useSelector((state: RootState) => state.form) as Submission;
  const dispatch = useDispatch();

  const fetchCategories = () => {
    dispatch(fetchCategoriesStart());
    getCategories()
      .then(res => {
        dispatch(fetchCategoriesSuccess(res.data.trivia_categories));
      })
      .catch(err => {
        dispatch(fetchCategoriesFailure('Error fetching categories'));
        console.error('Error fetching categories:', err);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);


  const renderStep = () => {
    switch (form.step) {
      case 1:
        return <QuizRequestForm />;
      case 2:
        return <Questions />;
      default:
        return <QuizRequestForm />
    }
  }

  return (
    <div className="container">
      <h2 className="my-4">Fincons Fullstack Form</h2>
      <form className="p-3 card">
        {renderStep()}
      </form>
    </div>
  );
}

export default App;
