import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Award, GraduationCap, Star, Trophy, Download, Eye, Calendar, User, School } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import jsPDF from 'jspdf';
import CertificatePreview from './CertificatePreview';

interface CertificateGeneratorProps {
  children: any[];
  onBack: () => void;
}

const CertificateGenerator = ({ children, onBack }: CertificateGeneratorProps) => {
  const [selectedCertificate, setSelectedCertificate] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('current');
  const [selectedChildId, setSelectedChildId] = useState(children[0]?.id || '');
  const [showPreview, setShowPreview] = useState(false);

  const selectedChild = children.find(child => child.id === selectedChildId) || children[0];

  const certificateTypes = [
    {
      id: 'academic-excellence',
      title: 'Academic Excellence Certificate',
      description: 'Awarded for outstanding academic performance',
      icon: <Award className="w-6 h-6 text-yellow-600" />,
      color: 'bg-yellow-50 border-yellow-200',
      textColor: 'text-yellow-800'
    },
    {
      id: 'perfect-attendance',
      title: 'Perfect Attendance Certificate',
      description: 'Awarded for 100% attendance record',
      icon: <Calendar className="w-6 h-6 text-green-600" />,
      color: 'bg-green-50 border-green-200',
      textColor: 'text-green-800'
    },
    {
      id: 'honor-roll',
      title: 'Honor Roll Certificate',
      description: 'Awarded for maintaining high GPA',
      icon: <Star className="w-6 h-6 text-blue-600" />,
      color: 'bg-blue-50 border-blue-200',
      textColor: 'text-blue-800'
    },
    {
      id: 'graduation',
      title: 'Graduation Certificate',
      description: 'Official graduation certificate',
      icon: <GraduationCap className="w-6 h-6 text-purple-600" />,
      color: 'bg-purple-50 border-purple-200',
      textColor: 'text-purple-800'
    },
    {
      id: 'achievement',
      title: 'Achievement Certificate',
      description: 'Awarded for special accomplishments',
      icon: <Trophy className="w-6 h-6 text-orange-600" />,
      color: 'bg-orange-50 border-orange-200',
      textColor: 'text-orange-800'
    },
    {
      id: 'participation',
      title: 'Participation Certificate',
      description: 'Awarded for active participation',
      icon: <User className="w-6 h-6 text-indigo-600" />,
      color: 'bg-indigo-50 border-indigo-200',
      textColor: 'text-indigo-800'
    }
  ];

  const semesters = [
    { value: 'current', label: 'Current Semester' },
    { value: 'previous', label: 'Previous Semester' },
    { value: 'fall2023', label: 'Fall 2023' },
    { value: 'spring2023', label: 'Spring 2023' },
    { value: 'fall2022', label: 'Fall 2022' }
  ];

  const selectedCertificateType = certificateTypes.find(c => c.id === selectedCertificate);
  const selectedSemesterLabel = semesters.find(s => s.value === selectedSemester)?.label || '';

  // Shared color/icon logic for both preview and PDF
  type Theme = { border: [number, number, number]; bg: [number, number, number]; icon: string; iconColor: [number, number, number] };
  const certificateTheme: { [key: string]: Theme } = {
    'academic-excellence': {
      border: [255, 193, 7], bg: [255, 251, 235], icon: '🏅', iconColor: [255, 193, 7]
    },
    'perfect-attendance': {
      border: [34, 197, 94], bg: [240, 253, 244], icon: '📅', iconColor: [34, 197, 94]
    },
    'honor-roll': {
      border: [59, 130, 246], bg: [239, 246, 255], icon: '⭐', iconColor: [59, 130, 246]
    },
    'graduation': {
      border: [168, 85, 247], bg: [245, 243, 255], icon: '🎓', iconColor: [168, 85, 247]
    },
    'achievement': {
      border: [251, 146, 60], bg: [255, 247, 237], icon: '🏆', iconColor: [251, 146, 60]
    },
    'participation': {
      border: [99, 102, 241], bg: [238, 242, 255], icon: '👤', iconColor: [99, 102, 241]
    },
    'default': {
      border: [180, 180, 180], bg: [250, 250, 250], icon: '🏆', iconColor: [180, 180, 180]
    }
  };
  const getTheme = (id: string): Theme => certificateTheme[id] || certificateTheme['default'];

  const generateCertificate = () => {
    if (!selectedCertificate || !selectedChild) return;
    const theme: Theme = getTheme(selectedCertificate as string);
    const doc = new jsPDF('landscape', 'mm', 'a4');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const gray: [number, number, number] = [180, 180, 180];
    const blue: [number, number, number] = [33, 102, 255];
    const black: [number, number, number] = [33, 37, 41];
    const labelGray: [number, number, number] = [90, 90, 90];
    const boxBg: [number, number, number] = [255, 255, 245];
    const boxBorder: [number, number, number] = [230, 230, 200];
    const indigo: [number, number, number] = [99, 102, 241];

    // Background
    doc.setFillColor(...theme.bg);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Border
    doc.setDrawColor(...theme.border);
    doc.setLineWidth(3);
    doc.rect(5, 5, pageWidth - 10, pageHeight - 10);

    // Corner circles
    doc.setDrawColor(...gray);
    doc.setFillColor(245, 245, 245);
    doc.circle(15, 15, 8, 'FD');
    doc.circle(pageWidth - 15, 15, 8, 'FD');
    doc.circle(15, pageHeight - 15, 8, 'FD');
    doc.circle(pageWidth - 15, pageHeight - 15, 8, 'FD');

    // SCHOOL CONNECT (bold, centered)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...black);
    doc.text('SCHOOL CONNECT', pageWidth / 2, 36, { align: 'center' });
    // Underline
    doc.setDrawColor(...gray);
    doc.setLineWidth(1);
    doc.line(pageWidth / 2 - 25, 40, pageWidth / 2 + 25, 40);

    // Vector icon (medal, trophy, user, etc.)
    if (selectedCertificate === 'academic-excellence') {
      doc.setDrawColor(255, 193, 7);
      doc.setFillColor(255, 251, 235);
      doc.circle(pageWidth / 2, 65, 13, 'FD');
      doc.setDrawColor(255, 193, 7);
      doc.setLineWidth(2);
      doc.line(pageWidth / 2, 78, pageWidth / 2 - 7, 90);
      doc.line(pageWidth / 2, 78, pageWidth / 2 + 7, 90);
      doc.setFillColor(255, 193, 7);
      doc.circle(pageWidth / 2, 65, 7, 'F');
    } else if (selectedCertificate === 'achievement') {
      doc.setDrawColor(251, 146, 60);
      doc.setFillColor(251, 146, 60);
      doc.setLineWidth(2);
      doc.ellipse(pageWidth / 2, 65, 12, 10, 'FD');
      doc.setFillColor(255, 247, 237);
      doc.ellipse(pageWidth / 2, 70, 7, 4, 'F');
      doc.setDrawColor(251, 146, 60);
      doc.line(pageWidth / 2 - 7, 70, pageWidth / 2 - 7, 80);
      doc.line(pageWidth / 2 + 7, 70, pageWidth / 2 + 7, 80);
      doc.line(pageWidth / 2 - 7, 80, pageWidth / 2 + 7, 80);
    } else if (selectedCertificate === 'participation') {
      // User icon (head and shoulders)
      doc.setDrawColor(...indigo);
      doc.setFillColor(...indigo);
      // Head
      doc.circle(pageWidth / 2, 65, 10, 'FD');
      // Shoulders
      doc.ellipse(pageWidth / 2, 80, 16, 7, 'F');
    } else {
      doc.setDrawColor(...theme.iconColor);
      doc.setFillColor(...theme.iconColor);
      doc.circle(pageWidth / 2, 65, 12, 'FD');
    }

    // CERTIFICATE (bold, centered)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(32);
    doc.setTextColor(...black);
    doc.text('CERTIFICATE', pageWidth / 2, 100, { align: 'center' });
    // OF
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(18);
    doc.setTextColor(...black);
    doc.text('OF', pageWidth / 2, 112, { align: 'center' });
    // Certificate type (bold, centered)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(...black);
    doc.text((selectedCertificateType?.title || '').toUpperCase(), pageWidth / 2, 126, { align: 'center' });

    // This is to certify that
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(14);
    doc.setTextColor(...labelGray);
    doc.text('This is to certify that', pageWidth / 2, 144, { align: 'center' });

    // Student name (blue, bold, large)
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(...blue);
    doc.text(selectedChild.name, pageWidth / 2, 156, { align: 'center' });

    // Description
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...labelGray);
    doc.text(
      `has successfully demonstrated ${selectedCertificateType?.description.toLowerCase()}`,
      pageWidth / 2,
      166,
      { align: 'center' }
    );
    doc.text(`during the ${selectedSemesterLabel}`, pageWidth / 2, 176, { align: 'center' });

    // Remove the performance box background and border, only show text
    const boxW = 220, boxH = 24;
    const boxY = pageHeight - 70;
    const boxX = pageWidth / 2 - boxW / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(13);
    doc.setTextColor(120, 120, 120);
    doc.text(`GPA: 3.5`, boxX + 40, boxY + 16, { align: 'center' });
    doc.text(`Attendance: 92%`, boxX + boxW - 60, boxY + 16, { align: 'center' });

    // Issued on (hardcoded date, just above signature lines)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...labelGray);
    doc.text(`Issued on June 28, 2025`, pageWidth / 2, pageHeight - 50, { align: 'center' });

    // Signature lines and labels (at the bottom)
    doc.setDrawColor(...gray);
    doc.setLineWidth(1);
    // Left line
    doc.line(40, pageHeight - 40, pageWidth / 2 - 60, pageHeight - 40);
    // Right line
    doc.line(pageWidth / 2 + 60, pageHeight - 40, pageWidth - 40, pageHeight - 40);
    // Labels
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...labelGray);
    doc.text('Principal', 40 + (pageWidth / 2 - 100) / 2, pageHeight - 34, { align: 'center' });
    doc.text('Academic Director', pageWidth - 40 - (pageWidth / 2 - 100) / 2, pageHeight - 34, { align: 'center' });
    // Electronic signature labels (smaller font)
    doc.setFontSize(9);
    doc.setTextColor(140, 140, 140);
    doc.text('electronic signature', 40 + (pageWidth / 2 - 100) / 2, pageHeight - 28, { align: 'center' });
    doc.text('electronic signature', pageWidth - 40 - (pageWidth / 2 - 100) / 2, pageHeight - 28, { align: 'center' });
    // Center label (semester) - keep above signature lines if needed
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.setTextColor(...labelGray);
    // doc.text(`during the ${selectedSemesterLabel}`, pageWidth / 2, 216, { align: 'center' });

    // Save the PDF
    doc.save(`${selectedCertificateType?.title.replace(/\s+/g, '_')}_${selectedChild.name.replace(/\s+/g, '_')}.pdf`);
  };

  const previewCertificate = () => {
    if (!selectedCertificate || !selectedChild) return;
    setShowPreview(true);
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
          <h1 className="text-3xl font-bold">Certificate Generator</h1>
          <div className="text-gray-500">Generate official certificates for your children</div>
        </div>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </div>

      {/* Student and Semester Selection */}
      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Select Student:</span>
            <Select value={selectedChildId.toString()} onValueChange={(value) => setSelectedChildId(parseInt(value))}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                {children.map((child) => (
                  <SelectItem key={child.id} value={child.id.toString()}>
                    {child.name} - {child.grade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-700">Select Semester:</span>
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
        </div>
      </Card>

      {/* Certificate Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {certificateTypes.map((cert) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
          >
            <Card 
              className={`p-6 cursor-pointer border-2 transition-all duration-200 ${
                selectedCertificate === cert.id 
                  ? `${cert.color} ${cert.textColor} border-current` 
                  : 'hover:border-gray-300'
              }`}
              onClick={() => setSelectedCertificate(cert.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                {cert.icon}
                <h3 className="text-lg font-semibold">{cert.title}</h3>
              </div>
              <p className="text-sm text-gray-600 mb-4">{cert.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Click to select</span>
                {selectedCertificate === cert.id && (
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Action Buttons */}
      {selectedCertificate && selectedChild && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 justify-center"
        >
          <Button
            onClick={previewCertificate}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview Certificate
          </Button>
          <Button
            onClick={generateCertificate}
            className="flex items-center gap-2 bg-black hover:bg-gray-800"
          >
            <Download className="w-4 h-4" />
            Generate & Download
          </Button>
        </motion.div>
      )}

      {/* Certificate Information */}
      {selectedCertificate && selectedChild && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="p-6 bg-blue-50 border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">Certificate Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <strong>Student:</strong> {selectedChild.name}
              </div>
              <div>
                <strong>Grade:</strong> {selectedChild.grade}
              </div>
              <div>
                <strong>Current GPA:</strong> {selectedChild.performance.gpa}
              </div>
              <div>
                <strong>Attendance Rate:</strong> {selectedChild.performance.attendance}
              </div>
              <div>
                <strong>Semester:</strong> {selectedSemesterLabel}
              </div>
              <div>
                <strong>Issue Date:</strong> {new Date().toLocaleDateString()}
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* Certificate Preview Modal */}
      <CertificatePreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        onGenerate={() => {
          setShowPreview(false);
          generateCertificate();
        }}
        certificateType={selectedCertificateType}
        child={selectedChild}
        semester={selectedSemesterLabel}
      />
    </motion.div>
  );
};

export default CertificateGenerator; 