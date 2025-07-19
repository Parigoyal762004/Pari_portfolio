// src/pages/Resume.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Section Components
import ResumeLabIntro from '../components/resume/ResumeLabIntro';
import ResumeTweaker from '../components/resume/ResumeTweaker';
import ResumeComparison from '../components/resume/ResumeComparison';
import ResumeGallery from '../components/resume/ResumeGallery';
import OriginalResumeViewer from '../components/resume/OriginalResumeViewer';

// Import Base Resume Content
import { baseResumeBulletPoints, baseResumeContent } from '../data/baseResume'; // Import the full base content

// Import jsPDF for client-side PDF generation
import jsPDF from 'jspdf'; // Make sure you have installed: npm install jspdf
import autoTable from 'jspdf-autotable'; // For table-like structures if needed, npm install jspdf-autotable

// Helper function to call Gemini API
const callGeminiForResumeTweak = async (currentResumeText, jobDescription, tweaks) => {
  const apiKey = "AIzaSyA5yGfRMMLLm8MhHM7Sq06rSBCHkAaVOOU"; // Your Gemini API Key
  const prompt = `
  You are an expert resume optimizer. Your task is to rephrase and select bullet points from the provided base resume to best match a given job description, applying specific filters.

  Base Resume Content:
  ---
  ${currentResumeText}
  ---

  Job Description:
  ---
  ${jobDescription || "No specific job description provided. Optimize generally."}
  ---

  Optimization Filters:
  - Make it more impact-focused: ${tweaks.impactFocused ? 'YES' : 'NO'}
  - Add ATS keywords: ${tweaks.atsKeywords ? 'YES' : 'NO'}
  - Highlight leadership: ${tweaks.leadershipHighlight ? 'YES' : 'NO'}

  Instructions:
  1. Carefully read the Base Resume Content and the Job Description.
  2. Rephrase existing bullet points and highlight relevant skills/experiences based on the Job Description.
  3. Apply the Optimization Filters:
     - If 'impact-focused' is YES, rephrase bullets to quantify achievements (e.g., "improved X by Y%").
     - If 'ATS keywords' is YES, subtly inject relevant keywords from the job description or common industry terms into the rephrased bullets.
     - If 'leadership' is YES, emphasize any leadership, mentoring, or team coordination aspects. If none are present, subtly introduce them if reasonable or suggest adding.
  4. Ensure the output is concise and uses strong action verbs.
  5. The output MUST ONLY be a list of rephrased bullet points, one per line, without any introductory or concluding remarks. DO NOT include any other text, just the bullet points.
  6. If the job description is very specific, you may select and rephrase only the most relevant bullet points.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to generate resume tweaks.");
    }

    const data = await response.json();
    const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI.";
    // The AI is instructed to return bullet points, split them by newline
    return generatedText.split('\n').filter(line => line.trim() !== '');

  } catch (error) {
    console.error("Network or API call failed:", error);
    return ["An error occurred while generating. Please try again or refine your prompt. Error: " + error.message];
  }
};


const Resume = () => {
  const [jobDescription, setJobDescription] = useState('');
  const [tweaks, setTweaks] = useState({
    impactFocused: false,
    atsKeywords: false,
    leadershipHighlight: false,
  });
  const [tweakedResumeBullets, setTweakedResumeBullets] = useState(baseResumeBulletPoints);
  const [labLog, setLabLog] = useState([]); // Stores step-by-step changes from AI
  const [loadingAI, setLoadingAI] = useState(false); // New loading state for AI call
  const [aiError, setAiError] = useState(null); // New state for API errors

  // Debounced effect for AI call
  useEffect(() => {
    const handler = setTimeout(async () => {
      setAiError(null); // Clear previous errors
      setLabLog([]); // Clear log for new simulation/real AI run

      if (jobDescription.trim() === '' && !tweaks.impactFocused && !tweaks.atsKeywords && !tweaks.leadershipHighlight) {
        // If no input or filters, revert to base and don't call AI
        setTweakedResumeBullets(baseResumeBulletPoints);
        setLabLog(["Reverted to base resume."]);
        return;
      }

      setLoadingAI(true);
      setLabLog(["AI is analyzing the request..."]);
      try {
        const newTweakedBullets = await callGeminiForResumeTweak(
          baseResumeContent, // Pass the full base content
          jobDescription,
          tweaks
        );
        setTweakedResumeBullets(newTweakedBullets);

        // Simulate Lab Log entries based on actual AI response
        const newLogEntries = ["AI has processed the request."];
        if (jobDescription.trim() !== '') newLogEntries.push(`- Optimized for job: "${jobDescription.substring(0, 50)}..."`);
        if (tweaks.impactFocused) newLogEntries.push("- Made bullet points more impact-focused.");
        if (tweaks.atsKeywords) newLogEntries.push("- Injected ATS keywords.");
        if (tweaks.leadershipHighlight) newLogEntries.push("- Highlighted leadership contributions.");
        if (newTweakedBullets.length > 0 && newTweakedBullets[0].includes("An error occurred")) {
             newLogEntries.push("Error during AI generation. Check console for details.");
        } else {
             newLogEntries.push("Resume successfully tweaked!");
        }

        setLabLog(newLogEntries);

      } catch (error) {
        console.error("Error during AI processing:", error);
        setAiError("Failed to generate resume. Please check console for details.");
        setTweakedResumeBullets(["An error occurred: " + error.message]); // Show error in UI
        setLabLog(prev => [...prev, "AI processing failed: " + error.message]);
      } finally {
        setLoadingAI(false);
      }
    }, 1000); // 1-second debounce to avoid too many API calls

    return () => {
      clearTimeout(handler);
    };
  }, [jobDescription, tweaks]); // Re-run effect when jobDescription or tweaks change

  // Function to generate and download PDF
  const downloadTweakedResume = useCallback((bulletsToDownload, filename = "Pari_Tweaked_Resume.pdf") => {
    const doc = new jsPDF();
    doc.setFont("helvetica"); // You might need to embed custom fonts for DM Sans
    doc.setFontSize(11);

    const startY = 20;
    const margin = 20;
    let y = startY;

    // Add Name and basic header (you can expand this)
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Pari Goyal", margin, y);
    y += 10;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("[Your Contact Info: Email, LinkedIn, GitHub]", margin, y); // Replace with actual info
    y += 20;

    // Add a section for tweaked bullet points
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Optimized Experience Highlights", margin, y);
    y += 8;
    doc.setDrawColor(tweaks.impactFocused ? 245 : 139, tweaks.impactFocused ? 130 : 211, tweaks.impactFocused ? 174 : 221); // Pink/Blue line
    doc.line(margin, y, doc.internal.pageSize.getWidth() - margin, y);
    y += 5;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    // Use autoTable for better bullet point formatting (optional, but good)
    autoTable(doc, {
      body: bulletsToDownload.map(bullet => [`• ${bullet}`]),
      startY: y,
      margin: { left: margin, right: margin },
      styles: {
        fontSize: 11,
        cellPadding: { top: 1, bottom: 1 },
        lineColor: [200, 200, 200], // light grey lines between cells if table has rows
        lineWidth: 0.1,
      },
      columnStyles: {
        0: { cellWidth: 'auto' } // Make the column automatically size
      },
      theme: 'plain', // No borders for a clean look
      didDrawCell: (data) => {
        // This callback is useful for more complex rendering, e.g., icons
      }
    });

    // Update y position after autoTable
    y = doc.lastAutoTable.finalY + 10;

    // Add a small footer/attribution
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Generated by AI Resume Lab on ${new Date().toLocaleDateString()}`, margin, doc.internal.pageSize.getHeight() - 10);

    doc.save(filename);
  }, [tweaks]); // Include tweaks in dependency array if colors depend on it

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-ivory text-dark dark:bg-dark dark:text-light transition-colors duration-500">
      {/* Background glowing particles/icons (subtle) */}
      <div className="absolute top-1/4 left-[5%] w-32 h-32 bg-pink rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float"></div>
      <div className="absolute bottom-[10%] right-[10%] w-48 h-48 bg-blue rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-float delay-500"></div>
      <div className="absolute top-[20%] right-[15%] w-24 h-24 bg-peach rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float delay-1000"></div>
      <div className="absolute bottom-[30%] left-[15%] w-40 h-40 bg-pink rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float delay-1500"></div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-20">
        {/* Section 1: Intro */}
        <ResumeLabIntro />

        {/* Section 2: How I Tweak It */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-dark dark:text-light">
            🧪 How I Tweak It
          </h2>
          <ResumeTweaker
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            tweaks={tweaks}
            setTweaks={setTweaks}
            loading={loadingAI} // Pass actual loading state
            aiResponse={aiError ? `Error: ${aiError}` : tweakedResumeBullets.join('\n- ')} // Show error or AI response
          />
        </motion.div>

        {/* Section 3: Here's What Changed */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-dark dark:text-light">
            🎛 Here’s What Changed
            <p className="text-sm font-normal italic opacity-80 mt-2">
              Precision edits for a chaotic hiring world.
            </p>
          </h2>
          <ResumeComparison
            oldBullets={baseResumeBulletPoints}
            newBullets={tweakedResumeBullets}
            labLog={labLog}
            loading={loadingAI}
            aiError={aiError}
          />
        </motion.div>

        {/* Section 4: See the Proof */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-dark dark:text-light">
            📜 My Resume Wears Many Hats. Here's the Closet.
          </h2>
          <button
            onClick={() => downloadTweakedResume(tweakedResumeBullets)}
            className="px-8 py-3 bg-pink text-light dark:bg-blue dark:text-dark rounded-full text-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 mb-8"
          >
            Download Current AI-Customized PDF
          </button>
          <ResumeGallery downloadTweakedResume={downloadTweakedResume} /> {/* Pass the download function */}
        </motion.div>

        {/* Section 5: But the Core is Always Me */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="bg-white dark:bg-dark/50 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-peach dark:border-blue mb-16"
        >
          <h2 className="text-3xl font-bold mb-8 text-center text-dark dark:text-light">
            📎 But the Core is Always Me
          </h2>
          <OriginalResumeViewer />
          <p className="text-center italic mt-6 text-dark dark:text-light opacity-90">
            "The soul doesn’t change—just the outfit."
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;