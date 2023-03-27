import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Table from "./Table";

const schema = z.object({
  description: z.string().min(3, { message: "Required" }),
  amount: z.number({ invalid_type_error: "Required" }),
  category: z.string(),
});
type FormData = z.infer<typeof schema>;

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}
export interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseTracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // const expenses = [
  //   { id: 1, description: "aaa", amount: 10, category: "Utilities" },
  //   { id: 2, description: "bbb", amount: 10, category: "Utilities" },
  //   { id: 3, description: "ccc", amount: 10, category: "Utilities" },
  //   { id: 4, description: "ddd", amount: 10, category: "Utilities" },
  // ];

  const [expenses, setExpenses] = useState([]);

  return (
    <div className=" flex flex-col text-black bg-white rounded-md p-4">
      <label htmlFor="desc" className="block text-sm font-medium">
        Description
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="desc"
          id="desc"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Description"
        />
      </div>
      <label htmlFor="amount" className="block text-sm font-medium mt-3">
        Amount
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="amount"
          id="amount"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Description"
        />
      </div>
      <label htmlFor="category" className="block text-sm font-medium mt-3">
        Category
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="category"
          id="category"
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Description"
        />
      </div>
      <Table expenses={expenses} onDelete={(id) => console.log("delete", id)} />
    </div>
  );
};

export default ExpenseTracker;
