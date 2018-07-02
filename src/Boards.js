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
		this.nextNoteId = this.nextNoteId.bind(this) //changed method name to camel case
		this.postNote = this.postNote.bind(this) //new method to post to server
	}
	//retriving data from server before mounting borad
	componentWillMount() {
		var self = this;
		fetch(`http://localhost:3000/note`)
				.then(response => response.json())
				.then(response => {
					console.log(response);
					self.setState({notes :response});
					self.uniquenoteId = response.length;
				})
				.catch( (error) => {
				console.log(error);
			})

		}
		//-----------------------------------------------------------------------

	add(note){
		let generateId = this.nextNoteId();
		this.postNote("note", "add", generateId, note, []);//posting the new note to the server
		this.setState(prevState =>({
			notes:[
			    ...prevState.notes,
			    {
						id:generateId,
			    	note: note,
						cards:[]
			    }

			]
		}))
	}
	//method to post note data to server
	postNote(noteFlag, methodFlag, id, text, cards){
		fetch('http://localhost:3000/note', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				noteFlag: noteFlag,
				methodFlag: methodFlag,
				id: id,
				note: text,
				cards: cards
			})
		});
	}
	//------------------------------------------------------------------------
	nextNoteId(){
		////change the id generation to give out id from number of elements in the state array
		//this.uniquenoteId = this.uniquenoteId || 0
		return this.uniquenoteId++
	}
	updateTitle(newNoteTitle,i){
		console.log('updating note at index',i)
		this.postNote("note", "update", i, newNoteTitle, []); //post to server, we would not access the last para
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id !== i) ? note : {...note,note: newNoteTitle}
				)
		}))
	}
	remove(id) {
		console.log('removing item at', id)
		this.postNote("note", "delete", id, "byebye", []) //would not delete the last two variable
		this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
	}

	eachNote(note, i) {
		if(note.id === -1) {
			return;
		}
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
