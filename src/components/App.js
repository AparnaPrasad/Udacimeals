import React, { Component } from 'react'
import {addRecipe} from '../actions'
class App extends Component {

	state = {
  		calender: null
  	}

  	componentDidMount () {
  		const {calStore} = this.props;
  		console.log('calStore', calStore);
  		calStore.subscribe(()=>
  		{
  			this.setState(()=>({
  				calender: calStore.getState()
  			}))

  		})
  		
  	}
  	onSubmit = () => {
  		console.log('in on submit');
  		const {calStore} = this.props;
  		calStore.dispatch(addRecipe(
  			{day: 'monday', 
  			 recipe: {label: this.input.value}, 
  			 meal: 'breakfast'
  			}
  		))
  		this.input.value = ''
  	}
  	render() {
  	
	    return (
	    	<div>
			      <div>
			        <input type='text'
			        	   ref={(input) => this.input = input}
			        	   placeholder='Mondays breakfast'/>
			        <button onClick={this.onSubmit}>Submit</button>  

			      </div>
			      <div>
			      Mondays BreakFast: {this.state.calender && 
			      	this.state.calender.monday.breakfast}
			      </div>
	      </div>
	    )
	  }
}

export default App
