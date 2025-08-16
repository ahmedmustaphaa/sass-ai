import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function General() {
  // بيانات عينة للعرض
  const data = [
    { name: 'Jan', uv: 400 },
    { name: 'Feb', uv: 300 },
    { name: 'Mar', uv: 500 },
    { name: 'Apr', uv: 200 },
    { name: 'May', uv: 350 },
  ];

  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default General;
