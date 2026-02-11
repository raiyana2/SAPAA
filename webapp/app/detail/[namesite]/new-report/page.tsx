"use client";

import { getQuestionsOnline, isSteward, addSiteInspectionReport, getSitesOnline, getCurrentUserUid } from '@/utils/supabase/queries';
import { createClient } from '@/utils/supabase/client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import { 
  ArrowLeft, 
  User, 
  ChevronRight, 
  ShieldCheck, 
  AlertCircle 
} from "lucide-react";
import Image from "next/image";

export default function NewReportPage() {
  const params = useParams();
  const router = useRouter();
  const namesite = decodeURIComponent(params.namesite as string);

  // --- Logic States ---
  const [showTerms, setShowTerms] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationText, setVerificationText] = useState("");
  const [responses, setResponses] = useState<Record<number, any>>({});
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentUser, setCurrentUser] = useState<{ email: string; role: string; name: string; avatar: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isStewardUser, setIsStewardUser] = useState(false);

  useEffect(() => {
    const fetchUserAndCheckSteward = async () => {
      try {
        setIsLoading(true);
        const user = await getCurrentUser();
        setCurrentUser(user);
        
        if (user?.email) {
          const stewardStatus = await isSteward(user.email);
          setIsStewardUser(stewardStatus);

          setShowVerification(!stewardStatus);
        } else {
          setShowVerification(true);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        setCurrentUser(null);
        setShowVerification(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserAndCheckSteward();
  }, []);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const data = await getQuestionsOnline();
        setQuestions(data || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    }
    fetchQuestions();
  }, []);

  const requiredPhrase = "I am not a volunteer of SAPAA";
  const isVerificationValid = verificationText.trim() === requiredPhrase;
  const canProceed = isVerificationValid && hasAccepted;

  const handleResponsesChange = (newResponses: Record<number, any>) => {
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    try {
      const sites = await getSitesOnline();
      const userUid = await getCurrentUserUid();
      console.log("User Uid: " + userUid);
      addSiteInspectionReport(sites[0].id, userUid)
    } catch (error) {
      console.error(error);
    }
    /**
     * FORM DATA CAPTURED:
     * 
     * 1. USER INFORMATION:
     *    - currentUser.email: User's email address
     *    - currentUser.name: User's full name
     *    - currentUser.role: User's role (e.g., 'steward')
     *    - currentUser.avatar: User's avatar URL
     *    - isStewardUser: Boolean indicating if user is a verified steward
     * 
     * 2. SITE INFORMATION:
     *    - namesite: Name of the protected area being inspected (from URL params)
     *    - pathname: Current page pathname
     * 
     * 3. VERIFICATION DATA (for non-stewards):
     *    - hasAccepted: Boolean - user accepted terms and conditions
     *    - verificationText: String - confirmation text typed by user
     *    - showVerification: Boolean - whether verification popup was shown
     * 
     * 4. QUESTION RESPONSES:
     *    - responses: Record<number, any> - Object mapping question IDs to answers
     *      Structure: { [questionId]: answer }
     *      Answer types vary by question_type:
     *        - 'option': String (selected radio option text)
     *        - 'text'/'text\n': String (textarea content)
     *        - 'agreement': Boolean (checkbox state)
     *        - 'site_select': String (protected area name)
     *        - 'date': String (date in YYYY-MM-DD format)
     *        - 'image': File[] (array of uploaded image files)
     * 
     * 5. QUESTIONS METADATA:
     *    - questions: Question[] - Array of all questions from database
     *      Each question contains:
     *        - id: number
     *        - title: string | null
     *        - text: string | null
     *        - question_type: string
     *        - section: number
     *        - answers: any[] (available answer options)
     * 
     * EXAMPLE DATA STRUCTURE TO SUBMIT:
     * {
     *   user: {
     *     email: currentUser?.email,
     *     name: currentUser?.name,
     *     role: currentUser?.role,
     *     isSteward: isStewardUser
     *   },
     *   site: {
     *     name: namesite,
     *     inspectionDate: new Date().toISOString()
     *   },
     *   verification: {
     *     termsAccepted: hasAccepted,
     *     verificationCompleted: !showVerification
     *   },
     *   responses: responses,
     *   metadata: {
     *     totalQuestions: questions.length,
     *     answeredQuestions: Object.keys(responses).length,
     *     completionRate: (Object.keys(responses).length / questions.length) * 100
     *   }
     * }
     */
    
    //TODO: Handle form submission

    console.log('Form data to submit:', {
      user: currentUser,
      site: namesite,
      responses: responses,
      isSteward: isStewardUser,
      termsAccepted: hasAccepted
    });
  };

  if (isLoading) {
    return (
           <div className="min-h-screen bg-gradient-to-br from-[#F7F2EA] via-[#E4EBE4] to-[#F7F2EA] flex flex-col items-center justify-center gap-4">
        <div className="w-16 h-16 border-4 border-[#E4EBE4] border-t-[#356B43] rounded-full animate-spin"></div>
        <p className="text-[#7A8075] font-medium">Loading inspection form...</p>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-[#F7F2EA] flex flex-col ${showTerms ? 'overflow-hidden max-h-screen' : ''}`}>
      
      {/* --- TERMS AND CONDITIONS POPUP --- */}
      {showTerms && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-[#254431]/80 backdrop-blur-sm" />
          
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">
            <div className="p-6 border-b border-[#E4EBE4] flex items-center gap-3">
              <div className="w-10 h-10 bg-[#F7F2EA] rounded-full flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#356B43]" />
              </div>
              <h2 className="text-xl font-bold text-[#254431]">Terms & Conditions</h2>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh] text-[#7A8075] space-y-4">
              <p className="font-medium text-[#254431]">Please review the following requirements for Site Inspection Reports:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>I confirm that all data entered is accurate and based on physical site observation.</li>
                <li>I understand that this report will be synced to the SAPAA database.</li>
                <li>I will include high-quality photos where hazards are identified.</li>
                <li>I acknowledge that site safety is the primary responsibility of the inspector.</li>
              </ul>
              <div className="bg-[#F7F2EA] p-4 rounded-xl flex gap-3 items-start">
                <AlertCircle className="w-5 h-5 text-[#356B43] flex-shrink-0 mt-0.5" />
                <p className="text-xs leading-relaxed">
                  Failure to provide accurate data may result in the report being flagged for manual review.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-[#E4EBE4] bg-[#F7F2EA]/50 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={hasAccepted}
                  onChange={(e) => setHasAccepted(e.target.checked)}
                  className="w-5 h-5 rounded border-[#E4EBE4] text-[#356B43] focus:ring-[#356B43]"
                />
                <span className="text-sm font-semibold text-[#254431]">I have read and agree to the terms</span>
              </label>

              <div className="flex gap-3">
                <button 
                  onClick={() => router.back()}
                  className="flex-1 py-3 text-[#7A8075] font-bold hover:bg-[#E4EBE4] rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button 
                  disabled={!hasAccepted}
                  onClick={() => setShowTerms(false)}
                  className="flex-[2] py-3 bg-[#356B43] text-white font-bold rounded-xl shadow-lg hover:bg-[#254431] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Continue to Form
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CONSOLIDATED HEADER --- */}
      <header className="bg-gradient-to-r from-[#254431] to-[#356B43] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between py-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-1 rounded-lg">
                <Image src="/images/sapaa-icon-white.png" alt="Logo" width={24} height={24} />
              </div>
              <span className="font-bold tracking-widest text-sm opacity-90">SAPAA</span>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
              <div className="w-6 h-6 rounded-full bg-[#356B43] flex items-center justify-center text-xs font-bold">JD</div>
              <span className="text-sm font-medium">John Doe</span>
            </div>
          </div>

          <div className="flex items-center justify-between py-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.back()}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Site Inspection Form</h1>
                <p className="text-[#E4EBE4] text-sm">{namesite}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* --- MAIN LAYOUT --- */}
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

      {/* --- STICKY FOOTER --- */}
      <footer className="sticky bottom-0 bg-white border-t-2 border-[#E4EBE4] p-4 md:px-8 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:flex-1">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-bold text-[#254431]">Overall Progress</span>
              <span className="text-sm font-medium text-[#7A8075]">{answeredCount} / {totalQuestions} answered</span>
            </div>
            <div className="h-3 w-full bg-[#F7F2EA] rounded-full overflow-hidden border border-[#E4EBE4]">
              <div 
                className="h-full bg-gradient-to-r from-[#356B43] to-[#254431] transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <button 
            disabled={answeredCount === 0}
            className="w-full md:w-auto px-8 py-3 bg-[#254431] text-white font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#1e3828] transition-colors shadow-lg"
          >
            Review & Submit
          </button>
        </div>
      </footer>
    </div>
  );
}