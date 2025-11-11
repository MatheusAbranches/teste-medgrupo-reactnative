import { create } from 'zustand';
import { Class, School } from '../types';

interface AppState {
  schools: School[];
  classes: Class[];
  setSchools: (schools: School[]) => void;
  setClasses: (classes: Class[]) => void;
  addSchool: (school: School) => void;
  updateSchool: (id: string, school: Partial<School>) => void;
  deleteSchool: (id: string) => void;
  addClass: (classItem: Class) => void;
  updateClass: (id: string, classItem: Partial<Class>) => void;
  deleteClass: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  schools: [],
  classes: [],
  
  setSchools: (schools) => set({ schools }),
  setClasses: (classes) => set({ classes }),
  
  addSchool: (school) => set((state) => ({ 
    schools: [...state.schools, school] 
  })),
  
  updateSchool: (id, updatedSchool) => set((state) => ({
    schools: state.schools.map((school) =>
      school.id === id ? { ...school, ...updatedSchool } : school
    ),
  })),
  
  deleteSchool: (id) => set((state) => ({
    schools: state.schools.filter((school) => school.id !== id),
  })),
  
  addClass: (classItem) => set((state) => ({
    classes: [...state.classes, classItem],
  })),
  
  updateClass: (id, updatedClass) => set((state) => ({
    classes: state.classes.map((classItem) =>
      classItem.id === id ? { ...classItem, ...updatedClass } : classItem
    ),
  })),
  
  deleteClass: (id) => set((state) => ({
    classes: state.classes.filter((classItem) => classItem.id !== id),
  })),
}));
