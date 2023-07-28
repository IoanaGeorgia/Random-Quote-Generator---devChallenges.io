import * as React from 'react';
import { useState, useEffect } from 'react';
import './style.css';

export default function App() {

  // needed hooks
  const [isHover, setIsHover] = useState(false);
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState(null);
  const [genre, setGenre] = useState(null);
  const [newQuotes, setNewQuotes] =useState([]);

// make the call to the API when the app loads
  useEffect(() => {
      getQuote()
  }, []);

  // handling the hover events
  const hoverInputEnter = () => {
    setIsHover(true);
  };

  const hoverInputLeave = () => {
    setIsHover(false);
  };

  // call to the API to get the random quote
  function getQuote(){
    fetch(' https://quote-garden.onrender.com/api/v3/quotes/random')
    .then(response => response.json())
    .then(json => {setQuote(json.data[0].quoteText), setAuthor(json.data[0].quoteAuthor), setGenre(json.data[0].quoteGenre), setNewQuotes([])})
    .catch(error => console.error(error));
  }

  // load 2 more quotes from the same author on click on the author info div
  function getMoreQuotes(){
    fetch(`https://quote-garden.onrender.com/api/v3/quotes/random?author=${author}&count=2`)
    .then(response => response.json())
    .then(json => {console.log(json), setNewQuotes(json.data)})
    .catch(error => console.error(error));

    
  }

// styling the whole arrow div depending on hover
  function styleArrow(){
    if(isHover){
      return {...quoteInfo, ...hoverInfo}
    } else{
    return quoteInfo
    }
  }

// styling author info depending on hover   
  function authorStyle(){
    if(isHover){
      return {...authorStyleDefault, ...authorHover}

    }else{
      return authorStyleDefault
    }
  }

// style constants (using constants as been chosen to make the project easier to read at a glance)  
  const mainWrapper = {
    display:'grid',
    placeItems:'center',
    padding:'2vh 10vh',
    fontFamily:'Arial'
  }
  const headerStyles ={
    textAlign:'right',
    width:'100%',
    paddingBottom:'20vh'
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
    borderLeft:'5px solid #f5cb42',
    paddingLeft:'8vh',
    marginBottom:'15vh',
    fontSize:'23px'
  }
  const quoteInfo={
    marginLeft:'7vh',
    paddingBottom:'5vh',
    marginBottom:'10vh',
    paddingTop:'4vh',
    paddingRight:'3vh',
    paddingLeft:'2vh',
    display:'flex',
    justifyContent:'space-between',
    alignItems:'center'
  }
  const authorStyleDefault= {
    fontWeight:'bolder',
    fontSize:'14px',
    }
  const genreStyle = {
    color:'grey',
    fontSize:'12px',
    paddingTop:'1vh',
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
  const authorTitle = {
    fontSize:'23px',
    fontWeight:'bolder',
    position:'absolute',
    marginTop:'-10%',
  }
  const devInfo = {
    position:'fixed',
    bottom:'0px',
    padding:'2vh',
    fontSize:'11px',
    color:'gray'
  }

  return (
    <div style={mainWrapper}>

{/* the header with the random button inside */}
      <div style={headerStyles}>
        {/* note: for onclick events, don't call the function with the paranthesis os it won't keep actively calling it */}
        <button 
        style={refreshButton} 
        onClick={getQuote}> 
        random 
        <div style={refreshIcon}>🗘</div> 
        </button>
      </div>


{/* main random quote wrappers*/}
      <div style={quoteMainWrapper}>
        <div style={quoteWrapper}>
          {/* the author name, visible when the author div is clicked */}
        {newQuotes.length > 0 && 
        <div style={authorTitle}>  
        {author}
        </div>}


{/* the quote */}
          {JSON.stringify(quote)}
          </div>

{/* the author info div, hidden once clicked           */}
         { !newQuotes.length && 
         <div 
         style={styleArrow()}                 
            onMouseEnter={hoverInputEnter}
            onMouseLeave={hoverInputLeave}
            onClick={getMoreQuotes}
            >
            <span>
            <div style={authorStyle()}>{author}</div>
            <div style={genreStyle}>{genre}</div>
            </span>
            <div 
            style={quoteInfoArrow}>→
            </div>
          </div>
}
{/* the other two quotes, visible when the author info is clicked           */}
            {newQuotes && newQuotes.map((quotes, index) => (
         <div 
         style={quoteWrapper} 
         key={index}>
         {JSON.stringify(quotes.quoteText)}
       </div>
      ))}
      </div>

{/* developer and project info       */}
      <span style={devInfo}>Challenge created by P. Ioana in React for devChallenges.io</span>
    </div>
  );
}
