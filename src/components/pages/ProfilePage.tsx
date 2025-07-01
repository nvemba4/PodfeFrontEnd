import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap, Award, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfilePageProps {
  child?: any;
}

const ProfilePage = ({ child }: ProfilePageProps) => {
  if (!child) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        <Card className="p-6 mb-6">
          <div className="text-gray-700 text-lg font-semibold mb-2">Profile Information</div>
          <div className="text-gray-400">[Your profile details will appear here]</div>
        </Card>
      </div>
    );
  }

  const { name, grade, performance, avatar } = child;

  return (
    <motion.div 
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">Student Profile</h1>
      
      {/* Profile Header */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img 
              src={avatar} 
              alt={name} 
              className="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
            />
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"></div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
            <p className="text-gray-600 text-lg">Grade {grade}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <GraduationCap className="w-4 h-4" />
                <span>Student ID: {Math.floor(Math.random() * 90000) + 10000}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <span>Enrolled: Fall 2023</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-blue-600">{performance.gpa}</div>
            <div className="text-sm text-gray-500">Current GPA</div>
          </div>
        </div>
      </Card>

      {/* Academic Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{performance.attendance}%</div>
            <div className="text-sm text-gray-600">Attendance Rate</div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <Award className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">{performance.rank}</div>
            <div className="text-sm text-gray-600">Class Rank</div>
          </Card>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }}>
          <Card className="p-6 text-center">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-purple-600">{performance.assignments}</div>
            <div className="text-sm text-gray-600">Assignments Completed</div>
          </Card>
        </motion.div>
      </div>

      {/* Subject Performance */}
      <Card className="p-6 mb-6">
        <h3 className="text-xl font-semibold mb-4">Subject Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {performance.subjects.map((subject: any, index: number) => (
            <motion.div 
              key={subject.subject}
              whileHover={{ scale: 1.02 }}
              className="p-4 border rounded-lg"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900">{subject.subject}</span>
                <span className={`text-lg font-bold ${subject.trendColor}`}>
                  {subject.grade}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{subject.percentage}%</span>
                <span className={subject.trendColor}>{subject.trendLabel}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      {/* Contact Information */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Email</div>
              <div className="text-gray-900">{name.toLowerCase().replace(' ', '.')}@school.edu</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Phone</div>
              <div className="text-gray-900">(555) 123-4567</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Address</div>
              <div className="text-gray-900">123 School Street, City, State 12345</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <div className="text-sm text-gray-500">Date of Birth</div>
              <div className="text-gray-900">January 15, 2010</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProfilePage; 