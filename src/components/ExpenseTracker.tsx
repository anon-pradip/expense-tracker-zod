import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Table from "./Table";
import Filter from "./Filter";

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
  setExpenses: (expenses: Expense[]) => void;
}

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setExpenses((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
  };

  const finalSelectedValues =
    selectedValue.toLowerCase() === "all categories"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category.toLowerCase() === selectedValue.toLowerCase()
        );

  // const finalSelectedValues ={
  //   if(selectedValue.toLowerCase() === 'all categories'){
  //     return expenses
  //   } else{
  //     return expenses.filter((expense) => expense.category === selectedValue)
  //   }
  // }

  return (
    <div className=" flex flex-col text-black py-4 ">
      <form
        className="bg-white rounded-md p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-sm font-medium">Description</label>
        <div className="mt-1">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Description"
            {...register("description", {
              required: true,
              minLength: 3,
            })}
          />
          <p className="mt-7 text-sm text-red-500">
            {errors.description && (
              <p className="-mt-6 ml-2">{errors.description.message}</p>
            )}
          </p>
        </div>
        <label className="block text-sm font-medium mt-3">Amount</label>
        <div className="mt-1">
          <input
            type="number"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Amount"
            {...register("amount", {
              required: true,
              valueAsNumber: true,
            })}
          />
          <p className="mt-7 text-sm text-red-500">
            {errors.amount && (
              <p className="-mt-6 ml-2">{errors.amount.message}</p>
            )}
          </p>
        </div>
        <label className="block text-sm font-medium mt-3">Category</label>
        <div className="mt-1">
          <input
            type="text"
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Category"
            {...register("category", {
              required: true,
              minLength: 3,
            })}
          />
          <p className="mt-7 text-sm text-red-500">
            {errors.category && (
              <p className="-mt-6 ml-2">{errors.category.message}</p>
            )}
          </p>
        </div>
        <div className="flex justify-center items-center mt-2">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Add
          </button>
        </div>
        <Filter onSelectCategory={(category) => setSelectedValue(category)} />
      </form>
      <div>
        <Table
          expenses={finalSelectedValues}
          onDelete={(id) => console.log("delete", id)}
          setExpenses={setExpenses}
        />
      </div>
    </div>
  );
};

export default ExpenseTracker;
