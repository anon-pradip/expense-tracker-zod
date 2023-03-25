// const Table = ({
//   allData,
//   setAllData,
// }: {
//   allData: { description: string; amount: number; category: string } | null;
//   setAllData: any;
// }) => {
//   if (!allData) {
//     return <div>No data available</div>;
//   }
//   console.log(allData);
//   return <h1>hello</h1>;
// };

// export default Table;
import React from "react";

const Table = ({ allData, setAllData }: { allData: any; setAllData: any }) => {
  return (
    <>
      <p>all data</p>
      <div>{allData.description}</div>
    </>
  );
};

export default Table;
