# School Management System

A comprehensive school management system built with Next.js, React, and TypeScript. This application provides a modern, user-friendly interface for managing school operations, student performance tracking, parent communication, and administrative tasks.

## Features

### 🏫 Core School Management
- **Multi-step Authentication Flow**: Secure login system with role-based access
- **Parent Dashboard**: Real-time monitoring of children's academic progress
- **Student Performance Tracking**: GPA monitoring, subject-wise analysis, and trend visualization
- **Attendance Monitoring**: Daily attendance tracking with visual calendar interface
- **Assignment Management**: Homework tracking, due date management, and completion status

### 👨‍👩‍👧‍👦 Parent Features
- **Multi-Child Support**: Manage multiple children from a single dashboard
- **Performance Analytics**: Detailed academic performance with charts and trends
- **Communication Hub**: Direct messaging with teachers and school staff
- **Calendar Integration**: Academic events, parent-teacher conferences, and exam schedules
- **Real-time Notifications**: Instant alerts for important updates

### 📊 Academic Analytics
- **GPA Calculation**: Automatic grade point average computation
- **Subject Performance**: Individual subject analysis with improvement tracking
- **Historical Data**: Term-wise performance records and trend analysis
- **Class Ranking**: Student position tracking within class
- **Achievement Recognition**: Student accomplishments and milestones

### 🎨 Modern UI/UX
- **Responsive Design**: Mobile-first approach with tablet and desktop optimization
- **Dark/Light Mode**: Toggle between themes for user preference
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Accessibility**: WCAG compliant design for inclusive access
- **Interactive Components**: Hover effects and micro-interactions

## Technology Stack

- **Frontend**: Next.js 15.3.1, React 19.0.0, TypeScript
- **Styling**: Tailwind CSS with custom components
- **UI Components**: Radix UI primitives with custom styling
- **Animations**: Framer Motion
- **Charts**: Recharts and Chart.js for data visualization
- **Authentication**: NextAuth.js
- **Icons**: Lucide React and React Icons

## Getting Started

### Prerequisites
- Node.js v18.17+
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd school-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── login/             # Login page
│   ├── parent-dashboard/  # Parent dashboard page
│   └── welcomeScreen/     # Welcome screen page
├── components/            # React components
│   ├── pages/            # Page components
│   ├── ui/               # UI components (buttons, inputs, etc.)
│   ├── layout/           # Layout components
│   └── sections/         # Section components
├── lib/                  # Utility functions
└── styles/               # Global styles
```

## Key Components

### Authentication
- `AuthFlow.tsx` - Multi-step authentication flow
- `LoginCard.tsx` - Login interface
- `SignUpCard.tsx` - Registration interface
- `WelcomeCard.tsx` - Welcome screen

### Dashboard
- `ParentDashboard.tsx` - Main parent dashboard
- `PerformancePage.tsx` - Performance analytics
- `MessagesPage.tsx` - Communication interface
- `ProfilePage.tsx` - User profile management

### Academic Management
- `AcademicPerformance.tsx` - Academic performance tracking
- `AttendanceMonitoring.tsx` - Attendance management
- `AssignmentHomeworkTracker.tsx` - Assignment tracking
- `CalendarEventManagement.tsx` - Calendar and events

## User Roles

### Parents
- Monitor children's academic performance
- Track attendance and assignments
- Communicate with teachers
- Access academic calendar
- Manage multiple children

### Students
- View personal performance data
- Track assignments and grades
- Access attendance records
- View achievements and milestones

### Teachers
- Monitor student performance
- Manage attendance records
- Create and grade assignments
- Communicate with parents
- Access class analytics

### Administrators
- School-wide analytics and reporting
- User management and access control
- System configuration
- Performance monitoring

## Security Features

- **Authentication**: Secure login with NextAuth.js
- **Role-based Access**: Different permissions for different user types
- **Data Protection**: Secure data handling and storage
- **Session Management**: Proper session handling and timeout

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Built with ❤️ for modern education management**