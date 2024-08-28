"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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

  const handleSendMessage = () => {
    if (input.trim()) {
      // Add the user's response to the chat
      setResponses([
        ...responses,
        { question: questions[currentQuestionIndex], answer: input },
      ]);
      setInput("");
    }
  };

  useEffect(() => {
    if (responses.length > 0 && responses.length === questions.length) {
      // All questions have been answered, save responses and redirect
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
      // Move to the next question after each answer
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [responses]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <div className="w-full max-w-sm p-6 bg-gray-900 text-white rounded-lg shadow-md">
        <div className="overflow-y-auto h-96 mb-4">
          {responses.map((res, idx) => (
            <div key={idx} className="my-2">
              <div className="text-sm text-gray-400">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">{res.question}</div>
              <div className="text-sm text-gray-400">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="bg-gray-700 p-3 rounded-lg mt-1">
                {res.answer}
              </div>
            </div>
          ))}
          {currentQuestionIndex < questions.length && (
            <div className="my-2">
              <div className="text-sm text-gray-400">
                {new Date().toLocaleTimeString()}
              </div>
              <div className="bg-blue-600 p-3 rounded-lg">
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
  );
}
