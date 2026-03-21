import { FileText, Sparkles } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border glass sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between h-16 px-6">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-gradient-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            AI Resume <span className="text-gradient">Analyzer</span>
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Powered by AI</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
