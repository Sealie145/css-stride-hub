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
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";

const therapyTypes = [
  { id: "speech", name: "Speech Therapy", color: "bg-blue-500" },
  { id: "occupational", name: "Occupational Therapy", color: "bg-green-500" },
  { id: "physiotherapy", name: "Physiotherapy", color: "bg-purple-500" },
  { id: "behavioral", name: "Behavioural Intervention Model", color: "bg-orange-500" }
];

export const AddTherapyDialog = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedTherapyType, setSelectedTherapyType] = useState("");
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    therapyRequired: "",
    frequencyNeeded: "",
    sessionDuration: "",
    goals: "",
    reviewPeriodicity: "",
    startDate: "",
    challengesMet: "",
    revisionRequired: "",
    revisionFrequency: "",
    revisionDuration: "",
    revisionGoal: "",
    specialNoteTeachers: "",
    noteParents: "",
  });

  const resetForm = () => {
    setStep(1);
    setSelectedTherapyType("");
    setFormData({
      therapyRequired: "",
      frequencyNeeded: "",
      sessionDuration: "",
      goals: "",
      reviewPeriodicity: "",
      startDate: "",
      challengesMet: "",
      revisionRequired: "",
      revisionFrequency: "",
      revisionDuration: "",
      revisionGoal: "",
      specialNoteTeachers: "",
      noteParents: "",
    });
  };

  const handleNext = () => {
    if (selectedTherapyType) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const therapyName = therapyTypes.find(t => t.id === selectedTherapyType)?.name;
    toast({
      title: "Therapy Program Created",
      description: `${therapyName} program has been created successfully.`,
    });
    
    resetForm();
    setOpen(false);
  };

  const handleDialogClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      resetForm();
    }
  };

  const getTherapyDisplayName = () => {
    const therapy = therapyTypes.find(t => t.id === selectedTherapyType);
    return therapy?.name || "";
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <Button variant="institutional" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Therapy Program
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        {step === 1 && (
          <>
            <DialogHeader>
              <DialogTitle>Select Therapy Type</DialogTitle>
              <DialogDescription>
                Choose the type of therapy program you want to create.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-1 gap-3">
                {therapyTypes.map((therapy) => (
                  <div
                    key={therapy.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:shadow-md ${
                      selectedTherapyType === therapy.id 
                        ? "border-primary bg-primary/5" 
                        : "border-glass-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedTherapyType(therapy.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-4 w-4 rounded-full ${therapy.color}`}></div>
                      <h3 className="font-semibold text-foreground">{therapy.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="button" 
                variant="institutional" 
                onClick={handleNext}
                disabled={!selectedTherapyType}
                className="gap-2"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <DialogHeader>
              <DialogTitle>{getTherapyDisplayName()} - Details</DialogTitle>
              <DialogDescription>
                Fill in the specific details for the {getTherapyDisplayName().toLowerCase()} program.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="therapyRequired">{getTherapyDisplayName()} required *</Label>
                  <Select value={formData.therapyRequired} onValueChange={(value) => setFormData({...formData, therapyRequired: value})}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="yes">Yes</SelectItem>
                      <SelectItem value="no">No</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="frequencyNeeded">If Y, frequency of therapy needed</Label>
                  <Input
                    id="frequencyNeeded"
                    placeholder="e.g., 3 times per week"
                    value={formData.frequencyNeeded}
                    onChange={(e) => setFormData({...formData, frequencyNeeded: e.target.value})}
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionDuration">Duration of each planned session</Label>
                <Input
                  id="sessionDuration"
                  placeholder="e.g., 45 minutes"
                  value={formData.sessionDuration}
                  onChange={(e) => setFormData({...formData, sessionDuration: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="goals">Goal/s set</Label>
                <Textarea
                  id="goals"
                  rows={3}
                  placeholder="Enter the therapy goals..."
                  value={formData.goals}
                  onChange={(e) => setFormData({...formData, goals: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="reviewPeriodicity">Periodicity of review of goal set</Label>
                  <Select value={formData.reviewPeriodicity} onValueChange={(value) => setFormData({...formData, reviewPeriodicity: value})}>
                    <SelectTrigger className="glass-input">
                      <SelectValue placeholder="Select periodicity" />
                    </SelectTrigger>
                    <SelectContent className="glass-card">
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date of Therapy</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    className="glass-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="challengesMet">Challenges met</Label>
                <Textarea
                  id="challengesMet"
                  rows={3}
                  placeholder="Describe any challenges encountered..."
                  value={formData.challengesMet}
                  onChange={(e) => setFormData({...formData, challengesMet: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="revisionRequired">Any revision of recommendation (Y/N) Log to be maintained</Label>
                <Select value={formData.revisionRequired} onValueChange={(value) => setFormData({...formData, revisionRequired: value})}>
                  <SelectTrigger className="glass-input">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent className="glass-card">
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.revisionRequired === "yes" && (
                <div className="space-y-4 p-4 bg-muted/10 rounded-lg">
                  <h4 className="font-medium text-foreground">Revision Details</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="revisionFrequency">Frequency of session</Label>
                      <Input
                        id="revisionFrequency"
                        placeholder="e.g., 2 times per week"
                        value={formData.revisionFrequency}
                        onChange={(e) => setFormData({...formData, revisionFrequency: e.target.value})}
                        className="glass-input"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="revisionDuration">Duration of session</Label>
                      <Input
                        id="revisionDuration"
                        placeholder="e.g., 30 minutes"
                        value={formData.revisionDuration}
                        onChange={(e) => setFormData({...formData, revisionDuration: e.target.value})}
                        className="glass-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="revisionGoal">Goal</Label>
                    <Textarea
                      id="revisionGoal"
                      rows={2}
                      placeholder="Revised goals..."
                      value={formData.revisionGoal}
                      onChange={(e) => setFormData({...formData, revisionGoal: e.target.value})}
                      className="glass-input"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="specialNoteTeachers">Special note to teachers – to enter into 'IEP Team Meeting Student Report'</Label>
                <Textarea
                  id="specialNoteTeachers"
                  rows={3}
                  placeholder="Special notes for teachers..."
                  value={formData.specialNoteTeachers}
                  onChange={(e) => setFormData({...formData, specialNoteTeachers: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="noteParents">Note to Parents *</Label>
                <Textarea
                  id="noteParents"
                  rows={3}
                  placeholder="Notes for parents..."
                  value={formData.noteParents}
                  onChange={(e) => setFormData({...formData, noteParents: e.target.value})}
                  className="glass-input"
                />
              </div>

              <div className="flex justify-between gap-3 pt-4">
                <Button type="button" variant="outline" onClick={handleBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <div className="flex gap-3">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="institutional">
                    Create Program
                  </Button>
                </div>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};