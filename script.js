// DOM elements
const valueEl = document.getElementById('value')
const plusBtn = document.getElementById('plus')
const minusBtn = document.getElementById('minus')
const plusFiveBtn = document.getElementById('plus-five')
const minusFiveBtn = document.getElementById('minus-five')
const ifOddBtn = document.getElementById('increment-odd')
const asyncBtn = document.getElementById('increment-async')
const customInput = document.getElementById('custom-amount')
const customBtn = document.getElementById('submit-custom')

// initial state value
const initialState = {
    value: 0
}

// reducer
const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'counter/incremented':
            return { value: state.value + 1 }
        case 'counter/decremented':
            return { value: state.value - 1 }
        case 'counter/incrementFive':
            return { value: state.value + 5 }
        case 'counter/decrementFive':
            return { value: state.value - 5 }
        case 'counter/custom':
            return { value: state.value + action.payload }
        default:
            return state
    }
}

// action object definitions
const addAction = {
  type: 'counter/incremented'
}

const subAction = {
  type: 'counter/decremented'
}

const addFiveAction = {
    type: 'counter/incrementFive'
}

const subFiveAction = {
    type: 'counter/decrementFive'
}

let customAction = {
    type: 'counter/custom'
}

// generating the store
let store = Redux.createStore(counterReducer)

// defining render
const render = () => {
    const state = store.getState()
    valueEl.innerHTML = state.value.toString()
}

// establishing dispatch functions
const addOne = () => {
  store.dispatch(addAction)
}

const subOne = () => {
  store.dispatch(subAction)
}

const addFive = () => {
    store.dispatch(addFiveAction)
}

const subFive = () => {
    store.dispatch(subFiveAction)
}

const incrementIfOdd = () => {
    state = store.getState()
    if (state.value % 2 !== 0) {
        store.dispatch(addAction)
    }
}

const incrementAsync = () => {
    setTimeout(() => {
        store.dispatch(addAction)
    }, 1000);
}

const changeCustom = () => {
    customAction = {...customAction, payload: +customInput.value}
    store.dispatch(customAction)
}

// event listeners
plusBtn.addEventListener('click', addOne)
minusBtn.addEventListener('click', subOne)
plusFiveBtn.addEventListener('click', addFive)
minusFiveBtn.addEventListener('click', subFive)
ifOddBtn.addEventListener('click', incrementIfOdd)
asyncBtn.addEventListener('click', incrementAsync)
customBtn.addEventListener('click', changeCustom)

// initial render
render()

// subscribe reruns render on dispatch
store.subscribe(render)