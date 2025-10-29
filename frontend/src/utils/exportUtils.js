// Export utilities for attendance data

/**
 * Export attendance records to CSV
 */
export const exportToCSV = (data, filename = 'attendance-records') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Define CSV headers
  const headers = ['ID', 'Employee Name', 'Employee ID', 'Date', 'Status', 'Recorded At'];
  
  // Convert data to CSV rows
  const csvRows = data.map(record => [
    record.id,
    record.employeeName,
    record.employeeID,
    new Date(record.date).toLocaleDateString(),
    record.status,
    new Date(record.timestamp).toLocaleString()
  ]);
  
  // Combine headers and rows
  const csvContent = [
    headers.join(','),
    ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export attendance records to Excel-compatible format
 */
export const exportToExcel = (data, filename = 'attendance-records') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Create HTML table format (Excel can open this)
  const headers = ['ID', 'Employee Name', 'Employee ID', 'Date', 'Status', 'Recorded At'];
  
  let htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background-color: #4CAF50; color: white; }
          tr:nth-child(even) { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        <h2>Attendance Records</h2>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <table>
          <thead>
            <tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
  `;
  
  data.forEach(record => {
    htmlContent += `
      <tr>
        <td>${record.id}</td>
        <td>${record.employeeName}</td>
        <td>${record.employeeID}</td>
        <td>${new Date(record.date).toLocaleDateString()}</td>
        <td>${record.status}</td>
        <td>${new Date(record.timestamp).toLocaleString()}</td>
      </tr>
    `;
  });
  
  htmlContent += `
          </tbody>
        </table>
      </body>
    </html>
  `;
  
  // Create blob and download
  const blob = new Blob([htmlContent], { type: 'application/vnd.ms-excel' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.xls`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

/**
 * Export statistics report to PDF-ready HTML
 */
export const exportStatisticsReport = (stats, records, dateRange = '') => {
  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #2563eb; }
          .summary { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .stat-box { display: inline-block; margin: 10px; padding: 15px; background: white; border: 2px solid #e5e7eb; border-radius: 8px; }
          .stat-label { font-size: 14px; color: #6b7280; }
          .stat-value { font-size: 32px; font-weight: bold; color: #1f2937; }
          table { border-collapse: collapse; width: 100%; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #2563eb; color: white; }
          .present { color: #10b981; font-weight: bold; }
          .absent { color: #ef4444; font-weight: bold; }
          .footer { margin-top: 30px; text-align: center; color: #6b7280; }
        </style>
      </head>
      <body>
        <h1>📊 Attendance Report</h1>
        <div class="summary">
          <h2>Summary Statistics ${dateRange ? `(${dateRange})` : ''}</h2>
          <div class="stat-box">
            <div class="stat-label">Total Records</div>
            <div class="stat-value">${stats.total || 0}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Present</div>
            <div class="stat-value" style="color: #10b981">${stats.present || 0}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Absent</div>
            <div class="stat-value" style="color: #ef4444">${stats.absent || 0}</div>
          </div>
          <div class="stat-box">
            <div class="stat-label">Attendance Rate</div>
            <div class="stat-value">${stats.total ? Math.round((stats.present / stats.total) * 100) : 0}%</div>
          </div>
        </div>
        
        <h2>Detailed Records</h2>
        <table>
          <thead>
            <tr>
              <th>Employee Name</th>
              <th>Employee ID</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${records.map(record => `
              <tr>
                <td>${record.employeeName}</td>
                <td>${record.employeeID}</td>
                <td>${new Date(record.date).toLocaleDateString()}</td>
                <td class="${record.status.toLowerCase()}">${record.status}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        
        <div class="footer">
          <p>Generated on ${new Date().toLocaleString()}</p>
          <p>Employee Attendance Tracker System</p>
        </div>
      </body>
    </html>
  `;
  
  // Open in new window for printing/PDF
  const printWindow = window.open('', '', 'height=600,width=800');
  printWindow.document.write(htmlContent);
  printWindow.document.close();
  printWindow.focus();
  
  // Auto-trigger print dialog
  setTimeout(() => {
    printWindow.print();
  }, 250);
};

/**
 * Calculate attendance percentage for an employee
 */
export const calculateAttendanceRate = (records, employeeID) => {
  const employeeRecords = records.filter(r => r.employeeID === employeeID);
  if (employeeRecords.length === 0) return 0;
  
  const presentCount = employeeRecords.filter(r => r.status === 'Present').length;
  return Math.round((presentCount / employeeRecords.length) * 100);
};

/**
 * Group records by employee
 */
export const groupByEmployee = (records) => {
  const grouped = {};
  
  records.forEach(record => {
    if (!grouped[record.employeeID]) {
      grouped[record.employeeID] = {
        name: record.employeeName,
        id: record.employeeID,
        records: [],
        present: 0,
        absent: 0
      };
    }
    
    grouped[record.employeeID].records.push(record);
    if (record.status === 'Present') {
      grouped[record.employeeID].present++;
    } else {
      grouped[record.employeeID].absent++;
    }
  });
  
  return Object.values(grouped);
};

/**
 * Get attendance trends (last 7 days)
 */
export const getAttendanceTrends = (records, days = 7) => {
  const today = new Date();
  const trends = [];
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    const dayRecords = records.filter(r => {
      const recordDate = new Date(r.date).toISOString().split('T')[0];
      return recordDate === dateStr;
    });
    
    trends.push({
      date: dateStr,
      present: dayRecords.filter(r => r.status === 'Present').length,
      absent: dayRecords.filter(r => r.status === 'Absent').length,
      total: dayRecords.length
    });
  }
  
  return trends;
};
