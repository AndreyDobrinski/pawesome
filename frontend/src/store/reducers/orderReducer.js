const initialState = {
  orders: []
}

export function orderReducer(state = initialState, action) {
  switch (action.type) {
      case 'ADD_ORDER':
          return { ...state, orders: [...state.orders, action.order] }
      case 'UPD_ORDER':
          let index = state.orders.findIndex(el => el._id === action.newOrder._id)
          return { ...state, orders: [...state.orders.slice(0, index), action.newOrder, ...state.orders.slice(index + 1)] }
      default:
          return state
  }
}

