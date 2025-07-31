export interface Schedule {
  id: string;
  dayIndex: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  day: string;
  isOpen: boolean;
  openTime: string; // Format: "14:00"
  closeTime: string; // Format: "22:00"
}

export interface BusinessStatus {
  isOpen: boolean;
  currentSchedule?: Schedule;
  nextOpenTime?: {
    day: string;
    time: string;
  };
  message?: string;
}