import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, TrendingUp, TrendingDown, MoveRight, Smile, ChevronDown, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import SubjectGradesDetails from './SubjectGradesDetails';
import AttendanceLogDetails from './AttendanceLogDetails';
import BehaviorLogDetails from './BehaviorLogDetails';
import AllGradesDetails from './AllGradesDetails';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ViewFullPerformance = ({ child, onBack }: { child: any, onBack: () => void }) => {
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [showSubjectDetails, setShowSubjectDetails] = useState(false);
  const [showAttendanceDetails, setShowAttendanceDetails] = useState(false);
  const [showBehaviorDetails, setShowBehaviorDetails] = useState(false);
  const [showAllGrades, setShowAllGrades] = useState(false);
  
  // Use actual child data
  const { name, grade, performance } = child;
  
  // Semester options
  const semesters = [
    { value: 'current', label: 'Current Semester' },
    { value: 'previous', label: 'Previous Semester' },
    { value: 'fall2023', label: 'Fall 2023' },
    { value: 'spring2023', label: 'Spring 2023' },
    { value: 'fall2022', label: 'Fall 2022' },
  ];

  // Generate semester data based on child's performance
  const generateSemesterData = (semester: string) => {
    const baseGPA = typeof performance.gpa === 'string' ? parseFloat(performance.gpa) : performance.gpa;
    const baseSubjects = performance.subjects || [];
    
    // Create variations based on semester
    const variations = {
      current: { gpaChange: '+0.2', trend: 'up' },
      previous: { gpaChange: '-0.1', trend: 'down' },
      fall2023: { gpaChange: '+0.3', trend: 'up' },
      spring2023: { gpaChange: '+0.1', trend: 'up' },
      fall2022: { gpaChange: '+0.2', trend: 'up' }
    };
    
    const variation = variations[semester as keyof typeof variations];
    const semesterGPA = Math.max(3.0, Math.min(4.0, baseGPA + parseFloat(variation.gpaChange)));
    
    return {
      gpa: semesterGPA,
      gpaChange: variation.gpaChange,
      subjects: baseSubjects.map((subj: any) => ({
        ...subj,
        percentage: Math.round((Math.max(70, Math.min(100, subj.percentage + (Math.random() - 0.5) * 10))) * 10) / 10
      })),
      recentGrades: baseSubjects.slice(0, 3).map((subj: any) => ({
        subject: subj.subject,
        grade: subj.grade,
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }))
    };
  };

  const currentData = generateSemesterData(selectedSemester);

  // PDF generation handlers
  const handleGenerateSubjectGradesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Subject Grades Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${name}`, 14, 24);
    doc.text(`Semester: ${semesters.find(s => s.value === selectedSemester)?.label}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      startY: 50,
      head: [['Subject', 'Grade', 'Percentage', 'Trend']],
      body: (currentData.subjects || []).map((subj: any) => [
        subj.subject,
        subj.grade,
        `${subj.percentage}%`,
        subj.trendLabel
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      theme: 'striped',
    });

    doc.save(`Subject_Grades_${name}_${selectedSemester}.pdf`);
  };

  const handleGenerateAttendancePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Attendance Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${name}`, 14, 24);
    doc.text(`Semester: ${semesters.find(s => s.value === selectedSemester)?.label}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      startY: 50,
      head: [['Date', 'Status', 'Reason']],
      body: [
        ['2024-05-15', 'Present', '-'],
        ['2024-05-14', 'Present', '-'],
        ['2024-05-13', 'Absent', 'Illness']
      ],
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      theme: 'striped',
    });

    doc.save(`Attendance_${name}_${selectedSemester}.pdf`);
  };

  const handleGenerateRecentGradesPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Recent Grades Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${name}`, 14, 24);
    doc.text(`Semester: ${semesters.find(s => s.value === selectedSemester)?.label}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    autoTable(doc, {
      startY: 50,
      head: [['Subject', 'Grade', 'Date']],
      body: (currentData.recentGrades || []).map((grade: any) => [
        grade.subject,
        grade.grade,
        grade.date
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      theme: 'striped',
    });

    doc.save(`Recent_Grades_${name}_${selectedSemester}.pdf`);
  };

  // Show detail components with child data
  if (showSubjectDetails) {
    return <SubjectGradesDetails child={child} semester={selectedSemester} onBack={() => setShowSubjectDetails(false)} />;
  }

  if (showAttendanceDetails) {
    return <AttendanceLogDetails child={child} semester={selectedSemester} onBack={() => setShowAttendanceDetails(false)} />;
  }

  if (showBehaviorDetails) {
    return <BehaviorLogDetails child={child} semester={selectedSemester} onBack={() => setShowBehaviorDetails(false)} />;
  }

  if (showAllGrades) {
    return <AllGradesDetails child={child} semester={selectedSemester} onBack={() => setShowAllGrades(false)} />;
  }

  return (
    <motion.div
      className="max-w-5xl mx-auto py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Student Performance Overview</h1>
          <div className="text-gray-500">Track academic progress and identify areas for improvement.</div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-700">Semester:</span>
            <Select value={selectedSemester} onValueChange={setSelectedSemester}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select semester" />
              </SelectTrigger>
              <SelectContent>
                {semesters.map((semester) => (
                  <SelectItem key={semester.value} value={semester.value}>
                    {semester.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" onClick={onBack}>Back</Button>
        </div>
      </div>
      {/* GPA and Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div 
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          className="h-full"
        >
          <Card className="p-4 h-full flex flex-col justify-between">
            <div className="text-gray-500 font-medium mb-1">Current GPA</div>
            <div className="text-3xl font-bold mb-1">{currentData.gpa}</div>
            <div className="flex items-center gap-2 text-green-600 text-sm font-medium mb-2">
              <TrendingUp className="w-4 h-4" /> {currentData.gpaChange} vs last period
            </div>
            <div className="h-2 bg-gray-200 rounded-full w-full">
              <div 
                className="h-2 bg-blue-600 rounded-full" 
                style={{ 
                  width: `${Math.min(100, Math.max(0, (typeof currentData.gpa === 'number' ? currentData.gpa : parseFloat(currentData.gpa) || 0) / 4 * 100))}%` 
                }}
              ></div>
            </div>
          </Card>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          className="h-full"
        >
          <Card className="p-4 h-full flex flex-col justify-between">
            <div className="text-gray-500 font-medium mb-1">Overall Performance Summary</div>
            <div className="flex flex-wrap gap-3 mb-2">
              <div className="flex items-center gap-2 text-gray-700"><span className="font-bold">Total Subjects</span> 5</div>
              <div className="flex items-center gap-2 text-green-600"><CheckCircle className="w-4 h-4" /> Passed Subjects 5</div>
              <div className="flex items-center gap-2 text-yellow-600">Attendance Rate 98%</div>
              <div className="flex items-center gap-2 text-blue-600">Top Subject <span className="font-bold">Art (95%)</span></div>
            </div>
            <div className="text-gray-500 text-xs">This summary provides a quick glance at the student's overall academic standing for the selected period.</div>
          </Card>
        </motion.div>
      </div>
      {/* Subject Grades */}
      <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }} className="mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Subject Grades</div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleGenerateSubjectGradesPDF}
              >
                <FileText className="w-4 h-4" />
                Generate PDF
              </Button>
              <Button variant="link" className="text-blue-600 px-0" onClick={() => setShowSubjectDetails(true)}>View All Details</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Trend</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(currentData.subjects || []).map((subj: any, idx: number) => (
                <TableRow key={subj.subject}>
                  <TableCell className="font-medium text-gray-900">{subj.subject}</TableCell>
                  <TableCell>{subj.grade}</TableCell>
                  <TableCell>{subj.percentage}%</TableCell>
                  <TableCell className={`flex items-center gap-1 ${subj.trendColor}`}>
                    {subj.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {subj.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    {subj.trend === 'stable' && <MoveRight className="w-4 h-4" />}
                    {subj.trendLabel}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
      {/* Attendance & Behavior */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <motion.div 
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          className="h-full"
        >
          <Card className="p-6 h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="font-semibold text-lg">Attendance</div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                  onClick={handleGenerateAttendancePDF}
                >
                  <FileText className="w-4 h-4" />
                  Generate PDF
                </Button>
                <Button variant="link" className="text-blue-600 px-0" onClick={() => setShowAttendanceDetails(true)}>View Full Attendance Log</Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reason</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>2024-05-15</TableCell>
                  <TableCell><span className="bg-green-100 text-green-700 px-2 py-1 rounded">Present</span></TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-05-14</TableCell>
                  <TableCell><span className="bg-green-100 text-green-700 px-2 py-1 rounded">Present</span></TableCell>
                  <TableCell>-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2024-05-13</TableCell>
                  <TableCell><span className="bg-red-100 text-red-700 px-2 py-1 rounded">Absent</span></TableCell>
                  <TableCell>Illness</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Card>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          className="h-full"
        >
          <Card className="p-6 h-full flex flex-col items-center justify-center">
            <div className="flex items-center justify-between w-full mb-4">
              <div className="font-semibold text-lg">Behavior Incidents</div>
              <Button variant="link" className="text-blue-600 px-0" onClick={() => setShowBehaviorDetails(true)}>View Behavior Log</Button>
            </div>
            <div className="flex flex-col items-center justify-center flex-1 h-32">
              <Smile className="w-10 h-10 text-green-500 mb-2" />
              <div className="text-green-700 font-semibold">No behavior incidents reported for this period. Great job!</div>
            </div>
          </Card>
        </motion.div>
      </div>
      {/* Recent Grades */}
      <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }} className="mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-lg">Recent Grades</div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={handleGenerateRecentGradesPDF}
              >
                <FileText className="w-4 h-4" />
                Generate PDF
              </Button>
              <Button variant="link" className="text-blue-600 px-0" onClick={() => setShowAllGrades(true)}>View All Grades</Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Subject</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(currentData.recentGrades || []).map((grade: any, idx: number) => (
                <TableRow key={idx}>
                  <TableCell>{grade.subject}</TableCell>
                  <TableCell>{grade.grade}</TableCell>
                  <TableCell>{grade.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default ViewFullPerformance; 