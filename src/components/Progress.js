const Progress = ({ index, numOfQuestions, points, totalPoints, answer }) => {
  return (
    <div className="progress">
      <progress value={index + Number(answer !== null)} max={numOfQuestions} />
      <div className="progress-analytics">
        <p>
          Question <strong>{index + 1}</strong>/
          <strong>{numOfQuestions}</strong>
        </p>
        <p>
          <strong>
            {points} / {totalPoints}
          </strong>
        </p>
      </div>
    </div>
  );
};

export default Progress;
