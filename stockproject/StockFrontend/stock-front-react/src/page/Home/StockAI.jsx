import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const StockAI = () => {
  // State to hold the conversation (array of question-answer pairs)
  const [chat, setChat] = useState([]);
  const [userMessage, setUserMessage] = useState("");

  // Function to handle the submission of the user's question
  const handleSendMessage = () => {
    if (userMessage.trim() === "") return; // Don't send empty messages

    // Simulate AI response (can be replaced with API call to an AI model)
    const aiResponse = `AI: Analyzing your request for "${userMessage}". Here's what I found about stocks...`;

    // Update the chat with the user's message and the AI response
    setChat([...chat, { question: userMessage, answer: aiResponse }]);
    setUserMessage(""); // Clear the input field after sending
  };

  return (
    <div className="w-full lg:flex lg:flex-col h-[80vh] overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 ">
        {chat.map((message, index) => (
          <div key={index} className="mb-4">
            {/* User Question (displayed on the right) */}
            <div className="flex justify-end mb-2">
              <div className="bg-gray-500 text-white p-3 rounded-lg max-w-[60%]">
                {message.question}
              </div>
            </div>

            {/* AI Response (displayed on the left) */}
            <div className="flex justify-start">
              <div className="bg-gray-500 text-black p-3 rounded-lg max-w-[60%]">
                {message.answer}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input box for the user to ask questions */}
      <div className="p-4 bg-gray border-t border-gray-500">
        <div className="flex">
          {/* User text input */}
          <Textarea
            className="flex-grow"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Ask StockAI anything about stocks..."
          />
          <Button onClick={handleSendMessage} className="ml-2 mt-2">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StockAI;
