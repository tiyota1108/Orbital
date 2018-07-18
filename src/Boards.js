import React, { Component } from 'react'
import Note from './Notes'
import FaPlus from 'react-icons/lib/fa/plus'
import FaTrash from 'react-icons/lib/fa/trash'
import Card from './Card'
class Board extends Component {
	constructor(props) {
		super(props)
		this.state = {
			notes: []
		}
		this.add = this.add.bind(this)
		this.eachNote = this.eachNote.bind(this)
		this.updateTitle = this.updateTitle.bind(this)
		this.remove = this.remove.bind(this)
	}
	//retriving data from server before mounting borad
	componentWillMount() {
		var self = this;
		fetch(`http://localhost:3000/note`)
				.then(response => response.json())
				.then(response => {
					console.log(response);
					self.setState({
						notes: response.map(note => (
							{id: note._id,
							note: note.noteTitle,
						cards: note.cards}
						))
					})
					//self.setState({notes :response});
				})
				.catch( (error) => {
				console.log(error);
			})

		}
		//-----------------------------------------------------------------------

	add(note) {
		var self = this;
		fetch('http://localhost:3000/note', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				noteTitle: note,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			self.setState(prevState =>({
				notes:[
				    ...prevState.notes,
				    {
							id:response._id,
				    	note: note,
							cards:[]
				    }
				]
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}

	updateTitle(newNoteTitle, i) {
		var self = this;
		fetch(`http://localhost:3000/note/${i}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				noteTitle: newNoteTitle,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			self.setState(prevState => ({
				notes: prevState.notes.map(
					note => (note.id !== i) ? note : {...note,note: newNoteTitle}
					)
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}
	//------------------------------------------------------------------------

	remove(id) {
		console.log('removing item at', id)
		var self = this;
		fetch(`http://localhost:3000/note/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			self.setState(prevState => ({
				notes: prevState.notes.filter(note => note.id !== id)
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}

	eachNote(note, i) {
		return (
			<Note key={note.id}
				  index={note.id}
					cards = {note.cards} //pass down the array of cards objects retrieved from server
				  onChange={this.updateTitle}
				  onRemove={this.remove}>
				  {note.note}
		    </Note>
		)
	}

	render() {
		return (
			<div className="board">
				{this.state.notes.map(this.eachNote)}
				<button onClick={this.add.bind(null, "New Note")}
						id="add">
					<FaPlus />
				</button>
			</div>
		)
	}
}

export default Board
