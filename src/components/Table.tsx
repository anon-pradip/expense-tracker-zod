const Table = ({
  allData,
  setAllData,
}: {
  allData: { description: string; amount: number; category: string } | null;
  setAllData: any;
}) => {
  if (!allData) {
    return <div>No data available</div>;
  }
  console.log(allData);
  return <div>{allData.amount}</div>;
};

export default Table;
