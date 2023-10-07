
const StartScreen = ({numOfQuestions,dispatch}) => {
  return (
    <div className="start">
        <h2>Welcome to the React Quiz!</h2>
        <h3>{numOfQuestions} Questions to test your React mastery</h3>
        <button onClick={() => dispatch({type: "start"})}>Let's Start</button>
    </div>
  )
}

export default StartScreen
