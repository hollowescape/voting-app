import React from 'react';
import { connect } from 'react-redux';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { vote } from '../store/actions';
import { color } from '../services/color';

import { useHistory } from 'react-router-dom';


const Poll = ({ poll, vote }) => {

  const history = useHistory();

  const answers =
    poll.options &&
    poll.options.map(option => (
      <button
        onClick={() => vote(poll._id, { answer: option.option })}
        className="button"
        key={option._id}>
        {option.option}
      </button>
    ));

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

  async function deletePoll () {
    let url = window.location.pathname.split('/')[2];
    
    let URL = 'https://voting-appps.herokuapp.com/api/polls/' + url;

    let token = localStorage.getItem("jwtToken");
   
    let config = {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    }
    window.location.href = "https://voting-appps.herokuapp.com/";
    try {
      const res = await axios.delete(URL, data, config);
      console.log(res);
    }
    catch(err) {
      console.log(err);
    }
  }


  async function update() {
    // http://localhost:3000/poll/update/61195b292a850b08f9a04a70

    let url = window.location.pathname.split('/')[2];
    
    let URL = 'https://voting-appps.herokuapp.com/poll/update/' + url;
    
    history.push(`/poll/update/${url}`);
  }

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div className="buttons_center">{answers}</div>
      <Pie data={data} />

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
          delete Polls
        </button>   

        <button
          style={{
            padding: "10px 20px" ,
            color: "red",
            borderRadius: "10px",
            boxShadow: "10px 4px 9px rgba(0, 0, 0, 0.3)",
            border: "none",
            marginLeft: "20px"
          }}
          onClick={() => update()}
        >
          update Polls
        </button>   
        {/* http://localhost:3000/poll/update/61195b292a850b08f9a04a70 */}
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