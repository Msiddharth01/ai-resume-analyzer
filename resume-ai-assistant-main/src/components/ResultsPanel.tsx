import { motion } from "framer-motion";
import { Sparkles, Target, AlertTriangle, Lightbulb, Code2, BarChart3 } from "lucide-react";
import ScoreCircle from "./ScoreCircle";
import ImprovedResume from "./ImprovedResume";
import SkillGapAnalysis from "./SkillGapAnalysis";

export interface AnalysisResult {
  resumeScore: number;
  atsScore: number;
  jobMatch: number;
  skills: string[];
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  atsDetails: {
    keywordMatch: number;
    formattingQuality: number;
    sectionCompleteness: number;
  };
  improvedResume: string;
  skillGap: {
    matched: string[];
    missing: string[];
  };
}

interface ResultsPanelProps {
  results: AnalysisResult;
  jobRole: string;
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ResultsPanel = ({ results, jobRole }: ResultsPanelProps) => {
  return (
    <motion.div initial="initial" animate="animate" className="space-y-6">
      {/* Scores Row */}
      <motion.div variants={fadeUp} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 shadow-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-6 flex items-center gap-2">
          <BarChart3 className="h-4 w-4 text-primary" />
          Score Overview
        </h3>
        <div className="flex justify-around flex-wrap gap-6">
          <ScoreCircle score={results.resumeScore} label="Resume Score" />
          <ScoreCircle score={results.atsScore} label="ATS Score" />
          <ScoreCircle score={results.jobMatch} label={`Match: ${jobRole}`} />
        </div>
      </motion.div>

      {/* ATS Details */}
      <motion.div variants={fadeUp} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 shadow-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          ATS Breakdown
        </h3>
        <div className="space-y-3">
          {[
            { label: "Keyword Match", value: results.atsDetails.keywordMatch },
            { label: "Formatting Quality", value: results.atsDetails.formattingQuality },
            { label: "Section Completeness", value: results.atsDetails.sectionCompleteness },
          ].map((item) => (
            <div key={item.label}>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-secondary-foreground">{item.label}</span>
                <span className="font-mono text-primary">{item.value}%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${item.value}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div variants={fadeUp} transition={{ delay: 0.3 }} className="glass rounded-xl p-6 shadow-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Code2 className="h-4 w-4 text-primary" />
          Extracted Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {results.skills.map((skill) => (
            <span key={skill} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium border border-primary/20">
              {skill}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={fadeUp} transition={{ delay: 0.4 }} className="glass rounded-xl p-6 shadow-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-success" />
            Strengths
          </h3>
          <ul className="space-y-2">
            {results.strengths.map((s, i) => (
              <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-success flex-shrink-0" />
                {s}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ delay: 0.5 }} className="glass rounded-xl p-6 shadow-card">
          <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            Weaknesses
          </h3>
          <ul className="space-y-2">
            {results.weaknesses.map((w, i) => (
              <li key={i} className="text-sm text-secondary-foreground flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-warning flex-shrink-0" />
                {w}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div variants={fadeUp} transition={{ delay: 0.6 }} className="glass rounded-xl p-6 shadow-card">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 flex items-center gap-2">
          <Lightbulb className="h-4 w-4 text-warning" />
          Suggestions for Improvement
        </h3>
        <div className="space-y-3">
          {results.suggestions.map((s, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-secondary/50">
              <span className="mt-0.5 flex-shrink-0 h-5 w-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-sm text-secondary-foreground">{s}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Skill Gap Analysis */}
      {results.skillGap && (
        <SkillGapAnalysis
          matched={results.skillGap.matched}
          missing={results.skillGap.missing}
          jobRole={jobRole}
        />
      )}

      {/* Improved Resume */}
      {results.improvedResume && (
        <ImprovedResume improvedText={results.improvedResume} />
      )}
    </motion.div>
  );
};

export default ResultsPanel;
