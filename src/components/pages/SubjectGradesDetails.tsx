import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, MoveRight, ArrowLeft, BookOpen, Target, Award, Clock, FileText } from 'lucide-react';
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

interface SubjectGradesDetailsProps {
  child: any;
  semester: string;
  onBack: () => void;
}

const SubjectGradesDetails = ({ child, semester, onBack }: SubjectGradesDetailsProps) => {
  // Generate detailed data based on child's performance
  const generateDetailedSubjects = () => {
    const { performance } = child;
    const teachers = ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Rodriguez', 'Dr. Robert Williams', 'Ms. Lisa Thompson'];
    
    return performance.subjects.map((subject: any, index: number) => ({
      subject: subject.subject,
      grade: subject.grade,
      percentage: subject.percentage,
      trend: subject.trend,
      trendLabel: subject.trendLabel,
      trendColor: subject.trendColor,
      teacher: teachers[index % teachers.length],
      assignments: [
        { name: `${subject.subject} Quiz #1`, grade: subject.grade, date: '2024-05-10', weight: 15 },
        { name: `${subject.subject} Test`, grade: subject.grade, date: '2024-05-05', weight: 25 },
        { name: `${subject.subject} Project`, grade: subject.grade, date: '2024-04-28', weight: 20 },
        { name: `${subject.subject} Midterm`, grade: subject.grade, date: '2024-04-15', weight: 40 }
      ],
      attendance: 90 + Math.floor(Math.random() * 10),
      participation: 85 + Math.floor(Math.random() * 10),
      strengths: ['Strong understanding', 'Consistent performance', 'Good participation'],
      areas: ['Time management', 'Advanced concepts'],
      recommendations: ['Continue current approach', 'Practice regularly', 'Seek help when needed']
    }));
  };

  const detailedSubjects = generateDetailedSubjects();

  // PDF generation handler
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Subject Grades Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${child.name}`, 14, 24);
    doc.text(`Semester: ${semester}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    let currentY = 50;

    detailedSubjects.forEach((subject, index) => {
      if (currentY > 250) {
        doc.addPage();
        currentY = 20;
      }

      // Subject header
      doc.setFontSize(14);
      doc.text(`${subject.subject} - Grade: ${subject.grade} (${subject.percentage}%)`, 14, currentY);
      currentY += 8;
      doc.setFontSize(10);
      doc.text(`Teacher: ${subject.teacher}`, 14, currentY);
      currentY += 8;

      // Assignments table
      autoTable(doc, {
        startY: currentY,
        head: [['Assignment', 'Grade', 'Date', 'Weight']],
        body: subject.assignments.map(assignment => [
          assignment.name,
          assignment.grade,
          assignment.date,
          `${assignment.weight}%`
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
        theme: 'striped',
      });

      currentY = (doc as any).lastAutoTable.finalY + 15;
    });

    doc.save(`Subject_Grades_Report_${child.name}_${semester.replace(/\s/g, '_')}.pdf`);
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
          <h1 className="text-3xl font-bold">Subject Grades Details</h1>
          <div className="text-gray-500">Comprehensive academic performance breakdown for {semester}</div>
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

      {/* Subject Cards */}
      <div className="space-y-6">
        {detailedSubjects.map((subject, index) => (
          <motion.div
            key={subject.subject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <Card className="p-6">
              {/* Subject Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{subject.subject}</h2>
                    <p className="text-gray-500">Teacher: {subject.teacher}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{subject.grade}</div>
                  <div className="text-lg text-gray-600">{subject.percentage}%</div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${subject.trendColor}`}>
                    {subject.trend === 'up' && <TrendingUp className="w-4 h-4" />}
                    {subject.trend === 'down' && <TrendingDown className="w-4 h-4" />}
                    {subject.trend === 'stable' && <MoveRight className="w-4 h-4" />}
                    {subject.trendLabel}
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <Target className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Attendance</div>
                    <div className="font-semibold">{subject.attendance}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Award className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Participation</div>
                    <div className="font-semibold">{subject.participation}%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="text-sm text-gray-600">Assignments</div>
                    <div className="font-semibold">{subject.assignments.length}</div>
                  </div>
                </div>
              </div>

              {/* Assignments Table */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">Assignment Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Weight</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subject.assignments.map((assignment, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium">{assignment.name}</TableCell>
                        <TableCell className="font-semibold">{assignment.grade}</TableCell>
                        <TableCell>{assignment.date}</TableCell>
                        <TableCell>{assignment.weight}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Strengths and Areas for Improvement */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-green-700">Strengths</h3>
                  <ul className="space-y-2">
                    {subject.strengths.map((strength, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-orange-700">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    {subject.areas.map((area, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommendations */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-700">Teacher Recommendations</h3>
                <ul className="space-y-2">
                  {subject.recommendations.map((rec, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-center mt-8">
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Performance Overview
        </Button>
      </div>
    </motion.div>
  );
};

export default SubjectGradesDetails; 