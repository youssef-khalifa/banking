import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.ammount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.ammount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };

    default:
      return state;
  }
}
const store = createStore(reducer);

store.dispatch({ type: "account/deposit", payload: 500 });

function withdraw(ammount) {
  return { type: "account/withdraw", payload: ammount };
}
function requestLoan(ammount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { ammount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}
