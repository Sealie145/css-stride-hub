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
import { UserPlus, Upload, X } from "lucide-react";

export const AddStudentDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, profilePicture: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfilePicture = () => {
    setFormData({ ...formData, profilePicture: null });
    setProfilePreview(null);
  };
  const [formData, setFormData] = useState({
    // Basic Information
    profilePicture: null as File | null,
    clientName: "",
    admissionNumber: "",
    gender: "",
    dateOfBirth: "",
    bloodGroup: "",
    disabilityCardNumber: "",
    aadharCardNumber: "",
    emergencyContact: "",
    
    // Parent Information
    fatherName: "",
    fatherContact: "",
    motherName: "",
    motherContact: "",
    fatherOccupation: "",
    motherOccupation: "",
    
    // Additional Details
    quotaApplicable: "",
    defenseStateOrCentral: "",
    emailAddress: "",
    primaryLanguage: "",
    secondaryLanguage: "",
    
    // Medical & Diagnosis
    primaryDiagnosis: "",
    psychometricAssessmentDone: "",
    assessmentDate: "",
    psychometricTestReports: "",
    medicalHistory: "",
    allergies: "",
    
    // Therapy History
    historyOfTherapies: "",
    therapyDetails: "",
    typeOfTherapies: "",
    institutionNames: "",
    
    // Professional Notes
    speechTherapistNotes: "",
    occupationalTherapistNotes: "",
    physiotherapistNotes: "",
    coordinatorComments: "",
    directorApproval: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    toast({
      title: "Student Added",
      description: `${formData.clientName} has been successfully added to the system.`,
    });
    
    // Reset form and close dialog
    setFormData({
      profilePicture: null,
      clientName: "",
      admissionNumber: "",
      gender: "",
      dateOfBirth: "",
      bloodGroup: "",
      disabilityCardNumber: "",
      aadharCardNumber: "",
      emergencyContact: "",
      fatherName: "",
      fatherContact: "",
      motherName: "",
      motherContact: "",
      fatherOccupation: "",
      motherOccupation: "",
      quotaApplicable: "",
      defenseStateOrCentral: "",
      emailAddress: "",
      primaryLanguage: "",
      secondaryLanguage: "",
      primaryDiagnosis: "",
      psychometricAssessmentDone: "",
      assessmentDate: "",
      psychometricTestReports: "",
      medicalHistory: "",
      allergies: "",
      historyOfTherapies: "",
      therapyDetails: "",
      typeOfTherapies: "",
      institutionNames: "",
      speechTherapistNotes: "",
      occupationalTherapistNotes: "",
      physiotherapistNotes: "",
      coordinatorComments: "",
      directorApproval: "",
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
      <DialogContent className="glass-card max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogDescription>
            Enter the student's comprehensive information to create their profile.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture Section */}
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center overflow-hidden">
                {profilePreview ? (
                  <img src={profilePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <Upload className="h-8 w-8 text-muted-foreground" />
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('profile-upload')?.click()}>
                  Upload Photo
                </Button>
                {profilePreview && (
                  <Button type="button" variant="outline" size="sm" onClick={removeProfilePicture}>
                    <X className="h-4 w-4" />
                  </Button>
                )}
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Basic Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="clientName">Client Name *</Label>
                <Input
                  id="clientName"
                  required
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
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

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bloodGroup">Blood Group</Label>
                <Select value={formData.bloodGroup} onValueChange={(value) => setFormData({ ...formData, bloodGroup: value })}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="disabilityCardNumber">Disability Card Number (UDID/UIN)</Label>
                <Input
                  id="disabilityCardNumber"
                  value={formData.disabilityCardNumber}
                  onChange={(e) => setFormData({ ...formData, disabilityCardNumber: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="aadharCardNumber">Aadhar Card Number</Label>
                <Input
                  id="aadharCardNumber"
                  value={formData.aadharCardNumber}
                  onChange={(e) => setFormData({ ...formData, aadharCardNumber: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Parent/Guardian Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherName">Father's Name</Label>
                <Input
                  id="fatherName"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fatherContact">Father's Contact Number</Label>
                <Input
                  id="fatherContact"
                  type="tel"
                  value={formData.fatherContact}
                  onChange={(e) => setFormData({ ...formData, fatherContact: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="motherName">Mother's Name</Label>
                <Input
                  id="motherName"
                  value={formData.motherName}
                  onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motherContact">Mother's Contact Number</Label>
                <Input
                  id="motherContact"
                  type="tel"
                  value={formData.motherContact}
                  onChange={(e) => setFormData({ ...formData, motherContact: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fatherOccupation">Father's Occupation</Label>
                <Input
                  id="fatherOccupation"
                  value={formData.fatherOccupation}
                  onChange={(e) => setFormData({ ...formData, fatherOccupation: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="motherOccupation">Mother's Occupation</Label>
                <Input
                  id="motherOccupation"
                  value={formData.motherOccupation}
                  onChange={(e) => setFormData({ ...formData, motherOccupation: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label htmlFor="emailAddress">Email Address</Label>
                <Input
                  id="emailAddress"
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Additional Information</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quotaApplicable">Quota Applicable (Y/N)</Label>
                <Select value={formData.quotaApplicable} onValueChange={(value) => setFormData({ ...formData, quotaApplicable: value })}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="defenseStateOrCentral">If Yes, Defence/State or Central</Label>
                <Select value={formData.defenseStateOrCentral} onValueChange={(value) => setFormData({ ...formData, defenseStateOrCentral: value })}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="defence">Defence</SelectItem>
                    <SelectItem value="state">State</SelectItem>
                    <SelectItem value="central">Central</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="primaryLanguage">Primary Language</Label>
                <Input
                  id="primaryLanguage"
                  value={formData.primaryLanguage}
                  onChange={(e) => setFormData({ ...formData, primaryLanguage: e.target.value })}
                  className="glass-input"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="secondaryLanguage">Secondary Language</Label>
                <Input
                  id="secondaryLanguage"
                  value={formData.secondaryLanguage}
                  onChange={(e) => setFormData({ ...formData, secondaryLanguage: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
          </div>

          {/* Medical & Diagnosis Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Medical & Diagnosis Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="primaryDiagnosis">Primary Diagnosis (Prior to CCDC)</Label>
              <Input
                id="primaryDiagnosis"
                value={formData.primaryDiagnosis}
                onChange={(e) => setFormData({ ...formData, primaryDiagnosis: e.target.value })}
                className="glass-input"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="psychometricAssessmentDone">Psychometric Assessment Done (Y/N)</Label>
                <Select value={formData.psychometricAssessmentDone} onValueChange={(value) => setFormData({ ...formData, psychometricAssessmentDone: value })}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assessmentDate">If Yes - Date of Psychometric Test</Label>
                <Input
                  id="assessmentDate"
                  type="date"
                  value={formData.assessmentDate}
                  onChange={(e) => setFormData({ ...formData, assessmentDate: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="medicalHistory">Medical History</Label>
              <Textarea
                id="medicalHistory"
                rows={3}
                value={formData.medicalHistory}
                onChange={(e) => setFormData({ ...formData, medicalHistory: e.target.value })}
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="allergies">Allergies</Label>
              <Textarea
                id="allergies"
                rows={2}
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          {/* Therapy History */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Therapy History</h3>
            
            <div className="space-y-2">
              <Label htmlFor="historyOfTherapies">History of Therapies taken prior to CCDC (Y/N)</Label>
              <Select value={formData.historyOfTherapies} onValueChange={(value) => setFormData({ ...formData, historyOfTherapies: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="yes">Yes</SelectItem>
                  <SelectItem value="no">No</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeOfTherapies">Type of therapies taken (Physio, OT, Behavioral)</Label>
              <Input
                id="typeOfTherapies"
                value={formData.typeOfTherapies}
                onChange={(e) => setFormData({ ...formData, typeOfTherapies: e.target.value })}
                className="glass-input"
                placeholder="e.g., Physiotherapy, Occupational Therapy, Behavioral"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="institutionNames">Institution names where therapy was taken</Label>
              <Textarea
                id="institutionNames"
                rows={2}
                value={formData.institutionNames}
                onChange={(e) => setFormData({ ...formData, institutionNames: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          {/* Professional Notes */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-primary border-b border-muted pb-2">Professional Notes</h3>
            
            <div className="space-y-2">
              <Label htmlFor="speechTherapistNotes">Special notes by Speech Therapist</Label>
              <Textarea
                id="speechTherapistNotes"
                rows={3}
                value={formData.speechTherapistNotes}
                onChange={(e) => setFormData({ ...formData, speechTherapistNotes: e.target.value })}
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="occupationalTherapistNotes">Special notes by Occupational Therapist</Label>
              <Textarea
                id="occupationalTherapistNotes"
                rows={3}
                value={formData.occupationalTherapistNotes}
                onChange={(e) => setFormData({ ...formData, occupationalTherapistNotes: e.target.value })}
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="physiotherapistNotes">Special notes by Physiotherapist</Label>
              <Textarea
                id="physiotherapistNotes"
                rows={3}
                value={formData.physiotherapistNotes}
                onChange={(e) => setFormData({ ...formData, physiotherapistNotes: e.target.value })}
                className="glass-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordinatorComments">CCDC Co-ordinator Comments</Label>
              <Textarea
                id="coordinatorComments"
                rows={3}
                value={formData.coordinatorComments}
                onChange={(e) => setFormData({ ...formData, coordinatorComments: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-muted">
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