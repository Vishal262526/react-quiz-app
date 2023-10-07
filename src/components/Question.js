import Options from "./Options";

const Question = ({ dispatch, question, answer }) => {
  console.log(question);
  return (
    <div className="question">
      <h4>{question.question}</h4>
      <Options answer={answer} dispatch={dispatch} question={question} />
  
    </div>
  );
};

export default Question;
