# School Management System - Data Structure & Concepts

## Overview
This document describes all the data structures, models, and concepts implemented in the School Management System. The system manages academic performance, attendance, assignments, communication, and administrative tasks for educational institutions.

## Core Data Models

### 1. User Management

#### Student Model
```typescript
interface Student {
  id: number;
  name: string;
  grade: string; // e.g., "Grade 5", "Grade 7"
  avatar: string; // Profile image URL
  parentId: number; // Reference to parent account
  teacherId: number; // Primary teacher reference
  enrollmentDate: Date;
  status: 'active' | 'inactive' | 'graduated' | 'transferred';
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
}
```

#### Parent Model
```typescript
interface Parent {
  id: number;
  name: string; // e.g., "Sophia Carter"
  email: string;
  phone: string;
  address: string;
  children: Student[]; // Array of student IDs
  accountType: 'parent';
  lastLogin: Date;
  preferences: {
    notifications: boolean;
    emailAlerts: boolean;
    darkMode: boolean;
  };
}
```

#### Teacher Model
```typescript
interface Teacher {
  id: number;
  name: string; // e.g., "Dr. Sarah Johnson"
  subject: string; // e.g., "Mathematics"
  email: string;
  phone: string;
  avatar: string;
  specialization: string[];
  experience: number; // Years of experience
  qualifications: string[];
  assignedStudents: Student[];
  accountType: 'teacher';
}
```

#### Administrator Model
```typescript
interface Administrator {
  id: number;
  name: string;
  role: 'principal' | 'vice_principal' | 'coordinator' | 'staff';
  email: string;
  phone: string;
  permissions: string[];
  accountType: 'admin';
  department: string;
}
```

### 2. Academic Performance

#### Performance Model
```typescript
interface Performance {
  studentId: number;
  gpa: string; // e.g., "3.8"
  gpaChange: string; // e.g., "+0.2"
  attendance: string; // e.g., "95%"
  attendanceChange: string; // e.g., "+2%"
  assignments: string; // e.g., "12/15"
  assignmentsNote: string; // e.g., "1 overdue"
  rank: string; // e.g., "5th"
  rankNote: string; // e.g., "Top 10%"
  gpaTrend: GPATrend[];
  subjects: SubjectPerformance[];
  recentGrades: RecentGrade[];
  achievements: string[];
}
```

#### GPA Trend Model
```typescript
interface GPATrend {
  term: string; // e.g., "Term 1", "Term 2"
  gpa: number; // e.g., 3.5, 3.6
  academicYear: string;
  semester: 'fall' | 'spring' | 'summer';
}
```

#### Subject Performance Model
```typescript
interface SubjectPerformance {
  subject: string; // e.g., "Mathematics", "Science"
  grade: string; // e.g., "A", "B+", "A-"
  percentage: number; // e.g., 92, 88, 90
  trend: 'up' | 'down' | 'stable';
  trendLabel: string; // e.g., "Improving", "Declining", "Stable"
  trendColor: string; // CSS color class
  teacher: string;
  lastUpdated: Date;
}
```

#### Recent Grade Model
```typescript
interface RecentGrade {
  subject: string;
  grade: number; // Numerical grade
  date: string; // ISO date string
  assignmentType: 'test' | 'quiz' | 'homework' | 'project' | 'exam';
  maxPoints: number;
  comments?: string;
}
```

### 3. Attendance Management

#### Attendance Data Model
```typescript
interface AttendanceData {
  totalDays: number;
  present: number;
  absent: number;
  late: number;
  excused: number;
  percentage: number;
  academicYear: string;
  month: string;
}
```

#### Monthly Attendance Model
```typescript
interface MonthlyAttendance {
  month: string; // e.g., "January", "February"
  present: number;
  absent: number;
  late: number;
  excused: number;
  totalDays: number;
  percentage: number;
}
```

#### Daily Attendance Model
```typescript
interface DailyAttendance {
  date: Date;
  studentId: number;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string; // For late arrivals
  timeOut?: string; // For early departures
  notes?: string;
  recordedBy: number; // Teacher/Admin ID
}
```

#### Attendance Calendar Model
```typescript
interface AttendanceCalendar {
  month: string;
  year: number;
  days: AttendanceDay[];
}

interface AttendanceDay {
  day: number;
  status: 'present' | 'absent' | 'late' | 'excused' | 'weekend' | 'holiday';
  date: Date;
}
```

### 4. Assignment & Homework Management

#### Assignment Model
```typescript
interface Assignment {
  id: number;
  title: string; // e.g., "Algebra Problem Set"
  subject: string; // e.g., "Mathematics"
  dueDate: string; // ISO date string
  status: 'pending' | 'in-progress' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
  description: string;
  progress: number; // 0-100 percentage
  totalPoints: number;
  submitted: boolean;
  teacher: string;
  grade?: number; // If completed
  feedback?: string;
  attachments?: string[]; // File URLs
  assignedDate: Date;
  studentId: number;
}
```

#### Assignment Statistics Model
```typescript
interface AssignmentStats {
  totalAssignments: number;
  pending: number;
  completed: number;
  overdue: number;
  inProgress: number;
  averageGrade: number;
  completionRate: number;
}
```

### 5. Communication System

#### Message Model
```typescript
interface Message {
  id: number;
  from: string; // Sender name
  to: number; // Recipient ID
  subject: string;
  content: string;
  date: string; // ISO date string
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  type: 'parent_teacher' | 'announcement' | 'notification';
  attachments?: string[];
  replyTo?: number; // Original message ID if reply
}
```

#### Teacher Directory Model
```typescript
interface TeacherDirectory {
  id: number;
  name: string;
  subject: string;
  email: string;
  phone: string;
  avatar: string;
  officeHours: string;
  roomNumber: string;
  specialization: string[];
  availability: {
    monday: string[];
    tuesday: string[];
    wednesday: string[];
    thursday: string[];
    friday: string[];
  };
}
```

#### Announcement Model
```typescript
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string; // ISO date string
  type: 'event' | 'holiday' | 'academic' | 'general';
  priority: 'high' | 'medium' | 'low';
  targetAudience: 'all' | 'parents' | 'students' | 'teachers';
  expiresAt?: string; // Optional expiration date
  attachments?: string[];
  createdBy: number; // Admin/Teacher ID
}
```

### 6. Calendar & Events

#### Event Model
```typescript
interface Event {
  id: number;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  type: 'parent_teacher_conference' | 'exam' | 'holiday' | 'sports_day' | 'academic_event';
  location?: string;
  participants: number[]; // User IDs
  isRecurring: boolean;
  recurrencePattern?: string;
  reminderDays: number; // Days before event to send reminder
  status: 'scheduled' | 'cancelled' | 'completed';
}
```

### 7. Donation & Fundraising

#### Donation Model
```typescript
interface Donation {
  id: number;
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: string;
  paymentMethod: 'bank_transfer' | 'qr_code' | 'physical';
  donationType: 'monetary' | 'clothing' | 'food' | 'books' | 'equipment';
  projectId?: number; // If earmarked for specific project
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  date: Date;
  notes?: string;
}
```

#### Donation Form Model
```typescript
interface DonationForm {
  id: number;
  type: 'alimento' | 'roupas' | 'outros';
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  items: DonationItem[];
  pickupAddress: string;
  preferredDate: Date;
  notes: string;
  status: 'pending' | 'scheduled' | 'completed';
}

interface DonationItem {
  name: string;
  quantity: number;
  condition: 'new' | 'good' | 'fair';
  description: string;
}
```

### 8. Analytics & Reporting

#### Quick Stats Model
```typescript
interface QuickStats {
  label: string; // e.g., "Overall GPA", "Attendance"
  value: string; // e.g., "3.8", "95%"
  change?: string; // e.g., "+0.2", "+2%"
  changeColor?: string; // CSS color class
  sub?: string; // Subtitle text
  trend?: 'up' | 'down' | 'stable';
}
```

#### Activity Model
```typescript
interface Activity {
  icon: string; // Emoji or icon
  title: string;
  desc: string;
  time: string;
  type: 'assignment' | 'exam' | 'event' | 'conference';
  priority: 'high' | 'medium' | 'low';
  studentId?: number; // If specific to a student
}
```

### 9. System Configuration

#### Page Titles Model
```typescript
interface PageTitles {
  Performance: string;
  Users: string;
  Analytics: string;
  System: string;
  Communication: string;
  Academics: string;
  Predictions: string;
  Resources: string;
  Settings: string;
  Help: string;
}
```

#### User Preferences Model
```typescript
interface UserPreferences {
  darkMode: boolean;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  language: string;
  timezone: string;
  dashboardLayout: 'grid' | 'list';
  autoRefresh: boolean;
  refreshInterval: number; // minutes
}
```

## Data Relationships

### Parent-Child Relationship
- One parent can have multiple children
- Each child belongs to one primary parent
- Parents can access all their children's data

### Teacher-Student Relationship
- One teacher can have multiple students
- Students can have different teachers for different subjects
- Teachers can communicate with parents of their students

### Performance-Attendance Relationship
- Performance data is linked to attendance records
- GPA calculations consider attendance as a factor
- Attendance trends affect performance predictions

### Assignment-Subject Relationship
- Assignments are categorized by subject
- Subject performance is calculated from assignment grades
- Teachers create assignments for their subjects

## Data Flow

### 1. Authentication Flow
```
Login → Welcome Screen → Role Selection → Dashboard
```

### 2. Performance Data Flow
```
Assignment Grades → Subject Performance → GPA Calculation → Performance Dashboard
```

### 3. Attendance Data Flow
```
Daily Attendance → Monthly Aggregation → Attendance Analytics → Performance Impact
```

### 4. Communication Flow
```
Message Creation → Notification → Response → Message History
```

## Security & Privacy

### Data Protection
- All personal information is encrypted
- Role-based access control for different user types
- Audit trails for data modifications
- GDPR compliance for student data

### Access Levels
- **Parents**: Access only their children's data
- **Teachers**: Access their students' data
- **Administrators**: Access school-wide data
- **Students**: Access only their own data

## Scalability Considerations

### Database Design
- Normalized data structure for efficient queries
- Indexed fields for fast searches
- Partitioned tables for large datasets
- Caching for frequently accessed data

### Performance Optimization
- Lazy loading for large datasets
- Pagination for list views
- Real-time updates using WebSockets
- Offline capability for critical functions

## Integration Points

### External Systems
- **Payment Gateways**: For donation processing
- **Email Services**: For notifications
- **SMS Services**: For urgent communications
- **Calendar Systems**: For event synchronization
- **Learning Management Systems**: For assignment integration

### APIs
- **RESTful APIs**: For mobile app integration
- **Webhook Support**: For real-time updates
- **OAuth Integration**: For third-party authentication
- **File Upload APIs**: For document management

This comprehensive data structure supports all the features implemented in the School Management System, providing a solid foundation for academic management, communication, and administrative tasks. 