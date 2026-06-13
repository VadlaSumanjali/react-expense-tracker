import React, { useState } from "react";

const App = () => {
  const [salary, setSalary] = useState("");
  const [savedSalary, setSavedSalary] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseTitle, setExpenseTitle] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  const salaryAdd = (e) => {
    e.preventDefault();

    if (!salary) {
      alert("Please enter your salary");
      return;
    }

    setSavedSalary(salary);
    setSalary("");
  };

  const addExpense = () => {
    if (!expenseTitle || !expenseAmount) {
      alert("Please fill all fields");
      return;
    }

    const expense = {
      title: expenseTitle,
      amount: Number(expenseAmount),
    };

    setExpenses([...expenses, expense]);

    setExpenseTitle("");
    setExpenseAmount("");
  };

  const deleteExpense = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const resetSalary = () => {
    setSavedSalary("");
    setExpenses([]);
    setExpenseTitle("");
    setExpenseAmount("");
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const remainingBalance = Number(savedSalary) - totalExpenses;

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-5">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Expense Tracker
        </h1>

        {!savedSalary ? (
          <form onSubmit={salaryAdd} className="space-y-4">
            <input
              type="number"
              placeholder="Enter Monthly Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            >
              Save Salary
            </button>
          </form>
        ) : (
          <>
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Monthly Salary: ₹{savedSalary}
              </h2>
            </div>

            <button
              onClick={resetSalary}
              className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 mb-6"
            >
              Reset Salary
            </button>

            <h3 className="text-lg font-semibold mb-3">Add Expense</h3>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Expense Title"
                value={expenseTitle}
                onChange={(e) => setExpenseTitle(e.target.value)}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <input
                type="number"
                placeholder="Expense Amount"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />

              <button
                onClick={addExpense}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
              >
                Add Expense
              </button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Expense List</h3>

              {expenses.length === 0 ? (
                <p className="text-gray-500 text-center">
                  No expenses added yet.
                </p>
              ) : (
                expenses.map((expense, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-50 border rounded-lg p-3 mb-2"
                  >
                    <div>
                      <p className="font-medium">{expense.title}</p>
                      <p className="text-red-500">₹{expense.amount}</p>
                    </div>

                    <button
                      onClick={() => deleteExpense(index)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 space-y-3">
              <div className="bg-red-50 p-3 rounded-lg">
                <h3 className="font-semibold text-red-600">
                  Total Expenses: ₹{totalExpenses}
                </h3>
              </div>

              <div className="bg-green-50 p-3 rounded-lg">
                <h3 className="font-semibold text-green-600">
                  Remaining Balance: ₹{remainingBalance}
                </h3>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;