import React, { useState } from 'react';
import { IoIosAddCircle } from "react-icons/io";


const PassageForm = (props,{handleSubmit}) => {
  const [passage, setPassage] = useState('');
  const [questions, setQuestions] = useState([{ id: 1, text: '', options: ['', '', '', ''], correctOption: 0 }]);
  const unique_id= props.unique_id

  const handlePassageChange = (event) => {
    setPassage(event.target.value);
  };

  const handleQuestionChange = (event, index) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (event, questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = event.target.value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (event, questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = parseInt(event.target.value, 10);
    setQuestions(updatedQuestions);
  };

  const isAddButtonDisabled = () => {
    const lastQuestion = questions[questions.length - 1];
    return (
      lastQuestion.text === '' ||
      lastQuestion.options.some((option) => option === '') ||
      lastQuestion.correctOption === 0
    );
  };

  const handleAddQuestion = () => {
    const newQuestion = {
      id: questions.length + 1,
      text: '',
      options: ['', '', '', ''],
      correctOption: 0,
    };
    setQuestions([...questions, newQuestion]);
  };

  

  
  
  return (
    
    <div className="container mx-auto p-4">
      <h1 className='text-gray-500 text-4xl font-bold my-2 mt-5'>Comprehension</h1>
      <label className="block mb-4">
        Passage:
        <textarea
          className="w-full p-2 border-2 border-gray-500 rounded"
          value={passage}
          onChange={handlePassageChange}
        />
      </label>

      <h2 className="text-lg font-bold mb-2">Questions:</h2>

      {questions.map((question, index) => (
        <div key={question.id} className=" border-2 border-gray-500 p-2">
          <label className="block mb-2">
            Question {index + 1}:
            <input
              type="text"
              className="w-full p-2 border-2 border-gray-500 rounded"
              value={question.text}
              onChange={(e) => handleQuestionChange(e, index)}
            />
          </label>

          <div className="mb-2">
            Options:
            {question.options.map((option, optionIndex) => (
              <label key={optionIndex} className="block mb-1">
                Option {String.fromCharCode(65 + optionIndex)}:
                <input
                  type="text"
                  className="w-full p-2 border-2 border-gray-500 rounded"
                  value={option}
                  onChange={(e) => handleOptionChange(e, index, optionIndex)}
                />
              </label>
            ))}
          </div>

          <label className="block mb-2">
            Correct Option:
            <select
              className="w-full p-2 border-2 border-gray-500 rounded"
              value={question.correctOption}
              onChange={(e) => handleCorrectOptionChange(e, index)}
            >
              {question.options.map((_, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>
                  {String.fromCharCode(65 + optionIndex)}
                </option>
              ))}
            </select>
          </label>
        </div>
      ))}

      <IoIosAddCircle
        className={`${
          isAddButtonDisabled() ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer text-blue-500 hover:text-blue-700'
        } text-3xl float-right`}
        onClick={handleAddQuestion}
        disabled={isAddButtonDisabled()}
      />
        
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default PassageForm;
