import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IDCard from '@/components/IDCard';
import { useReactToPrint } from 'react-to-print';
import { ArrowLeft, Printer, Plus, Users } from 'lucide-react';

const TeacherPreview: React.FC = () => {
  const navigate = useNavigate();
  const { teachers } = useData();
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: 'Teacher ID Cards',
    pageStyle: `
      @page {
        size: A4;
        margin: 10mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
        }
        .print-container {
          width: 100%;
        }
        .teacher-card-row {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 10px;
          page-break-inside: avoid;
        }
        .teacher-card-row .id-card {
          flex-shrink: 0;
        }
        .no-print {
          display: none !important;
        }
      }
    `
  });

  // Group teachers into pairs for printing (2 per row)
  const teacherPairs = [];
  for (let i = 0; i < teachers.length; i += 2) {
    teacherPairs.push(teachers.slice(i, i + 2));
  }

  if (teachers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher ID Cards</h1>
            <p className="text-gray-600">Preview and print teacher ID cards</p>
          </div>
        </div>

        <Card className="text-center py-12">
          <CardContent>
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Teachers Found</h3>
            <p className="text-gray-600 mb-6">
              Add teachers to the system to generate and preview their ID cards.
            </p>
            <div className="space-x-4">
              <Button onClick={() => navigate('/teachers/add')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Single Teacher
              </Button>
              <Button variant="outline" onClick={() => navigate('/teachers/upload')}>
                Upload Excel File
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Teacher ID Cards</h1>
            <p className="text-gray-600">Preview and print {teachers.length} teacher ID cards</p>
          </div>
        </div>
        
        <div className="no-print space-x-4">
          <Button variant="outline" onClick={() => navigate('/teachers/add')}>
            <Plus className="h-4 w-4 mr-2" />
            Add Teacher
          </Button>
          <Button onClick={handlePrint} className="flex items-center space-x-2">
            <Printer className="h-4 w-4" />
            <span>Print All Cards</span>
          </Button>
        </div>
      </div>

      {/* Print Instructions */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle>Print Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-1">Print Settings</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Page Size: A4</li>
                <li>• Orientation: Portrait</li>
                <li>• Margins: Minimum</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Card Specifications</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Final Size: 324px × 204px</li>
                <li>• Layout: 2 cards per row</li>
                <li>• Color: Full color print</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-1">Tips</h4>
              <ul className="text-gray-600 space-y-1">
                <li>• Use high-quality paper</li>
                <li>• Enable background graphics</li>
                <li>• Cards stay together on same line</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ID Cards Preview */}
      <div ref={printRef} className="print-container">
        <style jsx global>{`
          @media print {
            .teacher-card-row {
              display: flex;
              justify-content: center;
              gap: 20px;
              margin-bottom: 10px;
              page-break-inside: avoid;
            }
            .teacher-card-row .id-card {
              flex-shrink: 0;
            }
          }
        `}</style>
        
        <div className="space-y-4">
          {teacherPairs.map((pair, index) => (
            <div key={index} className="teacher-card-row flex justify-center gap-5">
              {pair.map((teacher) => (
                <IDCard
                  key={teacher.id}
                  name={teacher.name}
                  designation={teacher.designation}
                  subject={teacher.subject}
                  doj={teacher.doj}
                  dob={teacher.dob}
                  aadhar={teacher.aadhar}
                  phone={teacher.phone}
                  bloodGroup={teacher.bloodGroup}
                  address={teacher.address}
                  teacherId={teacher.teacherId}
                  photoURL={teacher.photoURL}
                  principalSignURL={teacher.principalSignURL}
                  isTeacher={true}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Teacher List Summary */}
      <Card className="no-print">
        <CardHeader>
          <CardTitle>Teachers Summary ({teachers.length} total)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teachers.map((teacher) => (
              <div key={teacher.id} className="border rounded-lg p-3">
                <h4 className="font-medium">{teacher.name}</h4>
                <p className="text-sm text-gray-600">Designation: {teacher.designation}</p>
                <p className="text-sm text-gray-600">Subject: {teacher.subject}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherPreview;
