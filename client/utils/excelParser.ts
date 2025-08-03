import * as XLSX from 'xlsx';
import { Student, Teacher } from '@/context/DataContext';

export interface StudentExcelRow {
  Name: string;
  Class: string;
  'Roll No': string;
  'Admission No'?: string;
  "Father's Name"?: string;
  'Date of Birth'?: string;
  'Aadhar No'?: string;
  Phone?: string;
  'Blood Group'?: string;
  Address?: string;
  'APAAR ID'?: string;
  'Photo URL'?: string;
}

export interface TeacherExcelRow {
  Name: string;
  Designation: string;
  Subject: string;
  'Date of Joining'?: string;
  'Date of Birth'?: string;
  'Aadhar No'?: string;
  Phone?: string;
  'Blood Group'?: string;
  Address?: string;
  'Teacher ID'?: string;
  'Photo URL'?: string;
}

export const parseStudentExcel = (file: File): Promise<Omit<Student, 'id'>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: StudentExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
        
        const students: Omit<Student, 'id'>[] = jsonData.map((row) => ({
          name: row.Name || '',
          class: row.Class || '',
          rollNo: row['Roll No'] || '',
          admissionNo: row['Admission No'] || '',
          fatherName: row["Father's Name"] || '',
          dob: formatDate(row['Date of Birth']),
          aadhar: row['Aadhar No'] || '',
          phone: row.Phone || '',
          bloodGroup: row['Blood Group'] || '',
          address: row.Address || '',
          apaarId: row['APAAR ID'] || '',
          photoURL: row['Photo URL'] || ''
        }));
        
        resolve(students);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please check the format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsBinaryString(file);
  });
};

export const parseTeacherExcel = (file: File): Promise<Omit<Teacher, 'id'>[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData: TeacherExcelRow[] = XLSX.utils.sheet_to_json(worksheet);
        
        const teachers: Omit<Teacher, 'id'>[] = jsonData.map((row) => ({
          name: row.Name || '',
          designation: row.Designation || '',
          subject: row.Subject || '',
          doj: formatDate(row['Date of Joining']),
          dob: formatDate(row['Date of Birth']),
          aadhar: row['Aadhar No'] || '',
          phone: row.Phone || '',
          bloodGroup: row['Blood Group'] || '',
          address: row.Address || '',
          teacherId: row['Teacher ID'] || '',
          photoURL: row['Photo URL'] || ''
        }));
        
        resolve(teachers);
      } catch (error) {
        reject(new Error('Failed to parse Excel file. Please check the format.'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsBinaryString(file);
  });
};

const formatDate = (dateValue: any): string => {
  if (!dateValue) return '';
  
  // If it's already a string in DD-MM-YYYY format, return as is
  if (typeof dateValue === 'string' && dateValue.match(/^\d{2}-\d{2}-\d{4}$/)) {
    return dateValue;
  }
  
  // If it's a date object or date string
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return '';
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
  } catch {
    return '';
  }
};

export const downloadExcelTemplate = (type: 'student' | 'teacher') => {
  const studentHeaders = [
    'Name', 'Class', 'Roll No', 'Admission No', "Father's Name", 
    'Date of Birth', 'Aadhar No', 'Phone', 'Blood Group', 'Address', 
    'APAAR ID', 'Photo URL'
  ];
  
  const teacherHeaders = [
    'Name', 'Designation', 'Subject', 'Date of Joining', 'Date of Birth',
    'Aadhar No', 'Phone', 'Blood Group', 'Address', 'Teacher ID',
    'Photo URL'
  ];
  
  const headers = type === 'student' ? studentHeaders : teacherHeaders;
  
  const worksheet = XLSX.utils.aoa_to_sheet([headers]);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, type === 'student' ? 'Students' : 'Teachers');
  
  const fileName = `${type}_template.xlsx`;
  XLSX.writeFile(workbook, fileName);
};
