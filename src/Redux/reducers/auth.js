import Types from '../types';

const initial_state = {
  userData: {},
};

export default function (state = initial_state, action) {
  switch (action.type) {
    case Types.LOGIN: {
      return {...state, userData: action.payload};
    }
    case Types.USER_LOGOUT: {
      return {...initial_state};
    }

    default: {
      return state;
    }
  }
}
