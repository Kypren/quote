import React, {useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'
import './App.scss';
import colorArray from './colorsArray';
const quoteURL = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"



function App() {
  const [quote, setQuote] = useState("Life shrinks or expands in proportion to one’s courage.")
  const [author, setAuthor] = useState("Anais Nin");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setQuotesArray] = useState(null);
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (url) => {
    const response = await fetch(url);
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
  }

  useEffect(() => {

    fetchQuotes(quoteURL)
    
  }, [quoteURL])

  const getRandomQuote = () => {
    let randomInteger = Math.floor(quotesArray.length * Math.random());
    setRandomNumber(randomInteger);
    setAccentColor(colorArray[randomInteger])
    setQuote(quotesArray[randomInteger].quote);
    setAuthor(quotesArray[randomInteger].author);
    

  };

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
      <div id="quote-box" style={{color: accentColor}}>
      
        <p id="text">
        <FontAwesomeIcon icon={faQuoteRight} id="quote-icon" />{quote}
        </p>
        <p id="author" >- {author}</p>
        <div className= "buttons">
          <a style={{backgroundColor: accentColor}} id="tweet-quote" href={encodeURI('http://www.twitter.com/intent/tweet?text=')}><FontAwesomeIcon icon={faTwitter}/></a>
          <button style={{backgroundColor: accentColor}} id="new-quote" onClick={() => getRandomQuote()}>Generate quote</button>
        </div>
      </div>
        
      </header>
    </div>
  );
}

export default App;
