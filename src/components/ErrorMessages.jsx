const ErrorMessages = ({ errors }) => {
  return (<>
    <ul className="error-messages" data-test="error-list">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </>)
}

export default ErrorMessages
