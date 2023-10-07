import Header from "./components/Header";
import "./App.css";
import Main from "./components/Main";
import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./StartScreen";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";


const url = "http://localhost:8080/questions";
const SEC_PER_QUESTION = 30;

const initState = {
  questions: [],

  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  currentIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remaningSeconds: 30,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active", remaningSeconds: state.questions.length * SEC_PER_QUESTION };
    case "next":
      if (state.currentIndex === state.questions.length - 1) {
        return {
          ...state,
          status: "finished",
          answer: null,
          highScore:
            state.points > state.highScore ? state.points : state.highScore,
        };
      }
      return { ...state, currentIndex: state.currentIndex + 1, answer: null };
    case "previous":
      return { ...state, currentIndex: state.currentIndex - 1 };
    case "newAnswer":
      const currentQuestion = state.questions.at(state.currentIndex);

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === currentQuestion.correctOption
            ? state.points + currentQuestion.points
            : state.points,
      };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };

    case "tick":
      return {
        ...state,
        remaningSeconds: state.remaningSeconds - 1,
        status: state.remaningSeconds === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown Action");
  }
};

const App = () => {
  const [
    {
      questions,
      status,
      currentIndex,
      answer,
      points,
      highScore,
      remaningSeconds,
    },
    dispatch,
  ] = useReducer(reducer, initState);

  const numOfQuestions = questions.length;
  const totalPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  console.log(totalPoints);

  useEffect(() => {
    const fetchQyestions = async () => {
      try {
        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Somethinr went wrong");
        }
        const data = await res.json();
        // console.log(data);
        dispatch({ type: "dataReceived", payload: data });
      } catch (err) {
        // console.log(err);
        dispatch({ type: "dataFailed" });
      }
    };

    fetchQyestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        <>
          {status === "loading" && <Loader />}
          {status === "error" && <Error />}
          {status === "ready" && (
            <StartScreen numOfQuestions={numOfQuestions} dispatch={dispatch} />
          )}
          {status === "active" && (
            <>
              <Progress
                answer={answer}
                index={currentIndex}
                numOfQuestions={questions.length}
                points={points}
                totalPoints={totalPoints}
              />
              <Question
                answer={answer}
                dispatch={dispatch}
                question={questions[currentIndex]}
              />
            </>
          )}
          {
            <Footer>
              {status === "active" && (
                <Timer remaningSeconds={remaningSeconds} dispatch={dispatch} />
              )}
              <NextButton
                numOfQuestions={numOfQuestions}
                index={currentIndex}
                answer={answer}
                dispatch={dispatch}
              />
            </Footer>
          }

          {status === "finished" && (
            <FinishScreen
              dispatch={dispatch}
              highScore={highScore}
              points={points}
              totalPoints={totalPoints}
            />
          )}
        </>
      </Main>
    </div>
  );
};

export default App;
