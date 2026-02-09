"use client";

import React, { useState } from "react";
import { ChevronRight } from "lucide-react";

export default function MainContent() {
      const [activeSection, setActiveSection] = useState(1);
      const sections = [
        "Site Information",
        "Environmental Quality",
        "Infrastructure",
        "Safety & Access",
        "Final Summary"
      ];
    
      const questions = [
        { id: 1, text: "Current Weather Conditions" },
        { id: 2, text: "Soil Moisture Level" },
        { id: 3, text: "Visible Erosion Points" },
        { id: 4, text: "Invasive Species Presence" },
        { id: 5, text: "Wildlife Observations" },
      ];
    return(
<main className="flex-1 max-w-7xl mx-auto w-full flex flex-col md:flex-row">
        
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 bg-white md:bg-transparent p-4 md:py-8 border-b md:border-b-0 border-[#E4EBE4]">
          <nav className="flex md:flex-col gap-2 overflow-x-auto no-scrollbar">
            {sections.map((section, index) => (
              <button
                key={index}
                onClick={() => setActiveSection(index + 1)}
                className={`flex-shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                  activeSection === index + 1
                    ? "bg-[#356B43] text-white shadow-md"
                    : "text-[#7A8075] hover:bg-[#E4EBE4]"
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border ${
                  activeSection === index + 1 ? "border-white" : "border-[#7A8075]"
                }`}>
                  {index + 1}
                </span>
                <span className="whitespace-nowrap">Section {index + 1}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Form Content Area */}
        <section className="flex-1 p-4 md:p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#254431]">
              Section {activeSection}: {sections[activeSection - 1]}
            </h2>
            <p className="text-[#7A8075]">Complete all questions in this section to proceed.</p>
          </div>

          <div className="space-y-3">
            {questions.map((q) => (
              <button
                key={q.id}
                className="w-full group flex items-center justify-between bg-white p-5 rounded-2xl border-2 border-[#E4EBE4] hover:border-[#356B43] transition-all shadow-sm active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <span className="w-8 h-8 rounded-lg bg-[#F7F2EA] group-hover:bg-[#356B43] group-hover:text-white flex items-center justify-center font-bold text-[#356B43] transition-colors">
                    {q.id}
                  </span>
                  <span className="font-semibold text-[#254431]">{q.text}</span>
                </div>
                <ChevronRight className="w-5 h-5 text-[#7A8075] group-hover:text-[#356B43] transition-colors" />
              </button>
            ))}
          </div>
        </section>
      </main>
    )}

    