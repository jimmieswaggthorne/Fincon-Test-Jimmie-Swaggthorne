import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import QuestionItem from "./QuestionItem";
import { useEffect, useMemo, useState } from "react";
import { submitQuiz } from "../../services/FormServices";
import { resetForm } from "../../formSlice";

const Questions = () => {
  const { questions } = useSelector((state: RootState) => state.form);
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const allQuestionsAnswered = useMemo(() => {
    let allAnswered = false;
    if (questions && questions.length > 0) {
      allAnswered = questions.every(q => q.selectedAnswer !== '');
    }
    return allAnswered;

  }, [questions])

  useEffect(() => {
    setSubmitted(false);
  }, [])

  const submissionResponse = useMemo(() => {
    if (submitted && questions?.length) {
      let correctAnswers = questions.filter(q => q.selectedAnswer === q.correct_answer).length;
      if (correctAnswers === questions.length) {
        return <div className="p-3 card bg-success text-white">Congratulations! You answered all questions correctly.</div>
      }
      else return <div className="p-3 card bg-danger text-white">You answered {correctAnswers} out of {questions.length} questions correctly.</div>
    }
    else {
      return null
    }
  }, [submitted])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    submitQuiz(questions)
      .then(res => {
        setSubmitted(true);
      })
      .catch(err => {
        console.log("Error submitting quiz:", err);
      })
  }

  const handleRestart = (e: any) => {
    e.preventDefault();
    dispatch(resetForm())

  }
  return (
    <div className="p-3">
      <div className="row d-flex g-3 justify-content-center">
        {questions && questions.map((question, index) => (
          <QuestionItem question={question} key={index} index={index} submitted={submitted} />))
        }
        {submissionResponse}
        {allQuestionsAnswered &&
          <div className="col-12 text-end">
            {submitted ? <button className="btn btn-secondary" onClick={handleRestart}>Create a new quiz</button> :
              <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>}
          </div>}
      </div>
    </div>
  )
}

export default Questions;