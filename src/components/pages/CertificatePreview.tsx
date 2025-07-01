import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Award, GraduationCap, Star, Trophy, Calendar, User } from 'lucide-react';

interface CertificatePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: () => void;
  certificateType: any;
  child: any;
  semester: string;
}

const CertificatePreview = ({ 
  isOpen, 
  onClose, 
  onGenerate, 
  certificateType, 
  child, 
  semester 
}: CertificatePreviewProps) => {
  if (!isOpen || !certificateType || !child) return null;

  const getCertificateIcon = (typeId: string) => {
    switch (typeId) {
      case 'academic-excellence':
        return <Award className="w-16 h-16 text-yellow-600" />;
      case 'perfect-attendance':
        return <Calendar className="w-16 h-16 text-green-600" />;
      case 'honor-roll':
        return <Star className="w-16 h-16 text-blue-600" />;
      case 'graduation':
        return <GraduationCap className="w-16 h-16 text-purple-600" />;
      case 'achievement':
        return <Trophy className="w-16 h-16 text-orange-600" />;
      case 'participation':
        return <User className="w-16 h-16 text-indigo-600" />;
      default:
        return <Award className="w-16 h-16 text-gray-600" />;
    }
  };

  const getBorderColor = (typeId: string) => {
    switch (typeId) {
      case 'academic-excellence':
        return 'border-yellow-400';
      case 'perfect-attendance':
        return 'border-green-400';
      case 'honor-roll':
        return 'border-blue-400';
      case 'graduation':
        return 'border-purple-400';
      case 'achievement':
        return 'border-orange-400';
      case 'participation':
        return 'border-indigo-400';
      default:
        return 'border-gray-400';
    }
  };

  const getBackgroundColor = (typeId: string) => {
    switch (typeId) {
      case 'academic-excellence':
        return 'bg-gradient-to-br from-yellow-50 to-yellow-100';
      case 'perfect-attendance':
        return 'bg-gradient-to-br from-green-50 to-green-100';
      case 'honor-roll':
        return 'bg-gradient-to-br from-blue-50 to-blue-100';
      case 'graduation':
        return 'bg-gradient-to-br from-purple-50 to-purple-100';
      case 'achievement':
        return 'bg-gradient-to-br from-orange-50 to-orange-100';
      case 'participation':
        return 'bg-gradient-to-br from-indigo-50 to-indigo-100';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Certificate Preview</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Certificate Preview */}
            <div className="p-6">
              <div className={`relative border-4 ${getBorderColor(certificateType.id)} rounded-lg overflow-hidden ${getBackgroundColor(certificateType.id)}`}>
                {/* Certificate Content */}
                <div className="p-8 text-center">
                  {/* School Header */}
                  <div className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">SCHOOL CONNECT</h1>
                    <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
                  </div>

                  {/* Certificate Icon */}
                  <div className="flex justify-center mb-6">
                    {getCertificateIcon(certificateType.id)}
                  </div>

                  {/* Certificate Title */}
                  <div className="mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-2">CERTIFICATE</h2>
                    <h3 className="text-2xl font-semibold text-gray-700 mb-2">OF</h3>
                    <h4 className="text-3xl font-bold text-gray-800">{certificateType.title.toUpperCase()}</h4>
                  </div>

                  {/* Student Information */}
                  <div className="mb-8">
                    <p className="text-lg text-gray-700 mb-4">This is to certify that</p>
                    <h5 className="text-3xl font-bold text-blue-600 mb-4">{child.name}</h5>
                    <p className="text-base text-gray-600 mb-2">
                      has successfully demonstrated {certificateType.description.toLowerCase()}
                    </p>
                    <p className="text-base text-gray-600">
                      during the {semester}
                    </p>
                  </div>

                  {/* Performance Details */}
                  <div className="mb-8 p-4 bg-white bg-opacity-50 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">GPA:</span> {child.performance.gpa}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Attendance:</span> {child.performance.attendance}
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mb-8">
                    <p className="text-base text-gray-600">
                      Issued on {new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>

                  {/* Signatures */}
                  <div className="flex justify-between items-end">
                    <div className="text-center">
                      <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                      <p className="text-sm font-semibold text-gray-700">Principal</p>
                    </div>
                    <div className="text-center">
                      <div className="w-32 h-0.5 bg-gray-400 mb-2"></div>
                      <p className="text-sm font-semibold text-gray-700">Academic Director</p>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                <div className="absolute top-4 right-4 w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 border-2 border-gray-300 rounded-full"></div>
                <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-gray-300 rounded-full"></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 p-6 border-t border-gray-200">
              <Button
                variant="outline"
                onClick={onClose}
                className="px-6"
              >
                Cancel
              </Button>
              <Button
                onClick={onGenerate}
                className="px-6 bg-black hover:bg-gray-800 flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Generate & Download
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CertificatePreview; 