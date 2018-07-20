import React, { Component } from 'react'
import Card from './Card'
import FaPlus from 'react-icons/lib/fa/plus'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: [],
			editingTitle:false
		}
		this.add = this.add.bind(this)
		this.eachCard = this.eachCard.bind(this)
		this.update = this.update.bind(this)
		this.removeCard = this.removeCard.bind(this)
		this.remove = this.remove.bind(this)
		this.editTitle = this.editTitle.bind(this)
		this.saveTitle = this.saveTitle.bind(this)
		this.renderForm = this.renderForm.bind(this)
		this.renderDisplay = this.renderDisplay.bind(this)
		//this.randomBetween = this.randomBetween.bind(this)
	}

	/*componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 200, 'px'),
			top: this.randomBetween(0, window.innerHeight - 200, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}

	randomBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y-x)) + s
	}*/
	/*componentDidUpdate(){
		var titleArea
		if(this.state.editingTitle){
			titleArea = this._newTextTitle
			titleArea.focus()
			titleArea.select()
		}
	}*/
	//load cards retrieved from server on each note
	componentWillMount() {
		this.setState({
			cards: this.props.cards.map(card => (
				{id: card._id,
				card: card.cardContent}
			))
		});
	}

	//------------------------------------------------------------------------

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props.children !== nextProps.children || this.state !== nextState
		)
	}

	editTitle(){
		console.log('edit title')
		this.setState({
			cards:this.state.cards,
			editingTitle:true
		})
	}

	saveTitle(e){
		e.preventDefault()
		this.props.onChange(this._newTextTitle.value,this.props.index)
		this.setState({
			editingTitle: false
		})
	}

	add(text) {
		var self = this;
		fetch(`http://localhost:3000/card/${this.props.index}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cardContent: text,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			self.setState(prevState =>({
				cards:[
						...prevState.cards,
						{
							id:response._id,
							card:text
						}
				]
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}


	update(newText, i) {
		var self = this;
		fetch(`http://localhost:3000/card/${this.props.index}/${i}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				cardContent: newText,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			self.setState(prevState => ({
				cards: prevState.cards.map(
					card => (card.id !== i) ? card : {...card,card: newText}
					)
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}


	remove() {
		this.props.onRemove(this.props.index)
	}

	removeCard(id) {
		console.log('removing item at', id)
		var self = this;
		fetch(`http://localhost:3000/card/${this.props.index}/${id}`, {
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
				cards: prevState.cards.filter(card => card.id !== id)
			}));
		})
		.catch( (error) => {
		console.log(error);
	})
	}


	eachCard(card, i) {
		return (
			<Card key={card.id}
				  index={card.id}
				  onChange={this.update}
				  onRemove={this.removeCard}>
				  {card.card}
		    </Card>
		)
	}

	renderForm() {
		console.log('render Form')
		return (
			<div className="note" >
				<form onSubmit={this.saveTitle}>
					<textarea ref={input => this._newTextTitle = input}
							  defaultValue={this.props.children}/>
					<button id="save"><FaFloppyO /></button>
				</form>
			</div>
		)
	}

	renderDisplay() {
		return (
			<div className="note" >
				<p>{this.props.children}</p>
				<button onClick={this.remove} id="remove"><FaTrash /></button>
				<button onClick={this.editTitle} id="edit"><FaPencil /></button>

				{this.state.cards.map(this.eachCard)}
				<span>
				<button onClick={this.add.bind(null,"New Card")}
				    id="add">
				    <FaPlus />
				</button>

				</span>


			</div>
		)
	}
	render() {
		return this.state.editingTitle ? this.renderForm() : this.renderDisplay()
	}






}

export default Note
