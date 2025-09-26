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
import { Calendar, Clock } from "lucide-react";

export const AddSessionDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentId: "",
    therapyType: "",
    therapist: "",
    date: "",
    time: "",
    duration: "",
    sessionGoals: "",
    notes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Session Scheduled",
      description: `${formData.therapyType} session has been scheduled successfully.`,
    });
    
    setFormData({
      studentId: "",
      therapyType: "",
      therapist: "",
      date: "",
      time: "",
      duration: "",
      sessionGoals: "",
      notes: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="institutional" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Session
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Therapy Session</DialogTitle>
          <DialogDescription>
            Create a new therapy session for a student.
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
              <Label htmlFor="therapist">Therapist *</Label>
              <Select value={formData.therapist} onValueChange={(value) => setFormData({ ...formData, therapist: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select therapist" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="anita">Ms. Anita (Speech)</SelectItem>
                  <SelectItem value="rajesh">Mr. Rajesh (Occupational)</SelectItem>
                  <SelectItem value="kumar">Dr. Kumar (Behavioral)</SelectItem>
                  <SelectItem value="priya">Ms. Priya (Physiotherapy)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Input
                id="time"
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionGoals">Session Goals</Label>
            <Textarea
              id="sessionGoals"
              rows={3}
              placeholder="What are the specific goals for this session?"
              value={formData.sessionGoals}
              onChange={(e) => setFormData({ ...formData, sessionGoals: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <Textarea
              id="notes"
              rows={3}
              placeholder="Any special instructions or notes..."
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
              Schedule Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};