import React, { useEffect, useState } from 'react';
import '../components/components.css'; // Add your CSS styles for responsive table

const ReportPage = () => {
  const [reportData, setReportData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('reportData'));
    if (data) {
      setReportData(data);
      const total = data.reduce((sum, item) => sum + item.cost, 0);
      setTotalCost(total);
    }
  }, []);

  return (
    <div className="report-container">
      <h2>Expense Report</h2>
      <table className="report-table">
        <thead>
          <tr>
            <th>Truck ID</th>
            <th>Cost</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {reportData.map((expense) => (
            <tr key={expense.truckId}>
              <td>{expense.truckId}</td>
              <td>{expense.cost}</td>
              <td>{expense.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-cost">
        <strong>Total Cost: </strong>{totalCost}
      </div>
    </div>
  );
};

export default ReportPage;