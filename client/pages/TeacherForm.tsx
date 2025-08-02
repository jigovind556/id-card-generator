import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Save, ArrowLeft } from 'lucide-react';

const TeacherForm: React.FC = () => {
  const navigate = useNavigate();
  const { addTeacher } = useData();
  const { toast } = useToast();

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
    photoURL: '',
    principalSignURL: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
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

    addTeacher(formData);
    
    toast({
      title: "Success",
      description: "Teacher added successfully!",
    });

    // Reset form
    setFormData({
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
      photoURL: '',
      principalSignURL: ''
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
          <h1 className="text-3xl font-bold text-gray-900">Add Single Teacher</h1>
          <p className="text-gray-600">Enter teacher details to generate ID card</p>
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
                  <Label htmlFor="name">Teacher Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter full name"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designation">Designation *</Label>
                    <Input
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      placeholder="e.g., TGT, PGT, Principal"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="e.g., Mathematics, English"
                      required
                    />
                  </div>
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
                    placeholder="e.g., TCH001"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoURL">Photo URL (Optional)</Label>
                  <Input
                    id="photoURL"
                    name="photoURL"
                    type="url"
                    value={formData.photoURL}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="principalSignURL">Principal Signature URL (Optional)</Label>
                  <Input
                    id="principalSignURL"
                    name="principalSignURL"
                    type="url"
                    value={formData.principalSignURL}
                    onChange={handleChange}
                    placeholder="https://example.com/signature.png"
                  />
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Personal Details</h3>
                
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
                    placeholder="XXXX XXXX XXXX"
                    maxLength={14}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit number"
                    maxLength={10}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bloodGroup">Blood Group</Label>
                  <Input
                    id="bloodGroup"
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    placeholder="e.g., B+"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Full address"
                    rows={6}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/teachers/preview')}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Teacher</span>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherForm;
