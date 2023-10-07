const Options = ({dispatch, question, answer}) => {
  return (
    <div className="options">
        {question.options.map((option, index) => <button disabled={answer !== null} className={`${answer != null && question.correctOption === index ? "correct-answer" : ""} ${answer === index ? "selected" : ""}`} onClick={() => dispatch({type: "newAnswer", payload: index})} key={option}>{option}</button>)}
    </div>
  )
}

export default Options
