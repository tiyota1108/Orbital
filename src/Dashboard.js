import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './dashboard.css';
import Board from './Boards';

//need to add in edit and delete board functionalities
const unanthMessage = "Unauthorized user,please login.";

class Dashboard extends Component{
	constructor(props){
		super(props)
		this.state = {
      boards:[],
			//editing:false
		}
    var userId;
		this.add = this.add.bind(this);
    this.eachBoard = this.eachBoard.bind(this);
	}
  componentWillMount() {
    var self = this;
    this.userId = this.props.match.params.id;
    fetch(`http://localhost:3000/board/${this.userId}`, { //added in the second argument to specify token
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `${localStorage.getItem('jwtToken')}`
      }
    })
        .then(response => response.json())
        .then(response => {
          console.log(response);
          if(response.message === unanthMessage) {
            this.props.history.push("/login");
          } else {
            ///change from here
          self.setState({
            boards: response.boards,
          })
        }
        })
        .catch( (error) => {
        console.log(error);
      })
      //console.log(self.state.notes);

    }

    add(mode) {//adapt the setState to add new key-value pair into the notes object
  		var self = this;
  		fetch(`http://localhost:3000/board/${this.userId}`, {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json',
  				'Authorization' : `${localStorage.getItem('jwtToken')}`//add token
  			},
  			body: JSON.stringify({
  				mode: mode,
  			})
  		})
  		.then(response => response.json())
  		.then(response => {
  			console.log(response);
  			if(response.message === unanthMessage) {
  				this.props.history.push("/login");
  				//console.log("hello");
  			} else {
  			self.setState(prevState =>({
  				boards:[
  				    ...prevState.boards,
  				    {
                boardId: response.boardId,
  							boardTitle: 'Untitled Board',
  				    	mode: mode
  				    }
  				]
  			}));
  		}
  		})
  		.catch( (error) => {
  			if(error.response)
  		console.log(error);
  	})
  	}

  eachBoard(board, i) {
    return (
      <Link to={`/board/${board.boardId}`} key={i}>{board.boardTitle}, {board.mode}</Link>
    )
  }

  render(){
    return (
      <div className = "Dash">
        <header className = "Dash-header">
          <h1> Welcome to 1564! </h1>
        </header>
        <div className = "Exiting-Boards">
          <p>Click to open your board.</p>
          {
            this.state.boards.map(this.eachBoard)
          }
        </div>
        <div className = "Add-Boards">
          <p>or, create new boards</p>
          <button onClick={()=>this.add("daylight")}>daylight mode</button>
          <button onClick={()=>this.add("dairy")}>dairy mode</button>
          <button onClick={()=>this.add("night")}>night mode</button>
        </div>
      </div>
    )
  }
}

export default Dashboard;

/*
<button onClick={this.add("daylight")}>daylight mode</button>
<button onClick={this.add("dairy")}>dairy mode</button>
<button onClick={this.add("night")}>night mode</button>
*/



// 	componentDidUpdate(){
// 		var textArea
// 		if (this.state.editing){
// 			textArea = this._newText
// 			textArea.focus()
// 			textArea.select()
// 		}
// 	}
//
// 	shouldComponentUpdate(nextProps,nextState){
// 		return (
// 			this.props.children !== nextProps.children|| this.state !== nextState
// 			)
//
// 	}
//
// 	edit(){
// 		this.setState({
// 			editing: true
// 		})
// 	}
// 	remove(){
// 		this.props.onRemove(this.props.index)
// 	}
//
// 	save(e){
// 		e.preventDefault()
// 		this.props.onChange(this._newText.value,this.props.index)
// 		this.setState({
// 			editing:false
// 		})
// 	}
//
// 	_handleKeyPress = (e) => {
//         if (e.key === 'Enter') {
//         console.log('do validate');
//         }
//     }
// 	renderForm(){
// 		return (
// 			<div className="card" style={this.style}>
// 			    <form onSubmit={this.save}>
// 			        <textarea ref={input => this._newText = input}
// 			            defaultValue={this.props.children}/>
// 			        <button id="save"><FaFloppyO/></button>
//
//
// 			    </form>
// 			</div>
// 		)
// 	}
//
// 	renderDisplay(){
// 		return (
// 			<div className="card" style={this.style}>
// 			    <p>{this.props.children}</p>
// 			    <span>
// 			        <button onClick={this.edit} id="edit"><FaPencil /></button>
// 			        <button onClick={this.remove} id="remove"><FaTrash /></button>
// 			    </span>
// 			 </div>
// 			)
// 	}
// 	render(){
// 		return this.state.editing ? this.renderForm():this.renderDisplay()
//
//
// 	}
// }
// export default Card
