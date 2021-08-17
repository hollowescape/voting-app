import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { vote } from '../store/actions';
import { color } from '../services/color';

const Poll = ({ poll, vote }) => {
const [question, setQuestion] = useState(poll.question)
const [options, setOptions] = useState([]);

  const answers =
    options &&
    options.map(opt => (
        <h2
        className="button"
        key={opt._id}>
            {opt.option}
        </h2>
    ))

  const data = {
    labels: poll.options.map(option => option.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map(option => color()),
        borderColor: '#323643',
        data: poll.options.map(option => option.votes),
      },
    ],
  };

  useEffect(async () => {
    let url = window.location.pathname.split('/')[3];
    
    let URL = 'https://voting-appps.herokuapp.com/api/polls/' + url;
    let res = await axios.get(URL);
    let data = res.data;
    console.log(data);
    setQuestion(data.question);
    setOptions(data.options);
    
}, [])



async function deletePoll () {
    let url = window.location.pathname.split('/')[3];
    
    let URL = 'https://voting-appps.herokuapp.com/api/polls/' + url;

    let token = localStorage.getItem("jwtToken");
   
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    let data = {
        "question": question
    }
    try {
      const res = await axios.put(URL, data, config);
      console.log(res);
      
      window.location.href = "https://voting-appps.herokuapp.com/";
    }
    catch(err) {
      console.log(err);
    }
  }
  function handleChange(event) {
      setQuestion(event.target.value);
  }

  return (
    <div
        style={{
            textAlign: "center"
        }}
    >
      <input className="poll-title" style={{
            textAlign: "center" 
        }}
        onChange={handleChange}
      value={question}></input>
      <div className="buttons_center"
        style={{
            textAlign: "center"
        }}
      >{answers}</div>
      
      <div
        style={{
          textAlign : "center",
          padding : "10px",
          marginTop: "40px"
        }}
      >
        <button
          style={{
            padding: "10px 20px" ,
            color: "red",
            borderRadius: "10px",
            boxShadow: "10px 4px 9px rgba(0, 0, 0, 0.3)",
            border: "none"
          }}
          onClick={() => deletePoll()}
        >
          Update Polls
        </button>   
      </div> 
    </div>
  );
};

export default connect(
  store => ({
    poll: store.currentPoll,
  }),
  { vote },
)(Poll);