import React, { useState, useEffect } from 'react';

function Cloze(props) {
  const [sentence, setSentence] = useState('');
  const [preview, setPreview] = useState('');
  const [selectedWord, setSelectedWord] = useState([]);
  const wordString = selectedWord.join(',');
  const unique_id= props.unique_id

  const [creds, setCreds] = useState({
    prev: '',
    sent: '',
  });

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const  preview = creds.prev;
      const  sentence = creds.sent;
      let uid = unique_id;

      const response = await fetch(`http://localhost:5000/api/cloze/addcloze?words=${wordString}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ uid, preview, sentence }),
      });

      const jsonResponse = await response.json();
      console.log(jsonResponse);

      if (jsonResponse) {
        alert('Account created successfully');
      } else {
        alert('Invalid details');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const [tr, settr] = useState(false)
  let clickk=()=>{
    settr(!tr)
    
  }

  useEffect(() => {
  console.log(unique_id)

    let words = preview.split(/[ ]+/);
    let sen = sentence.split(/[ ]+/);
    console.log(selectedWord)
    console.log(sen)
    for(let i = 0; i <selectedWord.length; i++) {
      // console.log()
      if(sen.includes(selectedWord[i])){
      if(words.includes(selectedWord[i])){
        const wordIndex = words.findIndex((word) => word === selectedWord[i]);
        // const wordIndex = words.findIndex((word) => new RegExp(`${word}[ ,.-]`).test(selectedWord[i]));


    if (wordIndex !== -1) {
      words[wordIndex] = '_'.repeat(selectedWord[i].length);
      setPreview(words.join(' '));
      setCreds((prevCreds) => ({ ...prevCreds, prev: words.join(' ') }));
      setCreds((prevCreds) => ({ ...prevCreds, sent: sentence }));
    }
      }}

      if(!sen.includes(selectedWord[i])){
      selectedWord.splice(i, 1)
    }}
    const wordIndex = words.findIndex((word) => word === selectedWord[selectedWord.length - 1]);

    if (wordIndex !== -1) {
      words[wordIndex] = '_'.repeat(selectedWord[selectedWord.length - 1].length);
      setPreview(words.join(' '));
      setCreds((prevCreds) => ({ ...prevCreds, prev: words.join(' ') }));
      setCreds((prevCreds) => ({ ...prevCreds, sent: sentence }));
    }
  }, [selectedWord, sentence,tr, preview]);

  const checkWhitespace = (str) => /\s/.test(str);

  const underline = () => {
    let selectedText = window.getSelection().toString().trim();
    if (selectedWord.includes(selectedText) || checkWhitespace(selectedText)) {
      return;
    }
    setSelectedWord((prevWords) => [...prevWords, selectedText]);
  };

  const write = (e) => {
    setSentence(e.target.value);
    setPreview(e.target.value);
  };

  return (
    <div onClick={clickk} className='px-2'>
          <h1 className='mt-5 text-gray-500 text-4xl font-bold my-2'>Cloze</h1>
      <h2>Preview</h2>
      <textarea
        className='border-2 block w-full bg-gray-400 border-gray-800'
        value={preview}
        onChange={write}
        name='preview'
        id=''
        cols='100'
        rows='5'
        disabled
      />
      <h2>Sentence</h2>
      <button className='btn btn-primary' onClick={underline}>
        Underline
      </button>
      <textarea
        className='border-2 block w-full border-gray-800'
        value={sentence}
        onChange={write}
        name='sentence'
        id=''
        cols='100'
        rows='5'
      />
      <ul>
        {selectedWord.map((word, index) => (
          <li key={index}>{word}</li>
        ))}
      </ul>
      <button type='submit' onClick={handleSubmit} className='bg-blue-400'>
        Submit
      </button>
    </div>
  );
}

export default Cloze;
