import { Student, QueryResult, ChartDef, QueryItem } from './types';

export const STUDENTS: Student[] = [
  {
    id: '1',
    name: 'Alice Freeman',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD74WGl0-pEYLGoKbSGwm1TLlDYrLtN07ljJGKA6kNYc-7zBR0sWt-7AeNkpU-bBN-f5o-vxnLd4JbGi5nVypQAuDQXw5YYy3c9W4hTTppvn1DncpQtS4At01magAs8EugJ3zYzMZkHqf6Du0nhFCwGxh7lBDQWUusQ9lIYwcnsp-KnlnkYCv7-I9rNkjSplZBpXDyQ8ffpZwV-S0ngcQvOMYKI_hpAzMcvDgWSIhDscwQi7EfK4rsbhlt1YrH_4J_kc07lgvzN',
    attendance: 95,
    grade: 'A',
    status: 'Present',
  },
  {
    id: '2',
    name: 'Bobby Tables',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHLdqj8SSrXBABsAnfje28lbVGkqy3wgGeQSUkZuTfUCQOz93pGqg6CIW_idB2Eo7f7WJcZKeqiyXlnqye20IzbizAS-1GLbrIRWnWee3yhtQPmMxFevyQCgTCdCrxgpmy8RNTVINypqIGUy2AKXcd-KgAc4eAExdiQ_QI1VlvTmTkYzG6alz4qkGhsLiEhCq851JPsaAg7HGLmvUuS9jKzdH6F6x6ju3rDPkT3-mOz8lrZkdGfdM0aA31ily6Pyw6TEWbHNm2',
    attendance: 82,
    grade: 'B-',
    status: 'Absent',
  },
  {
    id: '3',
    name: 'Charlie D.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2Gu5gZ0zEcRGLajwSAEmRGIGOyK9Rxotmmv3tPZvPjh2GX1f2juZ5CQtLzmcYO-Duk2Og0WhJmSePlVN3rgbeABzJruex8kWV4FqfkvWAnEN0-v3Ba8-w9_WAOyFsWeQQErNEwCeOAO3NBd5uBKAWph2P4fe2Muj7sn9Ail5cT8t7P945qE8Hgpsrgdi-D6K_sDNs7MhLgYe6EZwjbzxSjFGtFaVWXKmoYTGsrb8v8AApqgnTBwMFvJOUebOMi0bK0oDTXiS',
    attendance: 100,
    grade: 'A+',
    status: 'Present',
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxjZZGag5qSgoLWPXtIyyC9_God0zwX3ElOIRm3d4NO4-Vs3XIiu1SiYoR7BkZxad5Lzf6z1zJmS9UQdJdebqiqUG5JGzcFsuHzDDkdZWiGKjMdXZgKCwAbAzAyOgZGw6pHgZonIbRw4FGApC5K43k3m-xQH78AVHDqY6swOk44NXHQsWen6BKeMjZcvc8qmds5wSkmwXR8VKtRBkoGvPXDRpos9CNNbr6d3kTTyiaiakJ0xpzq3IZaSj9xGGjITkDXhh3-q98',
    attendance: 98,
    grade: 'A',
    status: 'Present',
  },
  {
    id: '5',
    name: 'Evan Wright',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBja9Zn14hJIraZ7Rcc_AoXAIkoavQ0ZamPt1RSRzsFWvDVMQqoSlPQXFnqW7A2kL_KJ1wyw7qt9j5LPGo6EzobUJZSxKSkfTZAVzqLg4kVanV9Uo-kc_Bg_PKh86gI4wSsOAFJB5yz3yyr08Mu0kfJS6RBzpgH-0o0kX7fCl_9v3S2vhGBz6u5xDJMD0Z_1MFE73Jrbw8LNXCM37YzlG1snPJlWIQ3__dI2RiJtGegFOHRj3M_hrJuqhsiwvRrVGuWIKtUVN3c',
    attendance: 0,
    grade: 'N/A',
    status: 'Pending',
  },
];

export const QUERY_RESULTS: QueryResult[] = [
  { id: '#4829', name: 'Michael Chen', grade: '10th', age: 16 },
  { id: '#9921', name: 'Emma Wilson', grade: '12th', age: 18 },
  { id: '#1209', name: 'Liam Johnson', grade: '9th', age: 15 },
  { id: '#3847', name: 'Sophia Davis', grade: '11th', age: 17 },
];

export const INITIAL_QUERIES: QueryItem[] = [
  { id: '1', text: 'Show failing grades in Math', isFavorite: true, timestamp: '10:00 AM' },
  { id: '2', text: 'Attendance < 80% last month', isFavorite: true, timestamp: '9:45 AM' },
  { id: '3', text: 'Students with birthday today', isFavorite: false, timestamp: '9:30 AM' },
  { id: '4', text: 'Grade distribution for Science', isFavorite: false, timestamp: 'Yesterday' },
  { id: '5', text: 'Export Senior class list', isFavorite: false, timestamp: 'Yesterday' },
];

export const DASHBOARD_CHARTS: ChartDef[] = [
  {
    id: 'engagement',
    title: 'Weekly Engagement',
    type: 'area',
    trend: 'up',
    color: '#3b82f6', // Blue
    data: [
      { name: 'Mon', value: 20 }, { name: 'Tue', value: 45 }, { name: 'Wed', value: 35 },
      { name: 'Thu', value: 80 }, { name: 'Fri', value: 55 }, { name: 'Sat', value: 65 }, { name: 'Sun', value: 40 },
    ]
  },
  {
    id: 'grades',
    title: 'Average Grade',
    type: 'line',
    trend: 'up',
    color: '#3b82f6',
    data: [
      { name: 'W1', value: 75 }, { name: 'W2', value: 78 }, { name: 'W3', value: 82 },
      { name: 'W4', value: 80 }, { name: 'W5', value: 85 },
    ]
  },
  {
    id: 'assignments',
    title: 'Assignments',
    type: 'bar',
    trend: 'neutral',
    color: '#64748b', // Slate
    data: [
      { name: 'Mon', value: 12 }, { name: 'Tue', value: 18 }, { name: 'Wed', value: 10 },
      { name: 'Thu', value: 24 }, { name: 'Fri', value: 16 },
    ]
  },
  {
    id: 'performance',
    title: 'Subject Perf.',
    type: 'multi-line',
    trend: 'up',
    color: '#8b5cf6', // Violet
    dataKeys: ['Math', 'Sci'],
    colors: ['#8b5cf6', '#ec4899'],
    data: [
      { name: 'Q1', Math: 65, Sci: 70 },
      { name: 'Q2', Math: 72, Sci: 75 },
      { name: 'Q3', Math: 85, Sci: 80 },
      { name: 'Q4', Math: 90, Sci: 88 },
    ]
  },
  {
    id: 'study_dist',
    title: 'Study Time',
    type: 'pie',
    trend: 'neutral',
    color: '#10b981', // Emerald
    colors: ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'],
    data: [
      { name: 'Reading', value: 40 },
      { name: 'Practice', value: 30 },
      { name: 'Lectures', value: 20 },
      { name: 'Notes', value: 10 },
    ]
  },
  {
    id: 'absence',
    title: 'Absence Rate',
    type: 'area',
    trend: 'down',
    color: '#f97316', // Orange
    data: [
      { name: 'W1', value: 5 }, { name: 'W2', value: 8 }, { name: 'W3', value: 6 },
      { name: 'W4', value: 4 }, { name: 'W5', value: 2 },
    ]
  },
  {
    id: 'credits',
    title: 'Credits Earned',
    type: 'bar',
    trend: 'up',
    color: '#14b8a6', // Teal
    data: [
      { name: 'Yr1', value: 12 }, { name: 'Yr2', value: 24 }, { name: 'Yr3', value: 30 }, { name: 'Yr4', value: 10 },
    ]
  },
  {
    id: 'homework_completion',
    title: 'Homework',
    type: 'bar',
    trend: 'up',
    color: '#8b5cf6', // Violet
    data: [
      { name: 'Mon', value: 85 }, { name: 'Tue', value: 90 }, { name: 'Wed', value: 75 },
      { name: 'Thu', value: 95 }, { name: 'Fri', value: 100 },
    ]
  },
  {
    id: 'test_scores_history',
    title: 'Test Scores',
    type: 'line',
    trend: 'neutral',
    color: '#ef4444', // Red
    data: [
      { name: 'Math', value: 88 }, { name: 'Eng', value: 92 }, { name: 'Sci', value: 85 },
      { name: 'Hist', value: 90 }, { name: 'Art', value: 95 },
    ]
  },
  {
    id: 'online_activity',
    title: 'Online Activity',
    type: 'area',
    trend: 'up',
    color: '#06b6d4', // Cyan
    data: [
      { name: '8am', value: 10 }, { name: '10am', value: 40 }, { name: '12pm', value: 30 },
      { name: '2pm', value: 60 }, { name: '4pm', value: 80 }, { name: '6pm', value: 50 },
    ]
  },
  {
    id: 'focus_sessions',
    title: 'Focus Sessions',
    type: 'bar',
    trend: 'down',
    color: '#f59e0b', // Amber
    data: [
      { name: 'M', value: 4 }, { name: 'T', value: 3 }, { name: 'W', value: 5 },
      { name: 'T', value: 2 }, { name: 'F', value: 3 },
    ]
  },
  {
    id: 'device_usage',
    title: 'Device Usage',
    type: 'pie',
    trend: 'neutral',
    color: '#6366f1', // Indigo
    colors: ['#3b82f6', '#10b981', '#f59e0b'],
    data: [
      { name: 'Desktop', value: 55 },
      { name: 'Mobile', value: 30 },
      { name: 'Tablet', value: 15 },
    ]
  },
   {
    id: 'peer_comparison',
    title: 'Peer Comp.',
    type: 'multi-line',
    trend: 'up',
    color: '#10b981', // Emerald
    dataKeys: ['You', 'Avg'],
    colors: ['#10b981', '#94a3b8'],
    data: [
      { name: 'W1', You: 75, Avg: 70 },
      { name: 'W2', You: 78, Avg: 72 },
      { name: 'W3', You: 85, Avg: 75 },
      { name: 'W4', You: 82, Avg: 76 },
      { name: 'W5', You: 88, Avg: 78 },
    ]
  }
];

// Replaced random logos with the specific shared logo brand asset
// Using a placeholder URL that represents "Cat sitting backwards" style
export const BRAND_LOGO = "https://cdn-icons-png.flaticon.com/512/3468/3468377.png"; 

// If you want to use your local file, replace the string above with: "/student_cat_logo.png"
// and place the file in your public folder.