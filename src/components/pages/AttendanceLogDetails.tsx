import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, CheckCircle, XCircle, Clock, BarChart3, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AttendanceLogDetailsProps {
  child: any;
  semester: string;
  onBack: () => void;
}

const AttendanceLogDetails = ({ child, semester, onBack }: AttendanceLogDetailsProps) => {
  // Generate attendance data based on child's performance
  const generateAttendanceData = () => {
    const attendanceRate = child.performance.attendance;
    const days = 15;
    const presentDays = Math.floor((attendanceRate / 100) * days);
    const absentDays = days - presentDays;
    
    const attendanceData = [];
    const today = new Date();
    
    for (let i = 0; i < days; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
      const dateStr = date.toISOString().split('T')[0];
      
      const isPresent = i < presentDays;
      const status = isPresent ? 'Present' : 'Absent';
      const time = isPresent ? `08:${25 + Math.floor(Math.random() * 10)} AM` : '-';
      const reason = isPresent ? '-' : 'Illness';
      const notes = isPresent ? 
        (Math.random() > 0.8 ? 'Early arrival' : 
         Math.random() > 0.6 ? 'Slight delay due to traffic' : 'On time') : 
        'Doctor\'s note provided';
      
      attendanceData.push({
        date: dateStr,
        day: dayName,
        status,
        time,
        reason,
        notes
      });
    }
    
    return attendanceData.reverse();
  };

  const attendanceData = generateAttendanceData();

  // Calculate statistics
  const totalDays = attendanceData.length;
  const presentDays = attendanceData.filter(day => day.status === 'Present').length;
  const absentDays = attendanceData.filter(day => day.status === 'Absent').length;
  const attendanceRate = ((presentDays / totalDays) * 100).toFixed(1);

  // PDF generation handler
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Attendance Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${child.name}`, 14, 24);
    doc.text(`Semester: ${semester}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    // Statistics section
    doc.setFontSize(12);
    doc.text('Attendance Statistics:', 14, 50);
    doc.setFontSize(10);
    doc.text(`Total Days: ${totalDays}`, 14, 60);
    doc.text(`Days Present: ${presentDays}`, 14, 67);
    doc.text(`Days Absent: ${absentDays}`, 14, 74);
    doc.text(`Attendance Rate: ${attendanceRate}%`, 14, 81);

    // Attendance table
    autoTable(doc, {
      startY: 95,
      head: [['Date', 'Day', 'Status', 'Time', 'Reason', 'Notes']],
      body: attendanceData.map(day => [
        day.date,
        day.day,
        day.status,
        day.time,
        day.reason,
        day.notes
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      theme: 'striped',
    });

    doc.save(`Attendance_Report_${child.name}_${semester.replace(/\s/g, '_')}.pdf`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present':
        return 'bg-green-100 text-green-700';
      case 'Absent':
        return 'bg-red-100 text-red-700';
      case 'Late':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Present':
        return <CheckCircle className="w-4 h-4" />;
      case 'Absent':
        return <XCircle className="w-4 h-4" />;
      case 'Late':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      className="max-w-6xl mx-auto py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Attendance Log</h1>
          <div className="text-gray-500">Detailed attendance record for {semester}</div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleGeneratePDF}
          >
            <FileText className="w-4 h-4" />
            Generate PDF
          </Button>
          <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Overview
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        >
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{presentDays}</div>
            <div className="text-xs text-gray-600">Days Present</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        >
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-red-100 rounded-lg">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-600">{absentDays}</div>
            <div className="text-xs text-gray-600">Days Absent</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        >
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{attendanceRate}%</div>
            <div className="text-xs text-gray-600">Attendance Rate</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        >
          <Card className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Clock className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">08:30</div>
            <div className="text-xs text-gray-600">Avg. Arrival Time</div>
          </Card>
        </motion.div>
      </div>

      {/* Attendance Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Daily Attendance Record</h2>
          <div className="text-sm text-gray-500">Showing last 15 days</div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {attendanceData.map((day, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{day.date}</TableCell>
                <TableCell>{day.day}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${getStatusColor(day.status)}`}>
                    {getStatusIcon(day.status)}
                    {day.status}
                  </span>
                </TableCell>
                <TableCell>{day.time}</TableCell>
                <TableCell>{day.reason}</TableCell>
                <TableCell className="text-sm text-gray-600">{day.notes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Summary */}
      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Consistent attendance pattern</li>
              <li>• Usually arrives on time or early</li>
              <li>• Good communication when absent</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Areas for Improvement</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Occasional slight delays due to traffic</li>
              <li>• One absence due to illness (with documentation)</li>
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default AttendanceLogDetails; 