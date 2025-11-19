import React, { useState, useEffect } from 'react';
import { ArrowRight, Calculator, Search, CheckCircle, XCircle, RefreshCw, Users } from 'lucide-react';

const DivisibilityProof = () => {
  const [step, setStep] = useState(0);
  const [candidates, setCandidates] = useState([]);

  // Initialize candidates
  useEffect(() => {
    const generated = [];
    
    // Case 1: One 7, Six 9s
    // Permutations of [7, 9, 9, 9, 9, 9, 9]
    // The 7 can be in any of the 7 positions.
    for (let i = 0; i < 7; i++) {
      let arr = Array(7).fill(9);
      arr[i] = 7;
      generated.push({ digits: arr, type: 'groupA', id: `A-${i}` });
    }

    // Case 2: Two 8s, Five 9s
    // Permutations of [8, 8, 9, 9, 9, 9, 9]
    // Choose 2 positions for the 8s out of 7.
    for (let i = 0; i < 7; i++) {
      for (let j = i + 1; j < 7; j++) {
        let arr = Array(7).fill(9);
        arr[i] = 8;
        arr[j] = 8;
        generated.push({ digits: arr, type: 'groupB', id: `B-${i}-${j}` });
      }
    }
    setCandidates(generated);
  }, []);

  const getDigitColor = (index) => {
    // Even indices (0, 2, 4, 6) are Blue Team (Positive)
    // Odd indices (1, 3, 5) are Red Team (Negative)
    // Note: index 0 is the first digit (leftmost, Millions place)
    return index % 2 === 0 ? 'bg-blue-100 text-blue-800 border-blue-300' : 'bg-red-100 text-red-800 border-red-300';
  };

  const calculateSums = (digits) => {
    let blueSum = 0; // Indices 0, 2, 4, 6
    let redSum = 0;  // Indices 1, 3, 5
    digits.forEach((d, i) => {
      if (i % 2 === 0) blueSum += d;
      else redSum += d;
    });
    return { blueSum, redSum, diff: blueSum - redSum };
  };

  const isDivisibleBy11 = (digits) => {
    const { diff } = calculateSums(digits);
    return diff % 11 === 0;
  };

  const TotalCount = 28; // 7 (from case A) + 21 (from case B)
  const CorrectCount = 6; 

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-indigo-600 p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
            <Calculator className="w-8 h-8" />
            The Mystery of 61
          </h1>
          <p className="opacity-90 mt-2 text-indigo-100">
            A graphical proof for: <span className="italic">"Probability a 7-digit number is divisible by 11, given its digits sum to 61."</span>
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex border-b border-slate-200">
          {[0, 1, 2, 3, 4].map((s) => (
            <button
              key={s}
              onClick={() => setStep(s)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                step === s 
                  ? 'bg-indigo-50 text-indigo-600 border-b-2 border-indigo-600' 
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              Step {s + 1}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-8 min-h-[500px]">
          
          {/* STEP 1: THE SETUP */}
          {step === 0 && (
            <div className="space-y-6 animate-in fade-in duration-500">
              <h2 className="text-2xl font-bold text-slate-800">Step 1: The Impossible Sum?</h2>
              <p className="text-lg text-slate-600">
                We need a 7-digit number where the sum of the digits is <strong>61</strong>. Let's see how hard that is.
              </p>
              
              <div className="bg-slate-100 p-6 rounded-xl flex flex-col items-center gap-4">
                <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">Maximum Possible Sum</div>
                <div className="flex gap-2">
                  {[9,9,9,9,9,9,9].map((d, i) => (
                    <div key={i} className="w-12 h-16 bg-white border-2 border-slate-300 rounded-lg flex items-center justify-center text-3xl font-bold shadow-sm">
                      {d}
                    </div>
                  ))}
                </div>
                <div className="text-2xl font-bold text-slate-700">
                  Sum = 9 × 7 = <span className="text-red-500">63</span>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
                <p className="text-lg">
                  We need a sum of <strong>61</strong>. That is exactly <strong>2 less</strong> than the maximum.
                </p>
                <p className="mt-2 text-slate-700">
                  To lose 2 points, we can either:
                  <ul className="list-disc list-inside mt-2 ml-4 font-medium">
                    <li>Change one <span className="bg-white px-1 border rounded">9</span> to a <span className="bg-white px-1 border rounded">7</span> (-2 points)</li>
                    <li>Change two <span className="bg-white px-1 border rounded">9</span>s to <span className="bg-white px-1 border rounded">8</span>s (-1 and -1 points)</li>
                  </ul>
                </p>
              </div>
              
              <div className="flex justify-end">
                <button onClick={() => setStep(1)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                  See the Suspects <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: THE SAMPLE SPACE */}
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <div className="flex justify-between items-end">
                <h2 className="text-2xl font-bold text-slate-800">Step 2: The Suspect Lineup</h2>
                <span className="text-sm font-bold bg-slate-200 px-3 py-1 rounded-full">Total Suspects: {TotalCount}</span>
              </div>
              
              <p className="text-slate-600">
                Every possible 7-digit number summing to 61 is listed below. This is our <strong>Sample Space</strong>.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Group A */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                  <h3 className="font-bold text-indigo-600 mb-3 border-b pb-2">Group A: One 7, Six 9s</h3>
                  <div className="space-y-2">
                    {candidates.filter(c => c.type === 'groupA').map((c) => (
                      <div key={c.id} className="font-mono text-lg tracking-widest bg-slate-50 p-2 rounded text-center border border-slate-100">
                        {c.digits.join('')}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center text-sm text-slate-500 font-bold">7 Combinations</div>
                </div>

                {/* Group B */}
                <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-sm">
                  <h3 className="font-bold text-purple-600 mb-3 border-b pb-2">Group B: Two 8s, Five 9s</h3>
                  <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {candidates.filter(c => c.type === 'groupB').map((c) => (
                      <div key={c.id} className="font-mono text-lg tracking-widest bg-slate-50 p-2 rounded text-center border border-slate-100">
                        {c.digits.join('')}
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 text-center text-sm text-slate-500 font-bold">21 Combinations</div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={() => setStep(2)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                  Apply the Rule <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: THE 11 RULE */}
          {step === 2 && (
            <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-slate-800">Step 3: The 11 Rule (Blue vs Red)</h2>
              
              <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm">
                <p className="text-lg mb-4">
                  A number is divisible by 11 if the <span className="text-blue-600 font-bold">Sum of Odd Positions</span> minus the <span className="text-red-600 font-bold">Sum of Even Positions</span> is a multiple of 11 (0, 11, -11, etc.).
                </p>
                
                <div className="flex justify-center items-center gap-1 md:gap-2 mb-6">
                  {['d₆','d₅','d₄','d₃','d₂','d₁','d₀'].map((label, i) => (
                     <div key={i} className={`flex flex-col items-center gap-2`}>
                        <div className={`w-10 h-12 md:w-14 md:h-16 border-2 rounded-lg flex items-center justify-center text-xl font-bold ${getDigitColor(i)}`}>
                          ?
                        </div>
                        <span className="text-xs font-bold text-slate-400">{label}</span>
                     </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-200">
                      <h4 className="font-bold text-blue-800 mb-1">Blue Team Sum (B)</h4>
                      <p className="text-sm text-blue-600">Positions 1, 3, 5, 7</p>
                      <p className="text-xs opacity-75">(Indices 0, 2, 4, 6)</p>
                   </div>
                   <div className="bg-red-50 p-4 rounded-lg text-center border border-red-200">
                      <h4 className="font-bold text-red-800 mb-1">Red Team Sum (R)</h4>
                      <p className="text-sm text-red-600">Positions 2, 4, 6</p>
                      <p className="text-xs opacity-75">(Indices 1, 3, 5)</p>
                   </div>
                </div>
              </div>

              <div className="bg-slate-800 text-white p-6 rounded-xl">
                <h3 className="text-xl font-bold text-yellow-400 mb-2 flex items-center gap-2">
                  <Search className="w-5 h-5"/> The Critical Logic
                </h3>
                <div className="space-y-2 font-mono text-lg">
                  <p>1. Total Sum: <span className="text-blue-300">B</span> + <span className="text-red-300">R</span> = 61</p>
                  <p>2. 11 Rule: &nbsp;&nbsp;<span className="text-blue-300">B</span> - <span className="text-red-300">R</span> = 11 (or -11, 33...)</p>
                  <hr className="border-slate-600 my-2"/>
                  <p className="opacity-80 text-sm font-sans">Add the equations together:</p>
                  <p>2 × <span className="text-blue-300">B</span> = 72</p>
                  <p className="text-2xl font-bold text-green-400 mt-2">Therefore: <span className="text-blue-300">B</span> must be 36</p>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={() => setStep(3)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                  The "Lock" <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: THE VISUAL PROOF */}
          {step === 3 && (
             <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-slate-800">Step 4: The "Lock"</h2>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg text-lg">
                <p>We just proved the <strong>Blue Team Sum</strong> must be exactly <strong>36</strong>.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
                <p className="mb-4 text-slate-600 font-medium">Look at the Blue Team slots (Indices 0, 2, 4, 6). There are 4 slots.</p>
                
                <div className="flex gap-2 mb-4">
                   {[0, 2, 4, 6].map((idx) => (
                     <div key={idx} className="w-16 h-20 bg-blue-100 border-2 border-blue-400 rounded-lg flex flex-col items-center justify-center">
                       <span className="text-3xl font-bold text-blue-800">9</span>
                     </div>
                   ))}
                </div>
                
                <div className="text-center space-y-2">
                  <p className="text-xl">Max Value per slot = 9</p>
                  <p className="text-xl">4 slots × 9 = <strong>36</strong></p>
                </div>
              </div>

              <div className="p-4 bg-indigo-50 rounded-xl text-center text-indigo-900">
                <h3 className="text-xl font-bold mb-2">Conclusion</h3>
                <p className="text-lg">
                  Since the Blue Team NEEDS 36 points, and the MAXIMUM points they can possibly get is 36...
                </p>
                <p className="text-2xl font-bold mt-4 text-indigo-700">
                   Every Blue slot MUST be a 9!
                </p>
              </div>

              <div className="flex justify-end mt-4">
                <button onClick={() => setStep(4)} className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-full font-bold hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-200">
                  Filter the Candidates <CheckCircle className="w-5 h-5" />
                </button>
              </div>
             </div>
          )}

           {/* STEP 5: FINAL RESULT */}
           {step === 4 && (
             <div className="space-y-6 animate-in slide-in-from-right duration-500">
              <h2 className="text-2xl font-bold text-slate-800">Step 5: Final Filter</h2>
              <p className="text-slate-600">
                Let's check all 28 suspects. We only keep numbers where <span className="text-blue-600 font-bold">positions 1, 3, 5, 7 are all 9s</span>.
              </p>

              <div className="h-64 overflow-y-auto border rounded-xl bg-slate-50 p-2 custom-scrollbar">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {candidates.map((c) => {
                    // Check constraint: Indices 0, 2, 4, 6 must be 9
                    const passes = c.digits[0] === 9 && c.digits[2] === 9 && c.digits[4] === 9 && c.digits[6] === 9;
                    
                    return (
                      <div 
                        key={c.id} 
                        className={`flex flex-col items-center p-2 rounded border ${
                          passes 
                            ? 'bg-green-100 border-green-400 shadow-md scale-105' 
                            : 'bg-white border-slate-200 opacity-40 grayscale'
                        } transition-all`}
                      >
                        <div className="flex gap-0.5">
                          {c.digits.map((d, i) => (
                            <span key={i} className={`text-sm font-bold ${
                                i % 2 === 0 
                                  ? (passes ? 'text-blue-700' : 'text-slate-400') 
                                  : (passes ? 'text-red-700' : 'text-slate-400')
                            }`}>
                              {d}
                            </span>
                          ))}
                        </div>
                        {passes && <div className="text-xs font-bold text-green-700 mt-1 flex items-center gap-1"><CheckCircle size={10}/> Match</div>}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-indigo-100">
                <h3 className="text-xl font-bold text-center text-slate-800 mb-4">The Probability</h3>
                <div className="flex items-center justify-center gap-4 md:gap-8">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600">{CorrectCount}</div>
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Matches</div>
                  </div>
                  <div className="text-4xl text-slate-300">/</div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-slate-800">{TotalCount}</div>
                    <div className="text-sm font-medium text-slate-500 uppercase tracking-wider mt-1">Total Suspects</div>
                  </div>
                  <div className="text-4xl text-slate-300">=</div>
                  <div className="text-center bg-indigo-600 text-white p-4 rounded-xl shadow-lg transform hover:scale-110 transition-transform">
                    <div className="text-4xl font-bold">3 / 14</div>
                    <div className="text-xs font-medium opacity-80 uppercase tracking-wider mt-1">Simplified</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-6">
                <button onClick={() => setStep(0)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors">
                  <RefreshCw className="w-4 h-4" /> Start Over
                </button>
              </div>

             </div>
           )}

        </div>
      </div>
    </div>
  );
};

export default DivisibilityProof;