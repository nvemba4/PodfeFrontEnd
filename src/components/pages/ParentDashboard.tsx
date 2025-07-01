import React, { useState } from 'react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';
import Image from 'next/image';
import MessagesPage from './MessagesPage';
import ProfilePage from './ProfilePage';
import CertificateGenerator from './CertificateGenerator';
import { School, Home, BarChart2, MessageCircle, User, Users, LineChart, Server, BookOpen, Brain, Folder, Settings, HelpCircle, Star, FileText, Award } from 'lucide-react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '../ui/select';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, LabelList } from 'recharts';
import ViewFullPerformance from './ViewFullPerformance';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../ui/table';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const children = [
  {
    id: 1,
    name: 'Ethan Carter',
    grade: 'Grade 9',
    avatar: '/images/student.jpeg',
    performance: {
      gpa: '3.8',
      gpaChange: '+0.2',
      attendance: '95%',
      attendanceChange: '+2%',
      assignments: '14/15',
      assignmentsNote: '1 pending',
      rank: '3rd',
      rankNote: 'Top 5%',
      gpaTrend: [
        { term: 'Fall 2023', gpa: 3.6 },
        { term: 'Spring 2024', gpa: 3.7 },
        { term: 'Summer 2024', gpa: 3.8 },
        { term: 'Current', gpa: 3.8 },
      ],
      subjects: [
        { subject: 'Mathematics', grade: 'A', percentage: 92, trend: 'up', trendLabel: 'Improving', trendColor: 'text-green-600' },
        { subject: 'Science', grade: 'A-', percentage: 88, trend: 'up', trendLabel: 'Improving', trendColor: 'text-green-600' },
        { subject: 'English', grade: 'B+', percentage: 85, trend: 'stable', trendLabel: 'Stable', trendColor: 'text-yellow-600' },
        { subject: 'History', grade: 'A', percentage: 91, trend: 'up', trendLabel: 'Improving', trendColor: 'text-green-600' },
      ],
      recentGrades: [
        { subject: 'Mathematics', grade: 92, date: '2024-05-20' },
        { subject: 'Science', grade: 88, date: '2024-05-18' },
        { subject: 'English', grade: 85, date: '2024-05-16' },
      ],
      achievements: [
        'Honor Roll Student',
        'Mathematics Competition Winner',
        'Perfect Attendance Award',
      ],
    },
  },
  {
    id: 2,
    name: 'Noah Carter',
    grade: 'Grade 7',
    avatar: '/images/avatar.jpg',
    performance: {
      gpa: '3.5',
      gpaChange: '+0.1',
      attendance: '92%',
      attendanceChange: '+1%',
      assignments: '10/14',
      assignmentsNote: '2 overdue',
      rank: '8th',
      rankNote: 'Top 20%',
      gpaTrend: [
        { term: 'Fall 2023', gpa: 3.2 },
        { term: 'Spring 2024', gpa: 3.3 },
        { term: 'Summer 2024', gpa: 3.4 },
        { term: 'Current', gpa: 3.5 },
      ],
      subjects: [
        { subject: 'Mathematics', grade: 'B+', percentage: 88, trend: 'stable', trendLabel: 'Stable', trendColor: 'text-yellow-600' },
        { subject: 'Science', grade: 'A', percentage: 95, trend: 'stable', trendLabel: 'Stable', trendColor: 'text-green-600' },
        { subject: 'English', grade: 'B', percentage: 85, trend: 'down', trendLabel: 'Declining', trendColor: 'text-red-600' },
        { subject: 'History', grade: 'A-', percentage: 90, trend: 'up', trendLabel: 'Improving', trendColor: 'text-green-600' },
      ],
      recentGrades: [
        { subject: 'Mathematics', grade: 88, date: '2024-05-18' },
        { subject: 'Science', grade: 95, date: '2024-05-16' },
        { subject: 'English', grade: 85, date: '2024-05-14' },
      ],
      achievements: [
        'Science Fair Winner',
        'Improved History grade from B to A-',
        'Excellent participation in class',
      ],
    },
  },
];

const quickStats = [
  {
    label: 'Overall GPA',
    value: '3.8',
    change: '+0.2',
    changeColor: 'text-green-600',
    sub: '+5.56% this term',
  },
  {
    label: 'Attendance',
    value: '95%',
    sub: 'Across all children',
  },
  {
    label: 'Assignments Completed',
    value: '12/15',
    sub: 'This week',
  },
];

const activities = [
  {
    icon: '📄',
    title: 'Math Assignment Due',
    desc: 'Due: August 15, 2023 - For Ethan',
    time: '10:30 AM',
  },
  {
    icon: '🧪',
    title: 'Science Test Scheduled',
    desc: 'Date: August 20, 2023 - For Noah',
    time: 'Yesterday, 2:15 PM',
  },
  {
    icon: '👨‍🏫',
    title: 'Parent-Teacher Conference',
    desc: 'Date: August 25, 2023 - All Children',
    time: 'August 12, 9:00 AM',
  },
];

const pageTitles: Record<string, string> = {
  Performance: 'Performance',
  Users: 'Users',
  Analytics: 'Analytics',
  System: 'System',
  Communication: 'Communication',
  Academics: 'Academics',
  Predictions: 'Predictions',
  Resources: 'Resources',
  Settings: 'Settings',
  Help: 'Help',
  Messages: 'Messages',
  Certificates: 'Certificates',
};

const ParentDashboard = () => {
  const [activePage, setActivePage] = useState('Performance');
  const [selectedChildId, setSelectedChildId] = useState(children[0].id);
  const selectedChild = children.find(child => child.id === selectedChildId) || children[0];
  const [showFullPerformance, setShowFullPerformance] = useState(false);

  return (
    <div className="bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col justify-between py-6 px-4 min-h-screen fixed left-0 top-0 z-30 h-screen">
        <div>
          {/* Title and subtitle */}
          <div className="mb-8">
            <div className="text-2xl font-bold text-gray-900 leading-tight">Sophia Carter</div>
            <div className="text-sm text-gray-500">Parent Dashboard</div>
          </div>
          <div className="border-b border-gray-200 mb-6"></div>
          {/* Menu */}
          <nav className="flex flex-col gap-1">
            <SidebarItem icon={<Home className="w-5 h-5" />} label="Performance" active={activePage === 'Performance'} onClick={() => setActivePage('Performance')} />
            <SidebarItem icon={<Users className="w-5 h-5" />} label="Users" active={activePage === 'Users'} onClick={() => setActivePage('Users')} />
            <SidebarItem icon={<LineChart className="w-5 h-5" />} label="Analytics" active={activePage === 'Analytics'} onClick={() => setActivePage('Analytics')} />
            <SidebarItem icon={<Server className="w-5 h-5" />} label="System" active={activePage === 'System'} onClick={() => setActivePage('System')} />
            <SidebarItem icon={<MessageCircle className="w-5 h-5" />} label="Messages" active={activePage === 'Messages'} onClick={() => setActivePage('Messages')} />
            <SidebarItem icon={<MessageCircle className="w-5 h-5" />} label="Communication" active={activePage === 'Communication'} onClick={() => setActivePage('Communication')} />
            <SidebarItem icon={<BookOpen className="w-5 h-5" />} label="Academics" active={activePage === 'Academics'} onClick={() => setActivePage('Academics')} />
            <SidebarItem icon={<Brain className="w-5 h-5" />} label="Predictions" active={activePage === 'Predictions'} onClick={() => setActivePage('Predictions')} />
            <SidebarItem icon={<Folder className="w-5 h-5" />} label="Resources" active={activePage === 'Resources'} onClick={() => setActivePage('Resources')} />
            <SidebarItem icon={<Settings className="w-5 h-5" />} label="Settings" active={activePage === 'Settings'} onClick={() => setActivePage('Settings')} />
            <SidebarItem icon={<HelpCircle className="w-5 h-5" />} label="Help" active={activePage === 'Help'} onClick={() => setActivePage('Help')} />
            <SidebarItem icon={<Award className="w-5 h-5" />} label="Certificates" active={activePage === 'Certificates'} onClick={() => setActivePage('Certificates')} />
          </nav>
        </div>
        {/* Footer */}
        <div className="text-xs text-gray-400 mt-8">© 2024 School Admin</div>
      </aside>
      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Fixed Top Bar */}
        <header className="fixed left-64 top-0 right-0 h-16 bg-white border-b shadow-sm flex items-center px-10 z-20">
          <h2 className="text-xl font-semibold text-gray-900">{pageTitles[activePage] || 'Dashboard'}</h2>
          {/* Optionally, add user avatar or actions here */}
        </header>
        <main className="pt-20 px-10 pb-8 overflow-y-auto bg-gray-50">
          {activePage === 'Performance' && !showFullPerformance && (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Child Selector */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
                <div className="flex items-center gap-4">
                  <BarChart2 className="w-8 h-8 text-blue-600" />
                  <h1 className="text-3xl font-extrabold">Performance Overview</h1>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gray-600 font-medium">Select Student:</span>
                  <Select value={String(selectedChildId)} onValueChange={val => setSelectedChildId(Number(val))}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select a student" />
                    </SelectTrigger>
                    <SelectContent>
                      {children.map(child => (
                        <SelectItem key={child.id} value={String(child.id)}>
                          {child.name} ({child.grade})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <img
                    src={selectedChild.avatar}
                    alt={selectedChild.name}
                    className="w-10 h-10 rounded-full border ml-2"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="ml-4"
                  >
                    <Button
                      className="bg-black text-white px-4 py-2 font-semibold rounded-lg shadow hover:bg-gray-900 transition"
                      onClick={() => setShowFullPerformance(true)}
                    >
                      View Full Performance
                    </Button>
                  </motion.div>
                </div>
              </div>
              {/* Performance Content for Selected Child */}
              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {[
                  { label: 'GPA', icon: LineChart, value: selectedChild.performance.gpa, note: `${selectedChild.performance.gpaChange} this term`, noteColor: 'text-green-600' },
                  { label: 'Attendance', icon: Users, value: selectedChild.performance.attendance, note: `${selectedChild.performance.attendanceChange} this month`, noteColor: 'text-green-600' },
                  { label: 'Assignments', icon: BookOpen, value: selectedChild.performance.assignments, note: selectedChild.performance.assignmentsNote, noteColor: 'text-yellow-600' },
                  { label: 'Class Rank', icon: BarChart2, value: selectedChild.performance.rank, note: selectedChild.performance.rankNote, noteColor: 'text-green-600' },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div key={stat.label} whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                      <Card className="p-5 flex flex-col items-start">
                        <div className="text-gray-500 text-sm mb-1 flex items-center gap-2"><Icon className="w-4 h-4 text-blue-500" /> {stat.label}</div>
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className={`${stat.noteColor} text-xs font-medium mt-1`}>{stat.note}</div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              {/* Performance Chart Placeholder */}
              <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                <Card className="p-6 mb-8">
                  <div className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <LineChart className="w-5 h-5 text-blue-500" /> Performance Trend
                  </div>
                  <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={selectedChild.performance.gpaTrend.map((item) => ({
                        term: item.term,
                        gpa: item.gpa,
                      }))} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="term" />
                        <YAxis domain={[3, 4]} tickCount={5} />
                        <Tooltip />
                        <Bar dataKey="gpa" fill="#2563eb" radius={[8, 8, 0, 0]}>
                          <LabelList dataKey="gpa" position="top" fill="#2563eb" fontSize={14} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </motion.div>
              {/* Subject Breakdown */}
              <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                <Card className="p-6 mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="font-semibold text-lg flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500" /> Subject Breakdown
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center gap-1"
                      onClick={() => generatePDF(selectedChild.performance.subjects)}
                    >
                      <FileText className="w-4 h-4" />
                      Generate PDF
                    </Button>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Subject</TableHead>
                          <TableHead>Grade</TableHead>
                          <TableHead>Trend</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedChild.performance.subjects.map((subj, idx) => (
                          <TableRow key={subj.subject}>
                            <TableCell className="font-medium text-gray-900">{subj.subject}</TableCell>
                            <TableCell>{subj.grade}</TableCell>
                            <TableCell className={`flex items-center gap-1 ${subj.trendColor}`}>{subj.trend}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </motion.div>
              {/* Recent Achievements */}
              <motion.div whileHover={{ scale: 1.03, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}>
                <Card className="p-6">
                  <div className="font-semibold text-lg mb-4 flex items-center gap-2"><Star className="w-5 h-5 text-yellow-500" /> Recent Achievements</div>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    {selectedChild.performance.achievements.map((ach, idx) => (
                      <li key={idx}>{ach}</li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </motion.div>
          )}
          {activePage === 'Performance' && showFullPerformance && (
            <ViewFullPerformance child={selectedChild} onBack={() => setShowFullPerformance(false)} />
          )}
          {activePage === 'Messages' && (
            <MessagesPage child={selectedChild} />
          )}
          {activePage === 'Profile' && <ProfilePage child={selectedChild} />}
          {activePage === 'Certificates' && <CertificateGenerator children={children} onBack={() => setActivePage('Performance')} />}
        </main>
      </div>
    </div>
  );
};

function SidebarItem({ icon, label, active, onClick }: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-colors ${active ? 'bg-gray-100 font-semibold text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
      onClick={onClick}
    >
      <span className="text-xl">{icon}</span>
      <span className="flex-1">{label}</span>
    </div>
  );
}

// Placeholder for a calendar component
function CalendarDemo() {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-gray-100 rounded-lg p-4 w-full text-center text-gray-400">[Calendar Here]</div>
    </div>
  );
}

function generatePDF(subjects: { subject: string; grade: string; percentage: number; trend: string; trendLabel: string; trendColor: string }[]) {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [['Subject', 'Grade', 'Percentage', 'Trend']],
    body: subjects.map(subj => [subj.subject, subj.grade, subj.percentage + '%', subj.trendLabel]),
    startY: 20,
  });
  doc.save('subject_breakdown.pdf');
}

export default ParentDashboard; 