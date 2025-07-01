import React, { useState } from 'react';

const AIPoweredAnalytics: React.FC = () => {
  const [selectedInsight, setSelectedInsight] = useState('performance');

  const aiInsights = {
    performance: {
      title: 'Performance Analysis',
      insights: [
        {
          id: 1,
          type: 'trend',
          title: 'Mathematics Performance Trend',
          description: 'Maria shows a strong upward trend in mathematics with 15% improvement over the last 3 months.',
          confidence: 92,
          recommendation: 'Continue with current study methods. Consider advanced algebra topics.',
          impact: 'high',
          icon: '📈'
        },
        {
          id: 2,
          type: 'prediction',
          title: 'Science Grade Prediction',
          description: 'Based on current performance patterns, Maria is predicted to achieve a B+ in the upcoming science exam.',
          confidence: 87,
          recommendation: 'Focus on laboratory work and practical applications.',
          impact: 'medium',
          icon: '🔮'
        },
        {
          id: 3,
          type: 'alert',
          title: 'History Performance Alert',
          description: 'Recent assignments show declining performance in history. Intervention may be needed.',
          confidence: 78,
          recommendation: 'Schedule a meeting with the history teacher and review study strategies.',
          impact: 'high',
          icon: '⚠️'
        }
      ]
    },
    learning: {
      title: 'Learning Style Analysis',
      insights: [
        {
          id: 4,
          type: 'pattern',
          title: 'Visual Learning Preference',
          description: 'Maria performs 25% better on assignments that include visual elements and diagrams.',
          confidence: 94,
          recommendation: 'Incorporate more visual aids and mind maps in study sessions.',
          impact: 'high',
          icon: '👁️'
        },
        {
          id: 5,
          type: 'strength',
          title: 'Problem-Solving Strength',
          description: 'Exceptional performance in analytical and problem-solving tasks across all subjects.',
          confidence: 89,
          recommendation: 'Encourage participation in math competitions and science fairs.',
          impact: 'medium',
          icon: '🧩'
        }
      ]
    },
    behavior: {
      title: 'Behavioral Patterns',
      insights: [
        {
          id: 6,
          type: 'pattern',
          title: 'Study Time Optimization',
          description: 'Peak productivity occurs between 3-5 PM. Evening study sessions show 40% lower efficiency.',
          confidence: 91,
          recommendation: 'Schedule important study sessions during peak productivity hours.',
          impact: 'high',
          icon: '⏰'
        },
        {
          id: 7,
          type: 'correlation',
          title: 'Attendance-Performance Correlation',
          description: 'Strong positive correlation (0.85) between attendance and academic performance.',
          confidence: 88,
          recommendation: 'Maintain current excellent attendance record.',
          impact: 'medium',
          icon: '📊'
        }
      ]
    }
  };

  const predictions = [
    {
      subject: 'Mathematics',
      currentGrade: 'A',
      predictedGrade: 'A+',
      confidence: 92,
      factors: ['Consistent homework completion', 'Strong test performance', 'Active class participation']
    },
    {
      subject: 'Science',
      currentGrade: 'B',
      predictedGrade: 'B+',
      confidence: 87,
      factors: ['Improving lab work', 'Good project completion', 'Need for exam preparation']
    },
    {
      subject: 'English',
      currentGrade: 'A',
      predictedGrade: 'A',
      confidence: 95,
      factors: ['Excellent writing skills', 'Strong reading comprehension', 'Consistent performance']
    },
    {
      subject: 'History',
      currentGrade: 'C',
      predictedGrade: 'C+',
      confidence: 78,
      factors: ['Recent improvement trend', 'Better assignment completion', 'Need for continued support']
    }
  ];

  const recommendations = [
    {
      category: 'Academic',
      items: [
        'Schedule weekly review sessions for mathematics',
        'Join the school\'s science club to enhance practical skills',
        'Consider tutoring for history to improve understanding',
        'Participate in the upcoming math competition'
      ]
    },
    {
      category: 'Study Habits',
      items: [
        'Study during peak productivity hours (3-5 PM)',
        'Use visual aids and mind maps for complex topics',
        'Take regular breaks during study sessions',
        'Review notes within 24 hours of class'
      ]
    },
    {
      category: 'Extracurricular',
      items: [
        'Join the debate team to improve communication skills',
        'Participate in the school newspaper to enhance writing',
        'Consider joining the robotics club for STEM exposure',
        'Attend after-school study groups'
      ]
    }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600';
    if (confidence >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentInsights = aiInsights[selectedInsight as keyof typeof aiInsights];

  return (
    <section className="bg-white rounded-lg shadow p-6 mb-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1">
      <h2 className="text-xl font-semibold mb-4 animate-fade-in">AI Powered Analytics</h2>

      {/* AI Insights Navigation */}
      <div className="flex border-b mb-6">
        {Object.keys(aiInsights).map((key) => (
          <button
            key={key}
            onClick={() => setSelectedInsight(key)}
            className={`px-4 py-2 font-medium transition-colors duration-200 ${
              selectedInsight === key
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {aiInsights[key as keyof typeof aiInsights].title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Insights */}
        <div>
          <h3 className="font-semibold mb-4">AI Insights</h3>
          <div className="space-y-4">
            {currentInsights.insights.map((insight) => (
              <div
                key={insight.id}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{insight.title}</h4>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getImpactColor(insight.impact)}`}>
                        {insight.impact} impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{insight.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${getConfidenceColor(insight.confidence)}`}>
                        Confidence: {insight.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-blue-50 rounded p-3">
                  <h5 className="font-medium text-sm mb-1">AI Recommendation:</h5>
                  <p className="text-sm text-gray-700">{insight.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Predictions */}
        <div>
          <h3 className="font-semibold mb-4">Grade Predictions</h3>
          <div className="space-y-3">
            {predictions.map((prediction) => (
              <div
                key={prediction.subject}
                className="border rounded-lg p-4 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">{prediction.subject}</h4>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Current: {prediction.currentGrade}</div>
                    <div className="text-lg font-bold text-blue-600">Predicted: {prediction.predictedGrade}</div>
                  </div>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Confidence</span>
                    <span className={`font-medium ${getConfidenceColor(prediction.confidence)}`}>
                      {prediction.confidence}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${prediction.confidence >= 90 ? 'bg-green-500' : prediction.confidence >= 80 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${prediction.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  <div className="font-medium mb-1">Key Factors:</div>
                  <ul className="space-y-1">
                    {prediction.factors.map((factor, index) => (
                      <li key={index} className="flex items-center gap-1">
                        <span className="text-green-500">•</span>
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="mt-6 pt-6 border-t">
        <h3 className="font-semibold mb-4">AI Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((category) => (
            <div key={category.category} className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold mb-3 text-blue-600">{category.category}</h4>
              <ul className="space-y-2">
                {category.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* AI Analytics Summary */}
      <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
        <h3 className="font-semibold mb-3">AI Analytics Summary</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">7</div>
            <div className="text-sm text-gray-600">AI Insights</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <div className="text-sm text-gray-600">Average Confidence</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <div className="text-sm text-gray-600">Recommendations</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">4</div>
            <div className="text-sm text-gray-600">Grade Predictions</div>
          </div>
        </div>
        <div className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> AI insights are based on historical data and current performance patterns. 
          Regular updates ensure accuracy and relevance of recommendations.
        </div>
      </div>
    </section>
  );
};

export default AIPoweredAnalytics; 