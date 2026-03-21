import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { resumeText, jobRole } = await req.json();

    if (!resumeText || resumeText.trim().length < 20) {
      return new Response(JSON.stringify({ error: "Resume text is too short or empty." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const targetRole = jobRole || "Software Developer";

    const systemPrompt = `You are an expert resume analyst and career coach. You will analyze the given resume text and return a comprehensive JSON analysis. You MUST respond with valid JSON only, no markdown.`;

    const userPrompt = `Analyze this resume for the target role "${targetRole}". Return a JSON object with exactly this structure:

{
  "resumeScore": <number 0-100>,
  "atsScore": <number 0-100>,
  "jobMatch": <number 0-100>,
  "skills": [<array of extracted skill strings>],
  "strengths": [<array of 4 strength strings>],
  "weaknesses": [<array of 4 weakness strings>],
  "suggestions": [<array of 5 improvement suggestion strings>],
  "atsDetails": {
    "keywordMatch": <number 0-100>,
    "formattingQuality": <number 0-100>,
    "sectionCompleteness": <number 0-100>
  },
  "improvedResume": "<string: the full improved resume text with better action verbs, professional language, measurable achievements, and proper formatting. Use \\n for line breaks and - for bullet points>",
  "skillGap": {
    "matched": [<array of skills present in resume that match the role>],
    "missing": [<array of important skills for the role that are missing from the resume>]
  }
}

Score the resume based on:
- Skills relevance to ${targetRole}
- Keyword usage and ATS optimization
- Clarity, impact, and professional language
- Structure and section completeness

For the improved resume:
- Use strong action verbs (Led, Developed, Implemented, Optimized)
- Add measurable achievements where possible
- Fix grammar and make content more impactful
- Maintain clear section headings

For skill gap analysis:
- Identify 5-10 key skills required for ${targetRole}
- Compare against resume skills
- List missing skills that would strengthen the application

Resume text:
${resumeText}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds in Settings > Workspace > Usage." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI analysis failed. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    if (!content) {
      return new Response(JSON.stringify({ error: "No response from AI." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Parse the JSON from the AI response, handling potential markdown code blocks
    let parsed;
    try {
      const cleaned = content.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse AI response:", content);
      return new Response(JSON.stringify({ error: "Failed to parse AI analysis. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-resume error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
