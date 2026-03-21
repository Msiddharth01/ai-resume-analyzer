import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import Navbar from "@/components/Navbar";
import FileUpload from "@/components/FileUpload";
import JobRoleInput from "@/components/JobRoleInput";
import ResultsPanel from "@/components/ResultsPanel";
import { useResumeAnalysis } from "@/hooks/useResumeAnalysis";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [jobRole, setJobRole] = useState("");
  const { analyze, results, isAnalyzing, isComplete, reset } = useResumeAnalysis();

  const handleFileSelect = (file: File) => {
    analyze(file, jobRole);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-6 py-10 max-w-5xl">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">
            Analyze your resume <span className="text-gradient">with AI</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get instant scoring, ATS compatibility checks, skill extraction, and personalized improvement suggestions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[380px_1fr] gap-8">
          {/* Left: Upload Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div className="glass rounded-xl p-6 shadow-card space-y-5">
              <div>
                <h2 className="text-lg font-semibold mb-1">Upload Resume</h2>
                <p className="text-sm text-muted-foreground">Upload your PDF resume to get started</p>
              </div>

              <JobRoleInput value={jobRole} onChange={setJobRole} disabled={isAnalyzing} />
              <FileUpload
                onFileSelect={handleFileSelect}
                isAnalyzing={isAnalyzing}
                isComplete={isComplete}
              />

              {isComplete && (
                <Button
                  variant="outline"
                  onClick={reset}
                  className="w-full border-border text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Analyze Another Resume
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right: Results */}
          <div>
            {!results && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-12 shadow-card flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <div className="h-16 w-16 rounded-2xl bg-secondary flex items-center justify-center mb-4">
                  <span className="text-3xl">📄</span>
                </div>
                <h3 className="text-lg font-semibold mb-1">No resume analyzed yet</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Upload your resume and click "Analyze Resume" to get AI-powered insights, scoring, and recommendations.
                </p>
              </motion.div>
            )}

            {isAnalyzing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass rounded-xl p-12 shadow-card flex flex-col items-center justify-center text-center min-h-[400px]"
              >
                <div className="relative mb-6">
                  <div className="h-16 w-16 rounded-full border-4 border-secondary border-t-primary animate-spin" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Analyzing your resume...</h3>
                <p className="text-sm text-muted-foreground">
                  Extracting skills, scoring content, and generating recommendations
                </p>
              </motion.div>
            )}

            {results && <ResultsPanel results={results} jobRole={jobRole || "Software Developer"} />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
