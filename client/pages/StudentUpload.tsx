import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { parseStudentExcel, downloadExcelTemplate } from '@/utils/excelParser';
import { Upload, Download, ArrowLeft, FileSpreadsheet, CheckCircle, AlertCircle } from 'lucide-react';

const StudentUpload: React.FC = () => {
  const navigate = useNavigate();
  const { addMultipleStudents } = useData();
  const { toast } = useToast();
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedCount, setUploadedCount] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' && 
          file.type !== 'application/vnd.ms-excel') {
        toast({
          title: "Invalid file type",
          description: "Please select an Excel file (.xlsx or .xls)",
          variant: "destructive"
        });
        return;
      }
      setSelectedFile(file);
      setUploadStatus('idle');
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setUploadStatus('idle');

    try {
      const students = await parseStudentExcel(selectedFile);
      
      if (students.length === 0) {
        throw new Error('No valid student data found in the Excel file');
      }

      addMultipleStudents(students);
      setUploadedCount(students.length);
      setUploadStatus('success');
      
      toast({
        title: "Upload successful!",
        description: `Successfully added ${students.length} students`,
      });

      // Clear the file input
      setSelectedFile(null);
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      setUploadStatus('error');
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to process Excel file",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownloadTemplate = () => {
    downloadExcelTemplate('student');
    toast({
      title: "Template downloaded",
      description: "Excel template has been downloaded to your device",
    });
  };

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
          <h1 className="text-3xl font-bold text-gray-900">Upload Students Excel</h1>
          <p className="text-gray-600">Bulk upload student data from Excel file</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Upload className="h-5 w-5" />
              <span>Upload Excel File</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <FileSpreadsheet className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Select an Excel file (.xlsx or .xls) with student data
                </p>
                <input
                  id="file-upload"
                  type="file"
                  accept=".xlsx,.xls"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  Choose File
                </Button>
              </div>
            </div>

            {selectedFile && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-blue-900">{selectedFile.name}</p>
                    <p className="text-sm text-blue-700">
                      {(selectedFile.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    onClick={handleUpload}
                    disabled={isUploading}
                    className="flex items-center space-x-2"
                  >
                    <Upload className="h-4 w-4" />
                    <span>{isUploading ? 'Uploading...' : 'Upload'}</span>
                  </Button>
                </div>
              </div>
            )}

            {/* Upload Status */}
            {uploadStatus === 'success' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Upload Successful!</p>
                    <p className="text-sm text-green-700">
                      Successfully added {uploadedCount} students to the system
                    </p>
                  </div>
                </div>
                <div className="mt-3">
                  <Button
                    size="sm"
                    onClick={() => navigate('/students/preview')}
                  >
                    View Students
                  </Button>
                </div>
              </div>
            )}

            {uploadStatus === 'error' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <div>
                    <p className="font-medium text-red-900">Upload Failed</p>
                    <p className="text-sm text-red-700">
                      Please check your Excel file format and try again
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Template & Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Download className="h-5 w-5" />
              <span>Excel Template</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                Download the Excel template to ensure your data is formatted correctly.
              </p>
              
              <Button
                variant="outline"
                onClick={handleDownloadTemplate}
                className="w-full flex items-center space-x-2"
              >
                <Download className="h-4 w-4" />
                <span>Download Student Template</span>
              </Button>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Required Columns:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Name</strong> - Full student name</li>
                <li>• <strong>Class</strong> - Student class (e.g., XII-B)</li>
                <li>• <strong>Roll No</strong> - Student roll number</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-2">Optional Columns:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Admission No</li>
                <li>• Father's Name</li>
                <li>• Date of Birth</li>
                <li>• Aadhar No</li>
                <li>• Phone</li>
                <li>• Blood Group</li>
                <li>• Address</li>
                <li>• APAAR ID</li>
                <li>• Photo URL</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Make sure the first row contains column headers exactly as shown in the template.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentUpload;
