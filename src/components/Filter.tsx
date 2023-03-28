import React from "react";

interface Props {
  onSelectCategory: (category: string) => void;
}

const Filter = ({ onSelectCategory }: Props) => {
  return (
    <>
      <select
        className=" rounded-md my-3"
        onChange={(e) => {
          onSelectCategory(e.target.value);
        }}
      >
        <option value="All categories">All Categories</option>
        <option value="Groceries">Groceries</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
    </>
  );
};

export default Filter;
