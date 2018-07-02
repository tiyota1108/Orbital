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
		this.nextnoteId = this.nextnoteId.bind(this)
	}
	add(note){
		this.setState(prevState =>({
			notes:[
			    ...prevState.notes,
			    {
			    	id:this.nextnoteId(),
			    	note: note
			    }

			]
		}))
	}
	nextnoteId(){
		this.uniquenoteId = this.uniquenoteId || 0
		return this.uniquenoteId++
	}
	updateTitle(newNoteTitle,i){
		console.log('updating note at index',i)
		this.setState(prevState => ({
			notes: prevState.notes.map(
				note => (note.id !== i) ? note : {...note,note: newNoteTitle}
				)
		}))
	}
	remove(id) {
		console.log('removing item at', id)
		this.setState(prevState => ({
			notes: prevState.notes.filter(note => note.id !== id)
		}))
	}

	eachNote(note, i) {
		return (
			<Note key={note.id}
				  index={note.id}
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