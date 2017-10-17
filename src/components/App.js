import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addRecipe, removeFromCalender} from '../actions';
import { capitalize } from '../utils/helpers'
import CalendarIcon from 'react-icons/lib/fa/calendar-plus-o';
import Modal from 'react-modal';
import Loading from 'react-loading';
import {fetchRecipes} from '../utils/api';
import ArrowRightIcon from 'react-icons/lib/fa/arrow-circle-right'
import FoodList from './FoodList';
import ShoppingList from './ShoppingList';
class App extends Component {
	state={
		isFoodSearchOpen: false,
		day: null,
		meal: null,
		loadingFoods: false,
		food: null,
		ingredientsModalOpen: false

	}

	 openFoodSearch=({day, meal}) => {
		this.setState(()=>({
			isFoodSearchOpen: true,
			day,
			meal
		}))
	}

	 closeFoodSearch=() => {
		this.setState(()=>({
			isFoodSearchOpen: false,
			day: null,
			meal: null,
			food: null
		}))

	}

	searchFood = (event) => {
		if (!this.input.value) {
			return;
		}
		event.preventDefault();
		this.setState(()=>({
			loadingFoods:true
		}))
		fetchRecipes(this.input.value).then((food)=>{
			this.setState(()=>({
				food,
				loadingFoods: false
			}))

		})
		
	}
	openIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: true }))
    closeIngredientsModal = () => this.setState(() => ({ ingredientsModalOpen: false }))
  	generateShoppingList = () => {
		return this.props.calendar.reduce((result, { meals }) => {
       const { breakfast, lunch, dinner } = meals
 
       breakfast && result.push(breakfast)
       lunch && result.push(lunch)
       dinner && result.push(dinner)
 
       return result
     }, [])
     .reduce((ings, { ingredientLines }) => ings.concat(ingredientLines), []) 		
  		
	}
   	render() {
   		const {isFoodSearchOpen, food, loadingFoods, ingredientsModalOpen} = this.state;
  		const {calendar, remove, selectRecipe} = this.props;
  		const mealOrder = ['breakfast', 'lunch', 'dinner'];
  		console.log('calendar prop:', calendar);
	    return (
	    	<div className="container">

	    		<div className='nav'>
		          <h1 className='header'>UdaciMeals</h1>
		          <button
		            className='shopping-list'
		            onClick={this.openIngredientsModal}>
		              Shopping List
		          </button>
		        </div>
		        <Modal
		          className='modal'
		          overlayClassName='overlay'
		          isOpen={ingredientsModalOpen}
		          onRequestClose={this.closeIngredientsModal}
		          contentLabel='Modal'>
          			{ingredientsModalOpen && <ShoppingList list={this.generateShoppingList()}/>}
        		</Modal>

		    	<ul className='meal-types'>
		    		{
		    			mealOrder.map((meal)=>(
		    				<li key={meal} className='subheader'> {capitalize(meal)} </li>
		    			))
		    		}
		    	</ul>
		    	<div className="calendar">
		    		<div className="days">
		    			{
		    				calendar.map(({day})=>(
		    					<h3 key={day} className='subheader'>{capitalize(day)}</h3>
		    				))
		    			}
		    		</div>
		    		<div className='icon-grid'>
		    		{
		    			calendar.map(({day,meals}) => (
			    			<ul key={day}>
			    				{mealOrder.map((meal) => (
			    					<li key={day+meal} className='meal'>
			    					{
			    						meals[meal] ?
			    							<div className='food-item'>
			    							    <img src={meals[meal].image} alt={meals[meal].label}/>
			    							    <button onClick={() => remove({meal, day})}>Clear</button>
			    							</div> :
			    							<button className='icon-btn'>
			    							    <CalendarIcon onClick={() => this.openFoodSearch({day,meal})} size={30}/>
			    							</button>
			    					}
			    					</li>
			    				))
			    				}
			    			</ul>
		    			))
		    		}
		    		</div>
		    		
		    	</div>

		    	<Modal  className='modal'
          		overlayClassName='overlay'
           		isOpen={isFoodSearchOpen}
           		onRequestClose={this.closeFoodSearch}
           		contentLabel='Modal'>

           		{loadingFoods===true? <Loading delay={200} type='spin' color='#222' className='loading' />
           		: <div className='search-container'>
	                  <h3 className='subheader'>
	                     Find a meal for {capitalize(this.state.day)} {this.state.meal}.
	                   </h3>
	                   <div className='search'>
	                     <input
	                       className='food-input'
	                       type='text'
	                       placeholder='Search Foods'
	                       ref={(input) => this.input = input}
	                     />
	                     <button
	                       className='icon-btn'
	                       onClick={this.searchFood}>
	                         <ArrowRightIcon size={30}/>
	                     </button>
	                   </div>
	                
	                {food!==null && (<FoodList foodList={food} 
	                				selectFood={(recipe)=>
	                				{selectRecipe({day: this.state.day,
	                				recipe, meal: this.state.meal })
	                				this.closeFoodSearch()}}
	                     			/>)
	                }
	              </div>
	            }
			    	
		    	</Modal>

	    	</div>
	    )
	}
}

function mapStateToProps ({ food, calendar }) {
  const dayOrder = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  return {
    calendar: dayOrder.map((day) => ({
      day,
      meals: Object.keys(calendar[day]).reduce((meals, meal) => {
        meals[meal] = calendar[day][meal]
          ? food[calendar[day][meal]]
          : null

        return meals
      }, {})
    })),
    food
  }
}

function mapDispatchToProps(dispatch) {
	return {
		selectRecipe: (data) =>  dispatch(addRecipe(data)),
		remove : (data) => dispatch(removeFromCalender(data))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
