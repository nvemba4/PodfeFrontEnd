import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, Award, TrendingUp, TrendingDown, Calendar, BookOpen, Filter, FileText } from 'lucide-react';
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
import { Chart } from '../ui/chart';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AllGradesDetailsProps {
  child: any;
  semester: string;
  onBack: () => void;
}

const AllGradesDetails = ({ child, semester, onBack }: AllGradesDetailsProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  const [selectedType, setSelectedType] = useState('all');

  // Generate grade history based on child's performance
  const generateGradeHistory = () => {
    const { performance } = child;
    const subjects = performance?.subjects || [];
    const gradeHistory = [];
    
    // Generate historical data for each subject
    subjects.forEach((subject: any) => {
      const baseGrade = subject.grade;
      const basePercentage = subject.percentage;
      
      // Generate assignments for the past 6 months
      for (let i = 0; i < 8; i++) {
        const date = new Date();
        date.setMonth(date.getMonth() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        // Create grade variations
        const gradeVariation = (Math.random() - 0.5) * 10;
        const newPercentage = Math.max(70, Math.min(100, basePercentage + gradeVariation));
        
        // Convert percentage to letter grade
        const getLetterGrade = (percentage: number) => {
          if (percentage >= 93) return 'A';
          if (percentage >= 90) return 'A-';
          if (percentage >= 87) return 'B+';
          if (percentage >= 83) return 'B';
          if (percentage >= 80) return 'B-';
          if (percentage >= 77) return 'C+';
          if (percentage >= 73) return 'C';
          if (percentage >= 70) return 'C-';
          return 'D';
        };
        
        const assignmentTypes = ['Quiz', 'Test', 'Project', 'Homework', 'Exam', 'Lab'];
        const type = assignmentTypes[Math.floor(Math.random() * assignmentTypes.length)];
        
        gradeHistory.push({
          id: gradeHistory.length + 1,
          subject: subject.subject,
          assignment: `${subject.subject} ${type}`,
          type,
          grade: getLetterGrade(newPercentage),
          percentage: Math.round(newPercentage),
          date: dateStr,
          weight: Math.floor(Math.random() * 30) + 10,
          semester: i < 4 ? 'Current' : 'Previous'
        });
      }
    });
    
    return gradeHistory.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const allGrades = generateGradeHistory() || [];

  // Filter grades based on selected period and type
  const filteredGrades = allGrades.filter(grade => {
    const periodMatch = selectedPeriod === 'all' || grade.semester === selectedPeriod;
    const typeMatch = selectedType === 'all' || grade.type === selectedType;
    return periodMatch && typeMatch;
  });

  // Calculate statistics
  const totalAssignments = filteredGrades.length;
  const averageGrade = totalAssignments > 0 ? 
    Math.round((filteredGrades || []).reduce((sum, grade) => sum + grade.percentage, 0) / totalAssignments) : 0;
  const highestGrade = totalAssignments > 0 ? Math.max(...(filteredGrades || []).map(grade => grade.percentage)) : 0;
  const lowestGrade = totalAssignments > 0 ? Math.min(...(filteredGrades || []).map(grade => grade.percentage)) : 0;

  // Prepare chart data
  const chartData = (filteredGrades || []).length > 0 ? {
    labels: (filteredGrades || []).slice(0, 10).map(grade => grade.assignment),
    datasets: [
      {
        label: 'Grade Percentage',
        data: (filteredGrades || []).slice(0, 10).map(grade => grade.percentage),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
      }
    ]
  } : {
    labels: [],
    datasets: [{
      label: 'No Data',
      data: [],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
    }]
  };

  // PDF generation handler
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Grade History Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${child.name}`, 14, 24);
    doc.text(`Semester: ${semester}`, 14, 30);
    doc.text(`Period: ${selectedPeriod === 'all' ? 'All' : selectedPeriod}`, 14, 36);
    doc.text(`Type: ${selectedType === 'all' ? 'All' : selectedType}`, 14, 42);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 48);

    // Statistics section
    doc.setFontSize(12);
    doc.text('Grade Statistics:', 14, 60);
    doc.setFontSize(10);
    doc.text(`Total Assignments: ${totalAssignments}`, 14, 70);
    doc.text(`Average Grade: ${averageGrade}%`, 14, 77);
    doc.text(`Highest Grade: ${highestGrade}%`, 14, 84);
    doc.text(`Lowest Grade: ${lowestGrade}%`, 14, 91);

    // Grade table
    autoTable(doc, {
      startY: 105,
      head: [['Date', 'Subject', 'Assignment', 'Type', 'Grade', 'Percentage', 'Weight']],
      body: (filteredGrades || []).map(grade => [
        grade.date,
        grade.subject,
        grade.assignment,
        grade.type,
        grade.grade,
        `${grade.percentage}%`,
        `${grade.weight}%`
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [59, 130, 246] },
      margin: { left: 14, right: 14 },
      theme: 'striped',
    });

    doc.save(`Grade_History_${child.name}_${semester.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <motion.div
      className="max-w-7xl mx-auto py-8"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">All Grades</h1>
          <div className="text-gray-500">Comprehensive grade history for {semester}</div>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Overview
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold">Filters</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Period/Type</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {['all', 'recent', 'midterm', 'quizzes'].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Assignments' : 
                     type === 'recent' ? 'Recent (Last Month)' :
                     type === 'midterm' ? 'Exams Only' :
                     type === 'quizzes' ? 'Quizzes Only' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                {['all', 'Quiz', 'Test', 'Project', 'Homework', 'Exam', 'Lab'].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <Card className="p-4 text-center h-32 flex flex-col justify-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600 mb-1">{totalAssignments}</div>
            <div className="text-xs text-gray-600">Total Assignments</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <Card className="p-4 text-center h-32 flex flex-col justify-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600 mb-1">{averageGrade}%</div>
            <div className="text-xs text-gray-600">Average Grade</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <Card className="p-4 text-center h-32 flex flex-col justify-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600 mb-1">{highestGrade}%</div>
            <div className="text-xs text-gray-600">Highest Grade</div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05, boxShadow: '0 8px 32px rgba(0,0,0,0.12)' }}
        >
          <Card className="p-4 text-center h-32 flex flex-col justify-center">
            <div className="flex items-center justify-center mb-2">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-orange-600 mb-1">{lowestGrade}%</div>
            <div className="text-xs text-gray-600">Lowest Grade</div>
          </Card>
        </motion.div>
      </div>

      {/* Grade Distribution Chart */}
      <Card className="p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Grade Distribution Over Time</h2>
          <div className="text-sm text-gray-500">
            {selectedPeriod !== 'all' ? `Grades from ${selectedPeriod}` : 'Performance trends across all periods'}
          </div>
        </div>
        <div className="h-80">
          <Chart data={chartData} type="line" />
        </div>
      </Card>

      {/* Grades Table */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Grade History</h2>
          </div>
          <div className="flex flex-col items-end gap-1">
            <Button
              size="sm"
              variant="outline"
              className="flex items-center gap-1"
              onClick={handleGeneratePDF}
            >
              <FileText className="w-4 h-4" />
              Generate PDF
            </Button>
            <div className="text-sm text-gray-500">
              Showing {filteredGrades.length} of {allGrades.length} assignments
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Assignment</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Grade</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(filteredGrades || []).map((grade, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{grade.date}</TableCell>
                  <TableCell className="font-medium text-gray-900">{grade.subject}</TableCell>
                  <TableCell className="max-w-xs">{grade.assignment}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-gray-100 text-gray-700">
                      {grade.type}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center px-2 py-1 rounded text-sm font-medium">
                      {grade.grade}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">
                    {grade.percentage}%
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">{grade.weight}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </motion.div>
  );
};

export default AllGradesDetails; 