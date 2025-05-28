import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { nextStep, setFormError, setFormField, setQuestions, Submission } from "../../formSlice";
import { Category } from "../../categoriesSlice";
import { getQuiz } from "../../services/FormServices";

const QuizRequestForm = () => {
  const { categories, loading: categoriesLoading, error: categoriesError } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch();

  const form = useSelector((state: RootState) => state.form) as Submission

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    dispatch(setFormField({ field: e.target.name, value: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.category || !form.difficulty) {
      return dispatch(setFormError("Please select both category and difficulty."));

    }
    getQuiz(form.category, form.difficulty)
      .then((res) => {
        dispatch(setQuestions(res.data.results));
      })
      .catch((error) => {
        dispatch(setFormError("Error fetching quiz data."));
        console.error("Error fetching quiz data:", error);
      });

  };

  return (
    <div className="row d-flex g-4">
      <div className="input-group">
        {categoriesLoading ? (
          <div>Loading categories...</div>
        ) : categoriesError ? (
          <div className="text-danger">{categoriesError}</div>
        ) : (
          <select
            name="category"
            className="form-select"
            value={form.category || ''}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            {categories.map((cat: Category) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        )}
        <select
          name="difficulty"
          className="form-select"
          value={form.difficulty || ''}
          onChange={handleChange}
        >
          <option value="">Select Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  )
}

export default QuizRequestForm