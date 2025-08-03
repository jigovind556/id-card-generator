import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, ArrowLeft, Upload, X } from 'lucide-react';

const StudentEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { students, updateStudent } = useData();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    class: '',
    rollNo: '',
    admissionNo: '',
    fatherName: '',
    dob: '',
    aadhar: '',
    phone: '',
    bloodGroup: '',
    address: '',
    apaarId: '',
    photoURL: ''
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');

  useEffect(() => {
    if (id) {
      const student = students.find(s => s.id === id);
      if (student) {
        setFormData({
          name: student.name || '',
          class: student.class || '',
          rollNo: student.rollNo || '',
          admissionNo: student.admissionNo || '',
          fatherName: student.fatherName || '',
          dob: student.dob || '',
          aadhar: student.aadhar || '',
          phone: student.phone || '',
          bloodGroup: student.bloodGroup || '',
          address: student.address || '',
          apaarId: student.apaarId || '',
          photoURL: student.photoURL || ''
        });
        
        // Set preview URL if student has a photo
        if (student.photoURL) {
          setPreviewURL(student.photoURL);
        }
      } else {
        toast({
          title: "Error",
          description: "Student not found",
          variant: "destructive"
        });
        navigate('/students/preview');
      }
    }
  }, [id, students, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check if the file is an image
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive"
        });
        return;
      }

      setSelectedImage(file);
      
      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewURL(url);

      // Convert the image to base64 data URL
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setFormData(prev => ({
            ...prev,
            photoURL: reader.result as string
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewURL('');
    setFormData(prev => ({
      ...prev,
      photoURL: ''
    }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.class || !formData.rollNo) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (id) {
      updateStudent(id, formData);
      
      toast({
        title: "Success",
        description: "Student updated successfully!",
      });

      navigate('/students/preview');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/students/preview')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Students</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Student</h1>
          <p className="text-gray-600">Update student details for ID card</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Student Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    placeholder="Enter full name" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class">Class <span className="text-red-500">*</span></Label>
                  <Input 
                    id="class" 
                    name="class" 
                    value={formData.class} 
                    onChange={handleChange} 
                    placeholder="e.g. 10th" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rollNo">Roll Number <span className="text-red-500">*</span></Label>
                  <Input 
                    id="rollNo" 
                    name="rollNo" 
                    value={formData.rollNo} 
                    onChange={handleChange} 
                    placeholder="Enter roll number" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="admissionNo">Admission Number</Label>
                  <Input 
                    id="admissionNo" 
                    name="admissionNo" 
                    value={formData.admissionNo} 
                    onChange={handleChange} 
                    placeholder="Enter admission number" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fatherName">Father's Name</Label>
                  <Input 
                    id="fatherName" 
                    name="fatherName" 
                    value={formData.fatherName} 
                    onChange={handleChange} 
                    placeholder="Enter father's name" 
                  />
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input 
                    id="dob" 
                    name="dob" 
                    type="date" 
                    value={formData.dob} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aadhar">Aadhar Number</Label>
                  <Input 
                    id="aadhar" 
                    name="aadhar" 
                    value={formData.aadhar} 
                    onChange={handleChange} 
                    placeholder="Enter aadhar number" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    placeholder="Enter phone number" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input 
                    id="bloodGroup" 
                    name="bloodGroup" 
                    value={formData.bloodGroup} 
                    onChange={handleChange} 
                    placeholder="e.g. A+" 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea 
                    id="address" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                    placeholder="Enter full address" 
                    className="h-24"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Additional Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="apaarId">APAAR ID</Label>
                <Input 
                  id="apaarId" 
                  name="apaarId" 
                  value={formData.apaarId} 
                  onChange={handleChange} 
                  placeholder="Enter APAAR ID" 
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Photo Upload</h3>
              
              <div className="space-y-2">
                <Label htmlFor="photoUpload">Student's Photo</Label>
                <input
                  type="file"
                  id="photoUpload"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                {previewURL ? (
                  <div className="relative w-40 h-48 border rounded-md overflow-hidden">
                    <img 
                      src={previewURL} 
                      alt="Photo preview" 
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ) : (
                  <div 
                    onClick={triggerFileInput}
                    className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer hover:bg-gray-50"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload an image</p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or GIF files</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Button 
                type="submit" 
                className="flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>Update Student</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentEdit;
