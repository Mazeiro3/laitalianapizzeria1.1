import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Schedule, BusinessStatus } from '../types/schedule';

export const useSchedule = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [businessStatus, setBusinessStatus] = useState<BusinessStatus>({
    isOpen: false,
    message: 'Cargando horarios...'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const schedulesRef = collection(db, 'schedules');
    const q = query(schedulesRef, orderBy('dayIndex'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        try {
          const schedulesData: Schedule[] = [];
          snapshot.forEach((doc) => {
            schedulesData.push({
              id: doc.id,
              ...doc.data()
            } as Schedule);
          });

          setSchedules(schedulesData);
          setBusinessStatus(calculateBusinessStatus(schedulesData));
          setLoading(false);
          setError(null);
        } catch (err) {
          console.error('Error processing schedules:', err);
          setError('Error al procesar los horarios');
          setLoading(false);
        }
      },
      (err) => {
        console.error('Error fetching schedules:', err);
        setError('Error al cargar los horarios');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const calculateBusinessStatus = (schedules: Schedule[]): BusinessStatus => {
    if (schedules.length === 0) {
      return {
        isOpen: false,
        message: 'No hay horarios configurados'
      };
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentTime = now.getHours() * 60 + now.getMinutes(); // Minutes since midnight

    // Find today's schedule
    const todaySchedule = schedules.find(
      schedule => schedule.dayIndex === currentDay && schedule.isOpen
    );

    if (!todaySchedule) {
      // Find next open day
      const nextOpenTime = findNextOpenTime(schedules, currentDay);
      return {
        isOpen: false,
        nextOpenTime,
        message: 'Cerrado hoy'
      };
    }

    // Parse open and close times
    const [openHour, openMinute] = todaySchedule.openTime.split(':').map(Number);
    const [closeHour, closeMinute] = todaySchedule.closeTime.split(':').map(Number);
    
    const openTime = openHour * 60 + openMinute;
    const closeTime = closeHour * 60 + closeMinute;

    // Check if currently open
    const isCurrentlyOpen = currentTime >= openTime && currentTime < closeTime;

    if (isCurrentlyOpen) {
      return {
        isOpen: true,
        currentSchedule: todaySchedule,
        message: `Abierto hasta las ${todaySchedule.closeTime}`
      };
    } else if (currentTime < openTime) {
      return {
        isOpen: false,
        currentSchedule: todaySchedule,
        message: `Abre hoy a las ${todaySchedule.openTime}`
      };
    } else {
      // Already closed for today, find next open time
      const nextOpenTime = findNextOpenTime(schedules, currentDay);
      return {
        isOpen: false,
        nextOpenTime,
        message: 'Cerrado por hoy'
      };
    }
  };

  const findNextOpenTime = (schedules: Schedule[], currentDay: number) => {
    // Look for the next open day starting from tomorrow
    for (let i = 1; i <= 7; i++) {
      const nextDay = (currentDay + i) % 7;
      const nextSchedule = schedules.find(
        schedule => schedule.dayIndex === nextDay && schedule.isOpen
      );
      
      if (nextSchedule) {
        return {
          day: nextSchedule.day,
          time: nextSchedule.openTime
        };
      }
    }

    return undefined;
  };

  const getFormattedSchedules = () => {
    return schedules.map(schedule => ({
      day: schedule.day,
      hours: schedule.isOpen 
        ? `${schedule.openTime} - ${schedule.closeTime}` 
        : 'Cerrado',
      closed: !schedule.isOpen
    }));
  };

  return {
    schedules,
    businessStatus,
    loading,
    error,
    getFormattedSchedules
  };
};