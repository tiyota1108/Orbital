import React, { Component } from 'react'
import Card from './Card'
import FaPlus from 'react-icons/lib/fa/plus'
import FaTrash from 'react-icons/lib/fa/trash'

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: []
		}
		this.add = this.add.bind(this)
		this.eachCard = this.eachCard.bind(this)
		this.update = this.update.bind(this)
		this.removeCard = this.removeCard.bind(this)
		this.remove = this.remove.bind(this)
		this.nextId = this.nextId.bind(this)
		this.randomBetween = this.randomBetween.bind(this)
	}

	/*componentWillMount() {
		this.style = {
			right: this.randomBetween(0, window.innerWidth - 200, 'px'),
			top: this.randomBetween(0, window.innerHeight - 200, 'px'),
			transform: `rotate(${this.randomBetween(-25, 25, 'deg')})`
		}
	}*/

	randomBetween(x, y, s) {
		return x + Math.ceil(Math.random() * (y-x)) + s
	}

	add(text){
		this.setState(prevState =>({
			cards:[
			    ...prevState.cards,
			    {
			    	id:this.nextId(),
			    	card:text
			    }

			]
		}))
	}

	nextId(){
		this.uniqueId = this.uniqueId || 0
		return this.uniqueId++
	}

	update(newText,i){
		console.log('updating item at index',i)
		this.setState(prevState => ({
			cards: prevState.cards.map(
				card => (card.id !== i) ? card : {...card,card: newText}
				)
		}))
	}

	removeCard(id){
		console.log('removing item at',id)
		this.setState(prevState => ({
			cards: prevState.cards.filter(card => card.id !== id)
		}))
	}

	remove() {
		this.props.onRemove(this.props.index)
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

	



	render() {
		return (
			<div className="note" style={this.style}>
				
				<button onClick={this.add.bind(null,"New Card")}
				    id="add">
				    <FaPlus />
				</button>
				<button onClick={this.remove} id="remove"><FaTrash /></button>

				{this.state.cards.map(this.eachCard)}
				
			</div>
		)
	}
}

export default Note