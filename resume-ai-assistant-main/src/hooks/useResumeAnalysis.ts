import { useState } from "react";
import { extractTextFromPDF } from "@/lib/pdfParser";
import type { AnalysisResult } from "@/components/ResultsPanel";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useResumeAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);

  const analyze = async (file: File, jobRole: string) => {
    setIsAnalyzing(true);
    setResults(null);
    setIsComplete(false);

    try {
      const text = await extractTextFromPDF(file);

      if (!text || text.trim().length < 20) {
        throw new Error("Could not extract text from PDF. The file may be scanned or image-based.");
      }

      const { data, error } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText: text, jobRole: jobRole || "Software Developer" },
      });

      if (error) {
        throw new Error(error.message || "Analysis failed.");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      // Validate the response has required fields
      const analysis: AnalysisResult = {
        resumeScore: data.resumeScore ?? 0,
        atsScore: data.atsScore ?? 0,
        jobMatch: data.jobMatch ?? 0,
        skills: data.skills ?? [],
        strengths: data.strengths ?? [],
        weaknesses: data.weaknesses ?? [],
        suggestions: data.suggestions ?? [],
        atsDetails: {
          keywordMatch: data.atsDetails?.keywordMatch ?? 0,
          formattingQuality: data.atsDetails?.formattingQuality ?? 0,
          sectionCompleteness: data.atsDetails?.sectionCompleteness ?? 0,
        },
        improvedResume: data.improvedResume ?? "",
        skillGap: {
          matched: data.skillGap?.matched ?? [],
          missing: data.skillGap?.missing ?? [],
        },
      };

      setResults(analysis);
      setIsComplete(true);
      toast.success("Resume analysis complete!");
    } catch (err: any) {
      toast.error(err.message || "Failed to analyze resume. Please try again.");
      setIsComplete(false);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const reset = () => {
    setResults(null);
    setIsComplete(false);
    setIsAnalyzing(false);
  };

  return { analyze, results, isAnalyzing, isComplete, reset };
}
