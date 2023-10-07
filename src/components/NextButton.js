const NextButton = ({dispatch, answer, numOfQuestions, index}) => {
  return (
    <div className="next-btn">
    {answer !== null && <button onClick={() => dispatch({type:"next"})}>{index < numOfQuestions - 1 ? "Next" : "Finish"}</button>}
    </div>
  );
};

export default NextButton;
