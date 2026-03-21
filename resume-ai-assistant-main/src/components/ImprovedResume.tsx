import { motion } from "framer-motion";
import { Download, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { useState } from "react";

interface ImprovedResumeProps {
  improvedText: string;
}

const ImprovedResume = ({ improvedText }: ImprovedResumeProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const doc = new jsPDF();
      const margin = 20;
      const pageWidth = doc.internal.pageSize.getWidth();
      const maxWidth = pageWidth - margin * 2;
      let y = margin;

      doc.setFont("helvetica", "normal");

      const lines = improvedText.split("\n");

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) {
          y += 4;
          continue;
        }

        // Detect headings (all caps or short lines ending with :)
        const isHeading = /^[A-Z\s&]{3,}$/.test(trimmed) || /^[A-Z][A-Za-z\s]+:$/.test(trimmed);
        const isBullet = trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*");

        if (isHeading) {
          y += 4;
          doc.setFontSize(13);
          doc.setFont("helvetica", "bold");
          doc.text(trimmed.replace(/:$/, ""), margin, y);
          y += 2;
          doc.setDrawColor(0, 180, 170);
          doc.setLineWidth(0.5);
          doc.line(margin, y, margin + 50, y);
          y += 6;
        } else if (isBullet) {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          const bulletText = trimmed.replace(/^[-•*]\s*/, "");
          const wrapped = doc.splitTextToSize(bulletText, maxWidth - 8);
          for (let i = 0; i < wrapped.length; i++) {
            if (y > 275) {
              doc.addPage();
              y = margin;
            }
            doc.text(i === 0 ? `  •  ${wrapped[i]}` : `      ${wrapped[i]}`, margin, y);
            y += 5;
          }
        } else {
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          const wrapped = doc.splitTextToSize(trimmed, maxWidth);
          for (const wLine of wrapped) {
            if (y > 275) {
              doc.addPage();
              y = margin;
            }
            doc.text(wLine, margin, y);
            y += 5;
          }
        }
      }

      doc.save("improved-resume.pdf");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass rounded-xl p-6 shadow-card"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Improved Resume
        </h3>
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          size="sm"
          className="bg-gradient-primary text-primary-foreground hover:opacity-90"
        >
          {isGenerating ? (
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Download className="h-4 w-4 mr-2" />
          )}
          Download PDF
        </Button>
      </div>

      <div className="bg-secondary/50 rounded-lg p-5 max-h-[400px] overflow-y-auto scrollbar-thin">
        <pre className="text-sm text-secondary-foreground whitespace-pre-wrap font-sans leading-relaxed">
          {improvedText}
        </pre>
      </div>
    </motion.div>
  );
};

export default ImprovedResume;
