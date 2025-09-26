import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";

export const AddStudentDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    admissionNumber: "",
    age: "",
    gender: "",
    primaryDiagnosis: "",
    parentContact: "",
    emergencyContact: "",
    address: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Student Added",
      description: `${formData.name} has been successfully added to the system.`,
    });
    
    // Reset form and close dialog
    setFormData({
      name: "",
      admissionNumber: "",
      age: "",
      gender: "",
      primaryDiagnosis: "",
      parentContact: "",
      emergencyContact: "",
      address: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="institutional" className="gap-2">
          <UserPlus className="h-4 w-4" />
          Add New Student
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the student's basic information to create their profile.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admissionNumber">Admission Number *</Label>
              <Input
                id="admissionNumber"
                required
                placeholder="CSS001XXX"
                value={formData.admissionNumber}
                onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                min="1"
                max="25"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData({ ...formData, gender: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryDiagnosis">Primary Diagnosis</Label>
            <Input
              id="primaryDiagnosis"
              value={formData.primaryDiagnosis}
              onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="parentContact">Parent/Guardian Contact</Label>
              <Input
                id="parentContact"
                type="tel"
                value={formData.parentContact}
                onChange={(e) => setFormData({ ...formData, parentContact: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              <Input
                id="emergencyContact"
                type="tel"
                value={formData.emergencyContact}
                onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              rows={3}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="institutional">
              Add Student
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};