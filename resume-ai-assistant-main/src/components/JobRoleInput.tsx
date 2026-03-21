import { Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";

interface JobRoleInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

const JobRoleInput = ({ value, onChange, disabled }: JobRoleInputProps) => {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground flex items-center gap-2">
        <Briefcase className="h-4 w-4" />
        Target Job Role
      </label>
      <Input
        placeholder="e.g. Frontend Developer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="h-11 bg-secondary border-border text-foreground placeholder:text-muted-foreground focus:ring-primary"
      />
    </div>
  );
};

export default JobRoleInput;
