import clsx from "clsx";
import { Question, setAnswer, Submission } from "../../formSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { useEffect, useMemo, useState } from "react";
const he = require('he');
interface QuestionItemProps {
  question: Question;
  index: number;
  submitted?: boolean;
}


const QuestionItem = ({ question, index, submitted }: QuestionItemProps) => {
  const { questions } = useSelector((state: RootState) => state.form) as Submission;

  function shuffleArray(arr: string[]) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
  }

  const dispatch = useDispatch();

  const [displayAnswers, setDisplayAnswers] = useState<string[]>([]);

  useEffect(() => {

    setDisplayAnswers(shuffleArray([
      question.correct_answer,
      ...question.incorrect_answers
    ]));
    dispatch(setAnswer({ index, answer: '' })); // Reset answer when question changes
  }, [])

  const decoded = he.decode(question.question);

  const selectedAnswer = useMemo(() => {
    let answer = '';
    if (questions && questions.length > 0) {
      answer = questions[index].selectedAnswer || '';
    }
    return answer
  }, [questions, index])





  const answerClickHandler = (answer: string) => {
    if (selectedAnswer === answer) {
      dispatch(setAnswer({ index, answer: '' }));
    }
    else {
      dispatch(setAnswer({ index, answer }))
    }

  }

  const renderButtonClass = (answer: string) => {
    let buttonClass = 'btn'
    if (questions) {
      if (selectedAnswer === answer) {
        if (submitted) {
          if (answer === question.correct_answer) {
            buttonClass += ' btn-success';
          }
          else {
            buttonClass += ' btn-danger';
          }
        }
        else {
          buttonClass += ' btn-primary';
        }
      }
      else {
        if (submitted) {
          if (answer === question.correct_answer && selectedAnswer !== answer) {
            buttonClass += ' btn-success';
          }
          else {
            buttonClass += ' btn-outline-success';
          }
        }
        else {
          buttonClass += ' btn-outline-primary';
        }
      }
    }
    else {
      buttonClass += ' btn-outline-primary';
    }
    return buttonClass
  }
  return (
    <div className="col-12">
      <div className="d-flex flex-column justify-content-start align-items-start mb-2">
        <p>
          {decoded}
        </p>
        <div className="d-flex row g-3">
          {displayAnswers.map((answer, i) => {
            let buttonClass = renderButtonClass(answer)
            return (
              <div className="col-auto">
                <button key={i} className={buttonClass}
                  onClick={(e) => { e.preventDefault(); answerClickHandler(answer) }}
                >
                  {he.decode(answer)}
                </button>
              </div>
            )

          })}
        </div>
      </div>
    </div >
  );
}

export default QuestionItem;