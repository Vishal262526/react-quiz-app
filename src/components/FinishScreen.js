const FinishScreen = ({points, totalPoints, highScore, dispatch}) => {


    const percentage  = (points / totalPoints) * 100;

  return (
    <>
    <p className="finished">
        You Scored <strong>{points}</strong> out of <strong>{totalPoints}</strong> ({percentage}%)
    </p>

    <p className="high-score">High score is <strong>{highScore}</strong></p>
    <div className="btn">
  <button onClick={() => dispatch({type: "restart"})}>Restart Quiz</button>
    </div>
    </>
  )
}

export default FinishScreen
