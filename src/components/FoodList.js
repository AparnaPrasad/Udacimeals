import React, { Component } from 'react';
class FoodList extends Component {
render() {

		const {foodList, selectFood} = this.props;
			console.log('foodList', foodList);
			if(foodList.length===0)
			{
				return(<p>Your search has 0 results</p>)
			}
			return (
				<ul className='food-list'>
					{foodList.map((food) => (
						<li onClick={()=>selectFood(food)} key={food.label}>
							<h3>{food.label}</h3>
							<img src={food.image} alt={food.label}/>
							<div>{Math.floor(food.calories)} Calories</div>
		          			<div>{food.source}</div>
	          			</li>
	          		))}
	          	</ul>
			);
	}

}

export default FoodList;