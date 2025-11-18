'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Activity {
  id: string;
  type: 'create' | 'edit' | 'delete';
  postId: number;
  postTitle: string;
  timestamp: number;
}

interface ActivityContextType {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'timestamp'>) => void;
}

const ActivityContext = createContext<ActivityContextType | undefined>(undefined);

const STORAGE_KEY = 'postforge_activities';
const MAX_ACTIVITIES = 50; // Keep last 50 activities

export function ActivityProvider({ children }: { children: ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load activities from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Schedule state update asynchronously to avoid synchronous setState warning
        queueMicrotask(() => {
          setActivities(parsed);
        });
      }
    } catch (error) {
      console.error('Failed to load activities from localStorage', error);
    }
  }, []);

  // Save activities to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
    } catch (error) {
      console.error('Failed to save activities to localStorage', error);
    }
  }, [activities]);

  const addActivity = (activity: Omit<Activity, 'id' | 'timestamp'>) => {
    const newActivity: Activity = {
      ...activity,
      id: `${Date.now()}-${Math.random()}`,
      timestamp: Date.now(),
    };

    setActivities((prev) => {
      const updated = [newActivity, ...prev].slice(0, MAX_ACTIVITIES);
      return updated;
    });
  };

  return (
    <ActivityContext.Provider value={{ activities, addActivity }}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivity() {
  const context = useContext(ActivityContext);
  if (context === undefined) {
    throw new Error('useActivity must be used within an ActivityProvider');
  }
  return context;
}

