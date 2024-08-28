"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useRef } from "react";

// Helper function to format the date and time
function formatDate(date) {
  const options = {
    day: "2-digit",
    month: "short",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
}

export default function Chat() {
  const router = useRouter();
  const questions = [
    "Hello from faceless, what's your name?",
    "What's your email?",
    "What service are you interested in?",
    "What's your preferred date for the meeting?",
    "Any specific requirements?",
  ];

  const [responses, setResponses] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [input, setInput] = useState("");
  const [initialTimestamp, setInitialTimestamp] = useState(null);
  const [showNextMessage, setShowNextMessage] = useState(false);
  const messagesEndRef = useRef(null);


  useEffect(() => {
    if (currentQuestionIndex === 0 && !initialTimestamp) {
      setInitialTimestamp(new Date());
      setShowNextMessage(true);
    }
  }, [currentQuestionIndex, initialTimestamp]);

  const handleSendMessage = () => {
    if (input.trim()) {
      setResponses([
        ...responses,
        { question: questions[currentQuestionIndex], answer: input },
      ]);
      setInput("");
      setShowNextMessage(false);
    }
  };

  useEffect(() => {
    if (responses.length > 0 && responses.length === questions.length) {
      (async () => {
        await fetch("/api/save-responses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(responses),
        });
        router.push("/payment");
      })();
    } else if (responses.length > 0) {
      
      setTimeout(() => {
        
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowNextMessage(true);
      }, 800);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  }, [responses]);

  return (
    <div>
      {initialTimestamp && (
        <div className="flex justify-center items-center text-sm text-gray-400 text-center mb-2">
          {formatDate(initialTimestamp)}
        </div>
      )}

      <div className="w-full flex items-center px-4 py-3">
        <div className="w-full max-w-sm p-6 text-black rounded-lg text-[14px]">
          <div className="overflow-y-auto h-96 mb-4 no-scrollbar">
            {responses.map((res, idx) => (
              <div key={idx} className="my-3">
                {/* Question on the left */}
                <div className="flex justify-start">
                  <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                    {res.question}
                  </div>
                </div>
                {/* Answer on the right */}
                <div className="flex justify-end mt-2">
                  <div className="bg-[#3797F0] rounded-[20px] py-2 px-2.5 inline-block max-w-xs text-white">
                    {res.answer}
                  </div>
                </div>
              </div>
            ))}
            {currentQuestionIndex < questions.length && showNextMessage && (
              <div className="my-2 animate-fadeinright right-0">
                <div className="bg-[#EFEFEF] rounded-[20px] py-2 px-2.5 inline-block max-w-xs">
                  {questions[currentQuestionIndex]}
                </div>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <input
              type="text"
              className="flex-1 p-2 bg-gray-700 rounded-md focus:outline-none"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 bg-blue-500 p-2 rounded-full hover:bg-blue-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14M5 12l6-6m-6 6l6 6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
