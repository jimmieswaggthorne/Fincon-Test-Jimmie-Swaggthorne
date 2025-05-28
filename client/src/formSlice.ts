import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Question {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  selectedAnswer?: string;
}

export interface Submission {
  step: number;
  name: string;
  email: string;
  category?: string;
  difficulty?: string;
  questions?: Question[];
}

const initialState: Submission = {
  step: 1,
  name: '',
  email: '',
  category: '',
  difficulty: '',
  questions: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: string; value: string }>) => {
      (state as any)[action.payload.field] = action.payload.value;
    },
    resetForm: () => initialState,
    setForm: (state, action: PayloadAction<Submission>) => {
      return { ...action.payload };
    },
    restart: (state) => initialState,
    nextStep: (state) => {
      if (state.step < 3) {
        state.step += 1;
      }
    },
    previousStep: (state) => {
      if (state.step > 1) {
        state.step -= 1;
      }
    },
    setQuestions: (state, action: PayloadAction<Question[]>) => {
      state.questions = action.payload;
      state.step = 2;
    },
    setAnswer: (state, action: PayloadAction<any>) => {
      const { index, answer }: any = action.payload
      let newQuestions = state.questions?.map((q, i) => {
        if (i === index) {
          return { ...q, selectedAnswer: answer };
        }
        return q;
      });
      state.questions = newQuestions as Question[];
    }
  },
});

export const {
  setFormField,
  resetForm,
  setForm,
  restart,
  nextStep,
  previousStep,
  setQuestions,
  setAnswer } = formSlice.actions;
export default formSlice.reducer;
