function StatsCards() {
  return (
    <div className="grid grid-cols-3 gap-6 mb-8">

      <div className="bg-slate-800 text-white p-6 rounded-xl shadow">
        <h3>Total Employees</h3>
        <p className="text-3xl font-bold mt-2">25</p>
      </div>

      <div className="bg-slate-800 text-white p-6 rounded-xl shadow">
        <h3>Departments</h3>
        <p className="text-3xl font-bold mt-2">5</p>
      </div>

      <div className="bg-slate-800 text-white p-6 rounded-xl shadow">
        <h3>Average Salary</h3>
        <p className="text-3xl font-bold mt-2">₹52K</p>
      </div>

    </div>
  );
}

export default StatsCards;