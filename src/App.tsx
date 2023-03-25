import React from "react";
import Form from "./components/Form";
import ExpenseTracker from "./components/ExpenseTracker";

const App = () => {
  return (
    <div className="flex justify-center items-center bg-gray-500 min-h-screen">
      {/* <Form /> */}
      <ExpenseTracker />
    </div>
  );
};

export default App;
