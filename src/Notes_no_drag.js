import React, { Component } from 'react'
import Card from './Card'
import FaPlus from 'react-icons/lib/fa/plus'
import FaPencil from 'react-icons/lib/fa/pencil'
import FaTrash from 'react-icons/lib/fa/trash'
import FaFloppyO from 'react-icons/lib/fa/floppy-o'
import './notes.css'
//in this version i moved the set state for updating and deleting
//card out of the callback of saving to backend. to speed up
//front end render. the version where the setstate is inside
//callback is called Notes.callback.js

const unanthMessage = "Unauthorized user,please login.";

class Note extends Component {
	constructor(props) {
		super(props)
		this.state = {
			cards: [],
			editingTitle:false,
			effect:" animated slideInUp"
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
        this.renderDisplay_back = this.renderDisplay_back.bind(this)

	}


	//load cards retrieved from server on each note
	componentWillMount() {
		this.setState({
			cards: this.props.cards.map(card => (
				{id: card._id,
				card: card.cardContent}
			)).reduce((obj, note) => {//reduce the array of note objects to one big object with the _ids as keys
        obj[note.id] = note;
        return obj;
      },{})
		});
	}

	//------------------------------------------------------------------------

	shouldComponentUpdate(nextProps, nextState) {
		return (
			this.props!== nextProps|| this.state !== nextState
		)
	}
	//			this.props.children !== nextProps.children || this.state !== nextState || this.props.animation !== nextProps.animation


	editTitle(){
		console.log('edit title')
		this.setState({
			cards:this.state.cards,
			editingTitle:true
		})
	}

	saveTitle(e){
		e.preventDefault()
		var noteSide = this.props.animation === " flipped"? "back" : "front";
		this.props.onChange(this[noteSide].value,this.props.index)
		this.setState({
			editingTitle: false
		})
	}

	add(text) {
		var self = this;
		fetch(`https://little-planet-1564-api.herokuapp.com/card/${this.props.index}`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization' : `${localStorage.getItem('jwtToken')}`,
			},
			body: JSON.stringify({
				cardContent: text,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			if(response.message === unanthMessage) {
				this.props.history.push("/login");
			} else {
			self.setState(prevState =>({
				cards:{
						...prevState.cards,
						[response._id] : {
							id:response._id,
							card:text
						}
				}
			}));
		}
		})
		.catch( (error) => {
		console.log(error);
	})
	}


	update(newText, i) {
		var self = this;
		fetch(`https://little-planet-1564-api.herokuapp.com/card/${this.props.index}/${i}`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization' : `${localStorage.getItem('jwtToken')}`,
			},
			body: JSON.stringify({
				cardContent: newText,
			})
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
			if(response.message === unanthMessage) {
				this.props.history.push("/login");
			}
		})
		.catch( (error) => {
		console.log(error);
	})
	self.setState(prevState => {
		prevState.cards[i].card = newText;//here cannot use notes.i must use notes[i], thank you 1101S
		return prevState;
	});
	}


	remove() {
		this.props.onRemove(this.props.index)
	}

	removeCard(id) {
		console.log('removing item at', id)
		var self = this;
		fetch(`https://little-planet-1564-api.herokuapp.com/card/${this.props.index}/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
        'Authorization' : `${localStorage.getItem('jwtToken')}`,
			}
		})
		.then(response => response.json())
		.then(response => {
			console.log(response);
      if(response.message === unanthMessage) {
        this.props.history.push("/login");
      }
		})
		.catch( (error) => {
		console.log(error);
	})
	self.setState(prevState => {
		delete prevState.cards[id];
		return prevState;
	});
	}


	handleTouchStart = (key, pressLocation, e) => {
		this.handleMouseDown(key, pressLocation, e.touches[0]);
	};

	handleTouchMove = (e) => {
		e.preventDefault();
		this.handleMouseMove(e.touches[0]);
	};

	handleMouseDown = (pos, pressY, {pageY}) => {
		this.setState({
			topDeltaY: pageY - pressY,
			mouseY: pressY,
			isPressed: true,
			originalPosOfLastPressed: pos,
		});
	};

	handleMouseMove = ({pageY}) => {
		const {isPressed, topDeltaY, cards, originalPosOfLastPressed, itemsCount} = this.state;
//+ cards.indexOf(originalPosOfLastPressed) * 35
		if (isPressed) {
			console.log("itemsCount is " + itemsCount);
			console.log("springConfig is " + springConfig);
			console.log("originalPosOfLastPressed is"+ cards.indexOf(originalPosOfLastPressed));
			console.log("pageY is " + pageY);
			console.log("topDeltaY " + topDeltaY);
			const mouseY = pageY - topDeltaY;
			console.log("mouseY is " + mouseY);
			const currentRow = clamp(clamp(Math.round(mouseY / 70),-itemsCount+1,itemsCount-1) + cards.indexOf(originalPosOfLastPressed),0,itemsCount-1);
			console.log("currentRow is " + currentRow);
			let newOrder = cards;

			if (currentRow !== cards.indexOf(originalPosOfLastPressed)){
				newOrder = reinsert(cards, cards.indexOf(originalPosOfLastPressed), currentRow);
				this.setState({topDeltaY: pageY, cards: newOrder});
			}else{

			this.setState({mouseY: mouseY, cards: newOrder});}
		}
	};

	handleMouseUp = () => {
    this.setState({isPressed: false, topDeltaY: 0});
  };

	eachCard(card, i) {
		const {mouseY, isPressed, originalPosOfLastPressed, cards} = this.state;

		const style = originalPosOfLastPressed === card && isPressed
			? {
					scale: spring(1.1, springConfig),
					shadow: spring(16, springConfig),
					y: mouseY,
				}
			: {
					scale: spring(1, springConfig),
					shadow: spring(1, springConfig),
					y: spring(cards.indexOf(card) * 2, springConfig),
				};
		return (
			<Card key={cardId}
				  index={cardId}
					mode = {this.props.mode}
					onChange={this.update}
				  onRemove={this.removeCard}>
				  {this.state.cards[cardId].card}
		    </Card>
		)
	}

	renderForm(side) {
		console.log('render Form')
		return (
			<div>
				<form onSubmit={this.saveTitle}>
					<textarea ref={input => this[side] = input}
							  defaultValue={this.props.children}/>
					<button id="save"><FaFloppyO /></button>
				</form>
			</div>
		)
	}
	renderDisplay() {
		return (
			<div>
				<p>{this.props.children}</p>
				<button onClick={this.remove} id="remove"><FaTrash /></button>
				<button onClick={this.editTitle} id="edit"><FaPencil /></button>

				{Object.keys(this.state.cards).map(this.eachCard)}
				<span>
				<button onClick={this.add.bind(null,"New Card")}
				    id="add">
				    <FaPlus />
				</button>
				</span>
			</div>
		)
	}
	renderDisplay_back() {
		return (
			<div>
				<img src = {`/${this.props.mode}_icon.png`} className = "noteIcon"/>
				<p>{this.props.children}</p>
				<button onClick={this.remove} id="remove"><FaTrash /></button>
				<button onClick={this.editTitle} id="edit"><FaPencil /></button>
			</div>
		)
	}


	render() {
		console.log("this state is" + this.props.animation );
		return (
			<div className = {`flip-container note_${this.props.mode}${this.state.effect}`}>
			<div className = {`note_${this.props.mode}`}>
			{
				this.state.editingTitle ? this.renderForm(this.props.animation === " flipped" ? "back" : "front") : (
				<div className = {`note note_${this.props.mode}${this.props.animation}`}>
				<div className = "front" onDoubleClick = {() => this.props.onFlip(this.props.index, " flipped")}>
								 {this.renderDisplay()}
				</div>
				<div className = "back-container back" onDoubleClick = {() => this.props.onFlip(this.props.index, "")}>
								{this.renderDisplay_back()}
					</div>
					</div>
				)}
			</div>
			</div>
		)
	}

}


export default Note;
