import {ADD_RECIPE, REMOVE_FROM_CALENDER} from '../actions';
const initialState = {
	monday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	tuesday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	wednesday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	thursday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	friday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	saturday:{
		breakfast: null,
		lunch: null,
		dinner: null
	},
	sunday:{
		breakfast: null,
		lunch: null,
		dinner: null
	}
}

export default function calender( state = initialState, action) {
	const {day, meal, recipe} = action;
	switch (action.type) {
		case ADD_RECIPE:
			console.log('in reducer');
			return {
				...state, [day]: {
					...state[day],
					[meal]: recipe.label
				}
			}
		case REMOVE_FROM_CALENDER: 
			return {
				...state, [day]:{
					...state[day],
					[meal]: null
				}
			}
			
		default:
			return state;

	}
}
