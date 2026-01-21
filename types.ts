export interface Student {
  id: string;
  name: string;
  avatar: string;
  attendance: number;
  grade: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused' | 'Pending';
}

export interface QueryResult {
  id: string;
  name: string;
  grade: string;
  age: number;
}

export type ChartType = 'area' | 'bar' | 'line' | 'pie' | 'multi-line';

export interface ChartDef {
  id: string;
  title: string;
  type: ChartType;
  trend: 'up' | 'down' | 'neutral';
  data: any[]; // Flexible data for different charts
  dataKeys?: string[]; // Used for multi-line or specific bar keys
  colors?: string[]; // For multi-colored charts like Pie or Multi-line
  color: string; // Primary color
}

export interface QueryItem {
  id: string;
  text: string;
  isFavorite: boolean;
  timestamp: string;
}

export type ViewState = 'dashboard' | 'history' | 'chat' | 'students';

export type OverlayState = 'none' | 'activity' | 'query_result' | 'chart_expanded';
export type ActivityType = 'attendance' | 'create_course' | null;