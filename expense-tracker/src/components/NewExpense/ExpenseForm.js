import React, { useState } from "react";

import "./ExpenseForm.css";

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredAmount, setEnteredAmount] = useState("");
  const [enteredDate, setEnteredDate] = useState("");

  //can also do the following instead of abovc:
  //const [userInput, setUserInput] = useState({
  //   enteredTitle: "",
  //   enteredAmount: "",
  //   enteredDate: "",
  // })

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);

    //if only one useState is used the following must be used, this method may cause issues though because it depends on previous state
    //see the next setUserInput function for the proper usage
    //setUserInput({
    //   ...userInput, //this is a spread operator (...) it copies the key value pairs from the object userInput
    //   enteredTitle: event.target.value, //then the key value pair we are interested in is overwritten
    // })

    //this method will always use the latest state version, while the previous version may not use the latest version if many states are 
    //scheduled to run at the same time (remember states aren't updated instantaneously they are scheduled)
    //setUserInput((prevState) => {
    // return {...prevState, enteredTitle: event.target.value};
    // });
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);

  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);

  };

  const submitHandler = (event) => {
    //stops default action of reloading page when form is submitted
    event.preventDefault();

    const expenseData = {
      title: enteredTitle,
      amount: enteredAmount,
      date: new Date(enteredDate),
    };
    
    props.onSaveExpenseData(expenseData);
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input type="text" value={enteredTitle} onChange={titleChangeHandler} />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            value={enteredAmount}
            onChange={amountChangeHandler}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={enteredDate}
            onChange={dateChangeHandler}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="submit">Add Expense</button>
      </div>
    </form>
  );
};

export default ExpenseForm;
