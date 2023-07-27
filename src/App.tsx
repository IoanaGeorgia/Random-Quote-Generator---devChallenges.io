import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {

  const [isHover, setIsHover] = useState(false);
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [newQuotes, setNewQuotes] =useState(null);

  useEffect(() => {
      getQuote()
  }, []);

  const hoverInputEnter = () => {
    setIsHover(true);
  };

  const hoverInputLeave = () => {
    setIsHover(false);
  };

  function getQuote(){
    fetch(' https://quote-garden.onrender.com/api/v3/quotes/random')
    .then(response => response.json())
    .then(json => {setQuote(json.data[0].quoteText), setAuthor(json.data[0].quoteAuthor), setGenre(json.data[0].quoteGenre)})
    .catch(error => console.error(error));
  }

  function getMoreQuotes(){
    fetch('https://quote-garden.onrender.com/api/v3/quotes/random?author=Bill Gates&count=2')
    .then(response => response.json())
    .then(json => {console.log(json), setNewQuotes(json.data)})
    .catch(error => console.error(error));

    
  }


  function styleArrow(){
    if(isHover){
      return {...quoteInfo, ...hoverInfo}
    } else{
    return quoteInfo
    }
  }
  function authorStyle(){
    if(isHover){
      return {...authorStyleDefault, ...authorHover}

    }else{
      return authorStyleDefault
    }
  }

  
  const mainWrapper = {
    display:'grid',
    'place-items':'center',
    padding:'2vh 10vh',
    'font-family':'Arial'
  }
  const headerStyles ={
    'text-align':'right',
    width:'100%',
    'padding-bottom':'20vh'
  }
  const refreshButton = {
      background:'transparent',
      border:'none',
      color:'gray',
      cursor:'pointer'
  }
  const refreshIcon = {
    transform: "rotate(90deg)",
    display:'inline-block'
  }
  const quoteMainWrapper ={
    height:'50vh',
    width:'60vh',
  }
  const quoteWrapper={
    'border-left':'5px solid #f5cb42',
    'padding-left':'8vh',
    'margin-bottom':'15vh',
    'font-size':'23px'
  }
  const quoteInfo={
    'margin-left':'7vh',
    'padding-bottom':'5vh',
    'margin-bottom':'10vh',
    'padding-top':'4vh',
    'padding-right':'3vh',
    'padding-left':'2vh',
    display:'flex',
    'justify-content':'space-between',
    'align-items':'center'
  }
  const authorStyleDefault= {
    'font-weight':'bolder',
    'font-size':'14px',
    }
  const genreStyle = {
    color:'grey',
    'font-size':'12px',
    'padding-top':'1vh',
  
  }
  const quoteInfoArrow={
    color:'white'
  }
  const hoverInfo ={
    background:'black',
    cursor:'pointer'
  }
  const authorHover ={
    color:'white'
  }
  return (
    <div style={mainWrapper}>
      <div style={headerStyles}>
        {/* note: for onclick events, don't call the function with the paranthesis os it won't keep actively calling it */}
        <button style={refreshButton} onClick={getQuote}> random <div style={refreshIcon}>🗘</div> </button>
      </div>
      <div style={quoteMainWrapper}>
        <div style={quoteWrapper}>
            {JSON.stringify(quote)}
          </div>
          <div style={styleArrow()}                 
            onMouseEnter={hoverInputEnter}
            onMouseLeave={hoverInputLeave}
            onClick={getMoreQuotes}
            >
            <span>
            <div style={authorStyle()}>{author}</div>
            <div style={genreStyle}>{genre}</div>
            </span>
            <div style={quoteInfoArrow}
             >→</div>
            
          </div>

          
      {/* {Object.values(moreQuotesList).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}  */}
            {newQuotes && newQuotes.map((quotes, index) => (
         <div style={quoteWrapper} key={index}>
         {JSON.stringify(quotes.quoteText)}
       </div>
      ))}
   

      </div>
    </div>
  );
}
