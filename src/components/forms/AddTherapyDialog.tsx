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
import { Heart, Plus } from "lucide-react";

export const AddTherapyDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentId: "",
    therapyType: "",
    therapistName: "",
    frequency: "",
    duration: "",
    startDate: "",
    endDate: "",
    goals: "",
    initialAssessment: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Therapy Program Created",
      description: `${formData.therapyType} program has been created successfully.`,
    });
    
    setFormData({
      studentId: "",
      therapyType: "",
      therapistName: "",
      frequency: "",
      duration: "",
      startDate: "",
      endDate: "",
      goals: "",
      initialAssessment: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="institutional" className="gap-2">
          <Plus className="h-4 w-4" />
          Add Therapy Program
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Therapy Program</DialogTitle>
          <DialogDescription>
            Set up a new therapy program for a student with specific goals and schedule.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="studentId">Student *</Label>
            <Select value={formData.studentId} onValueChange={(value) => setFormData({ ...formData, studentId: value })}>
              <SelectTrigger className="glass-input">
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CSS001234">Arjun Kumar (CSS001234)</SelectItem>
                <SelectItem value="CSS001235">Priya Sharma (CSS001235)</SelectItem>
                <SelectItem value="CSS001236">Rahul Patel (CSS001236)</SelectItem>
                <SelectItem value="CSS001237">Sneha Gupta (CSS001237)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="therapyType">Therapy Type *</Label>
              <Select value={formData.therapyType} onValueChange={(value) => setFormData({ ...formData, therapyType: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select therapy type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="speech">Speech Therapy</SelectItem>
                  <SelectItem value="occupational">Occupational Therapy</SelectItem>
                  <SelectItem value="physiotherapy">Physiotherapy</SelectItem>
                  <SelectItem value="behavioral">Behavioral Therapy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="therapistName">Primary Therapist *</Label>
              <Select value={formData.therapistName} onValueChange={(value) => setFormData({ ...formData, therapistName: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select therapist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anita">Ms. Anita (Speech Therapist)</SelectItem>
                  <SelectItem value="rajesh">Mr. Rajesh (Occupational Therapist)</SelectItem>
                  <SelectItem value="kumar">Dr. Kumar (Behavioral Therapist)</SelectItem>
                  <SelectItem value="priya">Ms. Priya (Physiotherapist)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="frequency">Frequency per Week</Label>
              <Select value={formData.frequency} onValueChange={(value) => setFormData({ ...formData, frequency: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 session/week</SelectItem>
                  <SelectItem value="2">2 sessions/week</SelectItem>
                  <SelectItem value="3">3 sessions/week</SelectItem>
                  <SelectItem value="4">4 sessions/week</SelectItem>
                  <SelectItem value="5">5 sessions/week</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Session Duration</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({ ...formData, duration: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                  <SelectItem value="90">90 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goals">Program Goals</Label>
            <Textarea
              id="goals"
              rows={3}
              placeholder="What are the primary goals for this therapy program?"
              value={formData.goals}
              onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialAssessment">Initial Assessment Notes</Label>
            <Textarea
              id="initialAssessment"
              rows={4}
              placeholder="Record initial assessment findings and baseline measurements..."
              value={formData.initialAssessment}
              onChange={(e) => setFormData({ ...formData, initialAssessment: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Any special considerations, equipment needs, or instructions..."
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
              Create Program
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};