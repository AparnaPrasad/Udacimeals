import {ADD_RECIPE, REMOVE_FROM_CALENDER} from '../actions';
const initialState = {
	monday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	tuesday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	wednesday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	thursday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	friday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	saturday:{
		brakfast: null,
		lunch: null,
		dinner: null
	},
	sunday:{
		brakfast: null,
		lunch: null,
		dinner: null
	}
}

export function calender( state = initialState, action) {
	const {day, meal, recipe} = action;
	switch (action.type) {
		case ADD_RECIPE:
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