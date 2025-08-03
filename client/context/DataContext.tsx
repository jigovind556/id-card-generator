import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Student {
  id: string;
  name: string;
  class: string;
  rollNo: string;
  admissionNo: string;
  fatherName: string;
  dob: string;
  aadhar: string;
  phone: string;
  bloodGroup: string;
  address: string;
  apaarId: string;
  photoURL?: string;
}

export interface Teacher {
  id: string;
  name: string;
  designation: string;
  subject: string;
  doj: string;
  dob: string;
  aadhar: string;
  phone: string;
  bloodGroup: string;
  address: string;
  teacherId: string;
  photoURL?: string;
}

interface DataContextType {
  students: Student[];
  teachers: Teacher[];
  addStudent: (student: Omit<Student, 'id'>) => void;
  addTeacher: (teacher: Omit<Teacher, 'id'>) => void;
  addMultipleStudents: (students: Omit<Student, 'id'>[]) => void;
  addMultipleTeachers: (teachers: Omit<Teacher, 'id'>[]) => void;
  updateStudent: (id: string, student: Omit<Student, 'id'>) => void;
  updateTeacher: (id: string, teacher: Omit<Teacher, 'id'>) => void;
  deleteStudent: (id: string) => void;
  deleteTeacher: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedStudents = localStorage.getItem('school-students');
    const savedTeachers = localStorage.getItem('school-teachers');
    
    if (savedStudents) {
      setStudents(JSON.parse(savedStudents));
    }
    if (savedTeachers) {
      setTeachers(JSON.parse(savedTeachers));
    }
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('school-students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('school-teachers', JSON.stringify(teachers));
  }, [teachers]);

  const addStudent = (studentData: Omit<Student, 'id'>) => {
    const newStudent: Student = {
      ...studentData,
      id: Date.now().toString()
    };
    setStudents(prev => [...prev, newStudent]);
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: Date.now().toString()
    };
    setTeachers(prev => [...prev, newTeacher]);
  };

  const addMultipleStudents = (studentsData: Omit<Student, 'id'>[]) => {
    const newStudents: Student[] = studentsData.map((student, index) => ({
      ...student,
      id: (Date.now() + index).toString()
    }));
    setStudents(prev => [...prev, ...newStudents]);
  };

  const addMultipleTeachers = (teachersData: Omit<Teacher, 'id'>[]) => {
    const newTeachers: Teacher[] = teachersData.map((teacher, index) => ({
      ...teacher,
      id: (Date.now() + index).toString()
    }));
    setTeachers(prev => [...prev, ...newTeachers]);
  };

  const updateStudent = (id: string, studentData: Omit<Student, 'id'>) => {
    setStudents(prev => 
      prev.map(student => student.id === id ? { ...studentData, id } : student)
    );
  };

  const updateTeacher = (id: string, teacherData: Omit<Teacher, 'id'>) => {
    setTeachers(prev => 
      prev.map(teacher => teacher.id === id ? { ...teacherData, id } : teacher)
    );
  };

  const deleteStudent = (id: string) => {
    setStudents(prev => prev.filter(student => student.id !== id));
  };

  const deleteTeacher = (id: string) => {
    setTeachers(prev => prev.filter(teacher => teacher.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        students,
        teachers,
        addStudent,
        addTeacher,
        addMultipleStudents,
        addMultipleTeachers,
        updateStudent,
        updateTeacher,
        deleteStudent,
        deleteTeacher
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
