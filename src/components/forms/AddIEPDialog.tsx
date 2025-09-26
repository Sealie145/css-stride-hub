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
import { FileText, Plus } from "lucide-react";

export const AddIEPDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    studentId: "",
    goalType: "",
    goalDescription: "",
    targetSkill: "",
    currentLevel: "",
    targetDate: "",
    reviewPeriod: "",
    assessmentMethod: "",
    supportStrategies: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "IEP Goal Created",
      description: `New IEP goal has been created successfully.`,
    });
    
    setFormData({
      studentId: "",
      goalType: "",
      goalDescription: "",
      targetSkill: "",
      currentLevel: "",
      targetDate: "",
      reviewPeriod: "",
      assessmentMethod: "",
      supportStrategies: "",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="institutional" className="gap-2">
          <Plus className="h-4 w-4" />
          Create IEP Goal
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New IEP Goal</DialogTitle>
          <DialogDescription>
            Define a new Individual Education Plan goal for a student.
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
              <Label htmlFor="goalType">Goal Type *</Label>
              <Select value={formData.goalType} onValueChange={(value) => setFormData({ ...formData, goalType: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select goal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="academic">Academic</SelectItem>
                  <SelectItem value="behavioral">Behavioral</SelectItem>
                  <SelectItem value="communication">Communication</SelectItem>
                  <SelectItem value="motor">Motor Skills</SelectItem>
                  <SelectItem value="social">Social Skills</SelectItem>
                  <SelectItem value="daily-living">Daily Living</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reviewPeriod">Review Period *</Label>
              <Select value={formData.reviewPeriod} onValueChange={(value) => setFormData({ ...formData, reviewPeriod: value })}>
                <SelectTrigger className="glass-input">
                  <SelectValue placeholder="Select review period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="june">June Review</SelectItem>
                  <SelectItem value="august">August Review</SelectItem>
                  <SelectItem value="december">December Review</SelectItem>
                  <SelectItem value="march">March Review</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetSkill">Target Skill *</Label>
            <Input
              id="targetSkill"
              required
              placeholder="e.g., Independent toilet use, Letter recognition, etc."
              value={formData.targetSkill}
              onChange={(e) => setFormData({ ...formData, targetSkill: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="goalDescription">Goal Description *</Label>
            <Textarea
              id="goalDescription"
              required
              rows={3}
              placeholder="Describe the specific, measurable goal for the student..."
              value={formData.goalDescription}
              onChange={(e) => setFormData({ ...formData, goalDescription: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentLevel">Current Performance Level</Label>
              <Textarea
                id="currentLevel"
                rows={3}
                placeholder="Describe the student's current ability level..."
                value={formData.currentLevel}
                onChange={(e) => setFormData({ ...formData, currentLevel: e.target.value })}
                className="glass-input"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="assessmentMethod">Assessment Method</Label>
              <Textarea
                id="assessmentMethod"
                rows={3}
                placeholder="How will progress be measured and assessed?"
                value={formData.assessmentMethod}
                onChange={(e) => setFormData({ ...formData, assessmentMethod: e.target.value })}
                className="glass-input"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetDate">Target Achievement Date</Label>
            <Input
              id="targetDate"
              type="date"
              value={formData.targetDate}
              onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supportStrategies">Support Strategies</Label>
            <Textarea
              id="supportStrategies"
              rows={3}
              placeholder="What strategies and accommodations will be used to support this goal?"
              value={formData.supportStrategies}
              onChange={(e) => setFormData({ ...formData, supportStrategies: e.target.value })}
              className="glass-input"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="institutional">
              Create IEP Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};