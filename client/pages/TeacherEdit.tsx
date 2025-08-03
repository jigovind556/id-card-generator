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

const TeacherEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { teachers, updateTeacher } = useData();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    subject: '',
    doj: '',
    dob: '',
    aadhar: '',
    phone: '',
    bloodGroup: '',
    address: '',
    teacherId: '',
    photoURL: ''
  });
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>('');

  useEffect(() => {
    if (id) {
      const teacher = teachers.find(t => t.id === id);
      if (teacher) {
        setFormData({
          name: teacher.name || '',
          designation: teacher.designation || '',
          subject: teacher.subject || '',
          doj: teacher.doj || '',
          dob: teacher.dob || '',
          aadhar: teacher.aadhar || '',
          phone: teacher.phone || '',
          bloodGroup: teacher.bloodGroup || '',
          address: teacher.address || '',
          teacherId: teacher.teacherId || '',
          photoURL: teacher.photoURL || ''
        });
        
        // Set preview URL if teacher has a photo
        if (teacher.photoURL) {
          setPreviewURL(teacher.photoURL);
        }
      } else {
        toast({
          title: "Error",
          description: "Teacher not found",
          variant: "destructive"
        });
        navigate('/teachers/preview');
      }
    }
  }, [id, teachers, navigate, toast]);

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
    
    if (!formData.name || !formData.designation || !formData.subject) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (id) {
      updateTeacher(id, formData);
      
      toast({
        title: "Success",
        description: "Teacher updated successfully!",
      });

      navigate('/teachers/preview');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/teachers/preview')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Teachers</span>
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Teacher</h1>
          <p className="text-gray-600">Update teacher details for ID card</p>
        </div>
      </div>

      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle>Teacher Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Professional Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Professional Information</h3>
                
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
                  <Label htmlFor="designation">Designation <span className="text-red-500">*</span></Label>
                  <Input 
                    id="designation" 
                    name="designation" 
                    value={formData.designation} 
                    onChange={handleChange} 
                    placeholder="e.g. Assistant Teacher" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject <span className="text-red-500">*</span></Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    value={formData.subject} 
                    onChange={handleChange} 
                    placeholder="e.g. Mathematics" 
                    required 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="doj">Date of Joining</Label>
                  <Input 
                    id="doj" 
                    name="doj" 
                    type="date" 
                    value={formData.doj} 
                    onChange={handleChange} 
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teacherId">Teacher ID</Label>
                  <Input 
                    id="teacherId" 
                    name="teacherId" 
                    value={formData.teacherId} 
                    onChange={handleChange} 
                    placeholder="Enter teacher ID" 
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
              <h3 className="text-lg font-medium text-gray-900">Photo Upload</h3>
              
              <div className="space-y-2">
                <Label htmlFor="photoUpload">Teacher's Photo</Label>
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
                <span>Update Teacher</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherEdit;
