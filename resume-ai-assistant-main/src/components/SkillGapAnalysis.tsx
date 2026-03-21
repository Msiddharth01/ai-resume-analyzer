import { motion } from "framer-motion";
import { Target, CheckCircle2, AlertCircle } from "lucide-react";

interface SkillGapProps {
  matched: string[];
  missing: string[];
  jobRole: string;
}

const SkillGapAnalysis = ({ matched, missing, jobRole }: SkillGapProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="glass rounded-xl p-6 shadow-card"
    >
      <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-2">
        <Target className="h-4 w-4 text-primary" />
        Skill Gap Analysis
      </h3>
      <p className="text-xs text-muted-foreground mb-5">
        Target Role: <span className="text-primary font-medium">{jobRole}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Matched */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            Matched Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {matched.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-success/10 text-success text-sm font-medium border border-success/20"
              >
                {skill}
              </span>
            ))}
            {matched.length === 0 && (
              <p className="text-sm text-muted-foreground">No matched skills found</p>
            )}
          </div>
        </div>

        {/* Missing */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-destructive" />
            Missing Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {missing.map((skill) => (
              <span
                key={skill}
                className="px-3 py-1.5 rounded-lg bg-destructive/10 text-destructive text-sm font-medium border border-destructive/20"
              >
                {skill}
              </span>
            ))}
            {missing.length === 0 && (
              <p className="text-sm text-muted-foreground">No skill gaps detected — great match!</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillGapAnalysis;
