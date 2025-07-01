import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ArrowLeft, AlertTriangle, CheckCircle, Clock, Award, TrendingUp, BarChart3, Smile, FileText } from 'lucide-react';
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

interface BehaviorLogDetailsProps {
  child: any;
  semester: string;
  onBack: () => void;
}

const BehaviorLogDetails = ({ child, semester, onBack }: BehaviorLogDetailsProps) => {
  // Generate behavior data based on child's performance
  const generateBehaviorData = () => {
    const gpa = child.performance.gpa;
    const attendance = child.performance.attendance;
    
    // Generate behavior incidents based on performance
    const incidents = [];
    const today = new Date();
    
    // Fewer incidents for better performing students
    const incidentCount = gpa > 3.5 ? Math.floor(Math.random() * 2) : 
                         gpa > 3.0 ? Math.floor(Math.random() * 3) + 1 : 
                         Math.floor(Math.random() * 5) + 2;
    
    for (let i = 0; i < incidentCount; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - Math.floor(Math.random() * 30));
      const dateStr = date.toISOString().split('T')[0];
      
      const severity = gpa > 3.5 ? 'Minor' : gpa > 3.0 ? 'Moderate' : 'Major';
      const types = {
        Minor: ['Talking in class', 'Late to class', 'Incomplete homework'],
        Moderate: ['Disruptive behavior', 'Missing assignments', 'Cell phone use'],
        Major: ['Fighting', 'Cheating', 'Skipping class']
      };
      
      const type = types[severity as keyof typeof types][Math.floor(Math.random() * types[severity as keyof typeof types].length)];
      const description = `${type} during ${child.performance.subjects[Math.floor(Math.random() * child.performance.subjects.length)].subject} class`;
      const action = severity === 'Minor' ? 'Verbal warning' : 
                     severity === 'Moderate' ? 'Written warning' : 'Detention';
      const teacher = ['Dr. Sarah Johnson', 'Prof. Michael Chen', 'Ms. Emily Rodriguez', 'Dr. Robert Williams', 'Ms. Lisa Thompson'][Math.floor(Math.random() * 5)];
      
      incidents.push({
        date: dateStr,
        type,
        severity,
        description,
        action,
        teacher,
        resolved: Math.random() > 0.3
      });
    }
    
    return incidents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  const behaviorData = generateBehaviorData();

  // Calculate statistics
  const totalIncidents = behaviorData.length;
  const resolvedIncidents = behaviorData.filter(incident => incident.resolved).length;
  const minorIncidents = behaviorData.filter(incident => incident.severity === 'Minor').length;
  const majorIncidents = behaviorData.filter(incident => incident.severity === 'Major').length;

  // PDF generation handler
  const handleGeneratePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Behavior Report', 14, 16);
    doc.setFontSize(10);
    doc.text(`Student: ${child.name}`, 14, 24);
    doc.text(`Semester: ${semester}`, 14, 30);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 36);

    // Statistics section
    doc.setFontSize(12);
    doc.text('Behavior Statistics:', 14, 50);
    doc.setFontSize(10);
    doc.text(`Total Incidents: ${totalIncidents}`, 14, 60);
    doc.text(`Resolved: ${resolvedIncidents}`, 14, 67);
    doc.text(`Minor Incidents: ${minorIncidents}`, 14, 74);
    doc.text(`Major Incidents: ${majorIncidents}`, 14, 81);

    if (behaviorData.length > 0) {
      // Behavior table
      autoTable(doc, {
        startY: 95,
        head: [['Date', 'Type', 'Severity', 'Description', 'Action', 'Teacher', 'Status']],
        body: behaviorData.map(incident => [
          incident.date,
          incident.type,
          incident.severity,
          incident.description,
          incident.action,
          incident.teacher,
          incident.resolved ? 'Resolved' : 'Pending'
        ]),
        styles: { fontSize: 8 },
        headStyles: { fillColor: [59, 130, 246] },
        margin: { left: 14, right: 14 },
        theme: 'striped',
      });
    } else {
      doc.setFontSize(12);
      doc.text('No behavior incidents recorded for this period.', 14, 95);
    }

    doc.save(`Behavior_Report_${child.name}_${semester.replace(/\s/g, '_')}.pdf`);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Positive':
        return 'bg-green-100 text-green-700';
      case 'Negative':
        return 'bg-red-100 text-red-700';
      case 'Warning':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Positive':
        return <CheckCircle className="w-4 h-4" />;
      case 'Negative':
        return <AlertTriangle className="w-4 h-4" />;
      case 'Warning':
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Academic Excellence':
        return <Award className="w-4 h-4" />;
      case 'Leadership':
        return <TrendingUp className="w-4 h-4" />;
      case 'Good Citizenship':
        return <Smile className="w-4 h-4" />;
      case 'Sportsmanship':
        return <BarChart3 className="w-4 h-4" />;
      default:
        return <CheckCircle className="w-4 h-4" />;
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
          <h1 className="text-3xl font-bold">Behavior Log</h1>
          <div className="text-gray-500">Detailed behavior record for {semester}</div>
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
            <div className="text-2xl font-bold text-green-600">{resolvedIncidents}</div>
            <div className="text-xs text-gray-600">Resolved Incidents</div>
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
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-red-600">{majorIncidents}</div>
            <div className="text-xs text-gray-600">Major Incidents</div>
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
            <div className="text-2xl font-bold text-blue-600">{totalIncidents}</div>
            <div className="text-xs text-gray-600">Total Incidents</div>
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
                <Award className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">+{resolvedIncidents}</div>
            <div className="text-xs text-gray-600">Resolved Points</div>
          </Card>
        </motion.div>
      </div>

      {/* Behavior Table */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Behavior Incidents</h2>
          <div className="text-sm text-gray-500">Showing last 10 incidents</div>
        </div>
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {behaviorData.map((incident, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{incident.date}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-sm ${getTypeColor(incident.type)}`}>
                    {getTypeIcon(incident.type)}
                    {incident.type}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-700">
                    {getCategoryIcon(incident.type)}
                    {incident.type}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs">{incident.description}</TableCell>
                <TableCell className="text-sm text-gray-600">{incident.action}</TableCell>
                <TableCell className="text-sm text-gray-600">{incident.teacher}</TableCell>
                <TableCell className="text-sm text-gray-600">{incident.resolved ? 'Resolved' : 'Pending'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Behavior Summary */}
      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Behavior Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Strengths</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Consistently demonstrates academic excellence</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Shows strong leadership qualities</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Exemplary citizenship and community involvement</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <span>Excellent teamwork and sportsmanship</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Recent Achievements</h4>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Perfect score on Mathematics quiz</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Outstanding science fair project</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Leadership in class representative role</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <span>Environmental awareness initiative participation</span>
              </li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Recommendations */}
      <Card className="p-6 mt-6">
        <h3 className="text-lg font-semibold mb-4">Teacher Recommendations</h3>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            "This student consistently demonstrates excellent behavior and academic performance. 
            Their leadership qualities and positive attitude make them a role model for their peers. 
            We recommend continued encouragement of their initiative and community involvement."
          </p>
          <div className="mt-3 text-xs text-blue-600">
            — Dr. Sarah Johnson, Mathematics Teacher
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default BehaviorLogDetails; 