import { useState, useCallback } from "react";
import { Upload, FileText, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isAnalyzing: boolean;
  isComplete: boolean;
}

const FileUpload = ({ onFileSelect, isAnalyzing, isComplete }: FileUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((f: File) => {
    setError(null);
    if (f.type !== "application/pdf") {
      setError("Please upload a PDF file.");
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }
    setFile(f);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleRemove = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all duration-300 cursor-pointer ${
          isDragging
            ? "border-primary bg-primary/5"
            : file
            ? "border-primary/30 bg-primary/5"
            : "border-border hover:border-muted-foreground/40 hover:bg-muted/30"
        }`}
        onClick={() => {
          if (!file) {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = ".pdf";
            input.onchange = (e) => {
              const f = (e.target as HTMLInputElement).files?.[0];
              if (f) handleFile(f);
            };
            input.click();
          }
        }}
      >
        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-3"
            >
              <div className="mx-auto h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center">
                <Upload className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-foreground font-medium">Drop your resume here</p>
                <p className="text-sm text-muted-foreground mt-1">or click to browse · PDF only · Max 10MB</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="file"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex items-center justify-center gap-3"
            >
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-foreground">{file.name}</p>
                <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
              </div>
              {!isAnalyzing && !isComplete && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(); }}
                  className="ml-2 h-7 w-7 rounded-md bg-secondary hover:bg-destructive/20 flex items-center justify-center transition-colors"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {error && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-destructive">
          {error}
        </motion.p>
      )}

      <Button
        onClick={() => file && onFileSelect(file)}
        disabled={!file || isAnalyzing || isComplete}
        className="w-full h-12 bg-gradient-primary text-primary-foreground font-semibold text-base hover:opacity-90 transition-opacity disabled:opacity-40"
      >
        {isAnalyzing ? (
          <span className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing Resume...
          </span>
        ) : isComplete ? (
          <span className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Analysis Complete
          </span>
        ) : (
          "Analyze Resume"
        )}
      </Button>
    </div>
  );
};

export default FileUpload;
