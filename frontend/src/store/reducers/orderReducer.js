const initialState = {
  orders: []
}

export function orderReducer(state = initialState, action) {
  switch (action.type) {
      case 'SET_ORDERS':
          return { ...state, orders: action.orders }
      case 'ADD_ORDER':
          return { ...state, orders: [...state.orders, action.order] }
      case 'UPDATE_ORDER':
          let index = state.orders.findIndex(order => order._id === action.newOrder._id)
          return { ...state, orders: [...state.orders.slice(0, index), action.newOrder, ...state.orders.slice(index + 1)] }
      default:
          return state
  }
}

