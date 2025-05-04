
// // // // import { useState } from "react";
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // // import { Button } from "@/components/ui/button";
// // // // import { Input } from "@/components/ui/input";
// // // // import { Send } from "lucide-react";
// // // // import { CompanyAnalysis } from "@/lib/types";
// // // // import { cn } from "@/lib/utils";

// // // // interface ChatBotProps {
// // // //   company: CompanyAnalysis;
// // // // }

// // // // interface ChatMessage {
// // // //   id: string;
// // // //   content: string;
// // // //   sender: "user" | "bot";
// // // //   timestamp: Date;
// // // // }

// // // // export function ChatBot({ company }: ChatBotProps) {
// // // //   const [message, setMessage] = useState("");
// // // //   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
// // // //     {
// // // //       id: "initial",
// // // //       content: `Hello! I'm your financial analyst assistant. Ask me questions about ${company.companyName}'s financial health, red flags, or sentiment analysis.`,
// // // //       sender: "bot",
// // // //       timestamp: new Date(),
// // // //     },
// // // //   ]);
// // // //   const [isLoading, setIsLoading] = useState(false);

// // // //   const handleSendMessage = (e: React.FormEvent) => {
// // // //     e.preventDefault();
// // // //     if (!message.trim()) return;

// // // //     const userMessage: ChatMessage = {
// // // //       id: Date.now().toString(),
// // // //       content: message,
// // // //       sender: "user",
// // // //       timestamp: new Date(),
// // // //     };

// // // //     setChatHistory((prev) => [...prev, userMessage]);
// // // //     setMessage("");
// // // //     setIsLoading(true);

// // // //     // Simulate chatbot response based on user query
// // // //     setTimeout(() => {
// // // //       let responseContent = "";
// // // //       const lowerCaseMessage = message.toLowerCase();

// // // //       if (lowerCaseMessage.includes("overall") && lowerCaseMessage.includes("score")) {
// // // //         responseContent = `${company.companyName} has an overall health score of ${company.overallScore}/100, which is ${
// // // //           company.overallScore >= 80 
// // // //             ? "excellent" 
// // // //             : company.overallScore >= 70 
// // // //             ? "good" 
// // // //             : company.overallScore >= 60 
// // // //             ? "fair" 
// // // //             : "concerning"
// // // //         }.`;
// // // //       } else if (
// // // //         lowerCaseMessage.includes("financial") ||
// // // //         lowerCaseMessage.includes("ratio") ||
// // // //         lowerCaseMessage.includes("ratios")
// // // //       ) {
// // // //         const goodRatios = company.financialRatios.filter(r => r.isGood).length;
// // // //         const totalRatios = company.financialRatios.length;
// // // //         responseContent = `${company.companyName}'s financial ratios score is ${company.financialRatiosScore}/100. ${goodRatios} out of ${totalRatios} key ratios are favorable. The company ${
// // // //           company.financialRatiosScore >= 80 
// // // //             ? "has very strong financial indicators" 
// // // //             : company.financialRatiosScore >= 70 
// // // //             ? "has generally healthy financial indicators" 
// // // //             : "has some financial metrics that need attention"
// // // //         }.`;
// // // //       } else if (
// // // //         lowerCaseMessage.includes("red flag") ||
// // // //         lowerCaseMessage.includes("risk") ||
// // // //         lowerCaseMessage.includes("warning")
// // // //       ) {
// // // //         if (company.redFlags.length === 0) {
// // // //           responseContent = `No significant red flags were identified for ${company.companyName}.`;
// // // //         } else {
// // // //           responseContent = `${company.companyName} has ${company.redFlags.length} identified red flags, with a red flag score of ${company.redFlagsScore}/100. The most significant concern is "${
// // // //             company.redFlags[0].title
// // // //           }" with an impact rating of ${company.redFlags[0].impact.toFixed(1)}/10.`;
// // // //         }
// // // //       } else if (
// // // //         lowerCaseMessage.includes("sentiment") ||
// // // //         lowerCaseMessage.includes("news") ||
// // // //         lowerCaseMessage.includes("opinion")
// // // //       ) {
// // // //         const positiveSentiments = company.sentimentAnalysis.filter(
// // // //           item => item.sentiment === "positive"
// // // //         ).length;
// // // //         const totalSentiments = company.sentimentAnalysis.length;
// // // //         responseContent = `${company.companyName}'s sentiment analysis score is ${company.sentimentScore}/100. ${positiveSentiments} out of ${totalSentiments} analyzed sources are positive. Overall market sentiment is ${
// // // //           company.sentimentScore >= 80 
// // // //             ? "very positive" 
// // // //             : company.sentimentScore >= 70 
// // // //             ? "generally positive" 
// // // //             : "mixed"
// // // //         }.`;
// // // //       } else {
// // // //         responseContent = `I'm not sure about that specific question regarding ${company.companyName}. You can ask me about their overall score, financial ratios, red flags, or sentiment analysis.`;
// // // //       }

// // // //       const botResponse: ChatMessage = {
// // // //         id: `response-${Date.now()}`,
// // // //         content: responseContent,
// // // //         sender: "bot",
// // // //         timestamp: new Date(),
// // // //       };

// // // //       setIsLoading(false);
// // // //       setChatHistory((prev) => [...prev, botResponse]);
// // // //     }, 1500);
// // // //   };

// // // //   return (
// // // //     <Card className="flex flex-col h-full">
// // // //       <CardHeader>
// // // //         <CardTitle>Financial Analyst Assistant</CardTitle>
// // // //       </CardHeader>
// // // //       <CardContent className="flex-1 flex flex-col">
// // // //         <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
// // // //           {chatHistory.map((msg) => (
// // // //             <div
// // // //               key={msg.id}
// // // //               className={cn(
// // // //                 "flex",
// // // //                 msg.sender === "user" ? "justify-end" : "justify-start"
// // // //               )}
// // // //             >
// // // //               <div
// // // //                 className={cn(
// // // //                   "max-w-[80%] rounded-lg px-4 py-2",
// // // //                   msg.sender === "user"
// // // //                     ? "bg-primary text-primary-foreground"
// // // //                     : "bg-muted"
// // // //                 )}
// // // //               >
// // // //                 {msg.content}
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //           {isLoading && (
// // // //             <div className="flex justify-start">
// // // //               <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
// // // //                 <div className="flex space-x-2">
// // // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
// // // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
// // // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           )}
// // // //         </div>
// // // //         <form onSubmit={handleSendMessage} className="flex gap-2">
// // // //           <Input
// // // //             value={message}
// // // //             onChange={(e) => setMessage(e.target.value)}
// // // //             placeholder="Ask about this company's financial health..."
// // // //             className="flex-1"
// // // //             disabled={isLoading}
// // // //           />
// // // //           <Button type="submit" size="icon" disabled={isLoading}>
// // // //             <Send className="h-4 w-4" />
// // // //           </Button>
// // // //         </form>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // }

// // // import { useState } from "react";
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // // import { Button } from "@/components/ui/button";
// // // import { Input } from "@/components/ui/input";
// // // import { Send } from "lucide-react";
// // // import { CompanyAnalysis } from "@/lib/types";
// // // import { cn } from "@/lib/utils";

// // // interface ChatBotProps {
// // //   company: CompanyAnalysis;
// // // }

// // // interface ChatMessage {
// // //   id: string;
// // //   content: string;
// // //   sender: "user" | "bot";
// // //   timestamp: Date;
// // // }

// // // export function ChatBot({ company }: ChatBotProps) {
// // //   const [message, setMessage] = useState("");
// // //   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
// // //     {
// // //       id: "initial",
// // //       content: `Hello! I'm your financial analyst assistant. Ask me questions about ${company.companyName}'s financial health, red flags, or sentiment analysis.`,
// // //       sender: "bot",
// // //       timestamp: new Date(),
// // //     },
// // //   ]);
// // //   const [isLoading, setIsLoading] = useState(false);

// // //   const handleSendMessage = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     if (!message.trim()) return;

// // //     const userMessage: ChatMessage = {
// // //       id: Date.now().toString(),
// // //       content: message,
// // //       sender: "user",
// // //       timestamp: new Date(),
// // //     };

// // //     setChatHistory((prev) => [...prev, userMessage]);
// // //     setMessage("");
// // //     setIsLoading(true);

// // //     try {
// // //       const response = await fetch('/api/chat', { // Assuming this is correctly routed to your Flask API
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //         },
// // //         body: JSON.stringify({
// // //           companyCode: company.ticker, // Or company.companyName, depending on what your Flask API expects
// // //           metrics: company.financialRatios,
// // //           financialScore: company.financialRatiosScore,
// // //           sentimentScore: company.sentimentScore,
// // //           redFlagsScore: company.redFlagsScore,
// // //           redFlagAnalysis: company.redFlags,
// // //           question: message,
// // //         }),
// // //       });

// // //       if (!response.ok) {
// // //         const errorData = await response.json();
// // //         throw new Error(errorData.error || 'Failed to get chatbot response');
// // //       }

// // //       const data = await response.json();
// // //       const botResponse: ChatMessage = {
// // //         id: `response-${Date.now()}`,
// // //         content: data.answer || "Sorry, I couldn't retrieve an answer.",
// // //         sender: "bot",
// // //         timestamp: new Date(),
// // //       };

// // //       setChatHistory((prev) => [...prev, botResponse]);

// // //     } catch (error: any) {
// // //       console.error('Error fetching chatbot response:', error);
// // //       const errorResponse: ChatMessage = {
// // //         id: `error-${Date.now()}`,
// // //         content: "Sorry, I encountered an error while processing your request.",
// // //         sender: "bot",
// // //         timestamp: new Date(),
// // //       };
// // //       setChatHistory(prev => [...prev, errorResponse])

// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <Card className="flex flex-col h-full">
// // //       <CardHeader>
// // //         <CardTitle>Financial Analyst Assistant</CardTitle>
// // //       </CardHeader>
// // //       <CardContent className="flex-1 flex flex-col">
// // //         <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
// // //           {chatHistory.map((msg) => (
// // //             <div
// // //               key={msg.id}
// // //               className={cn(
// // //                 "flex",
// // //                 msg.sender === "user" ? "justify-end" : "justify-start"
// // //               )}
// // //             >
// // //               <div
// // //                 className={cn(
// // //                   "max-w-[80%] rounded-lg px-4 py-2",
// // //                   msg.sender === "user"
// // //                     ? "bg-primary text-primary-foreground"
// // //                     : "bg-muted"
// // //                 )}
// // //               >
// // //                 {msg.content}
// // //               </div>
// // //             </div>
// // //           ))}
// // //           {isLoading && (
// // //             <div className="flex justify-start">
// // //               <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
// // //                 <div className="flex space-x-2">
// // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
// // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
// // //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}
// // //         </div>
// // //         <form onSubmit={handleSendMessage} className="flex gap-2">
// // //           <Input
// // //             value={message}
// // //             onChange={(e) => setMessage(e.target.value)}
// // //             placeholder="Ask about this company's financial health..."
// // //             className="flex-1"
// // //             disabled={isLoading}
// // //           />
// // //           <Button type="submit" size="icon" disabled={isLoading}>
// // //             <Send className="h-4 w-4" />
// // //           </Button>
// // //         </form>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // }

// // import { useState } from "react";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Send } from "lucide-react";
// // import { CompanyAnalysis } from "@/lib/types";
// // import { cn } from "@/lib/utils";

// // interface ChatBotProps {
// //   company: CompanyAnalysis;
// // }

// // interface ChatMessage {
// //   id: string;
// //   content: string;
// //   sender: "user" | "bot";
// //   timestamp: Date;
// // }

// // export function ChatBot({ company }: ChatBotProps) {
// //   const [message, setMessage] = useState("");
// //   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
// //     {
// //       id: "initial",
// //       content: `Hello! I'm your financial analyst assistant. Ask me questions about ${company.companyName}'s financial health, red flags, or sentiment analysis.`,
// //       sender: "bot",
// //       timestamp: new Date(),
// //     },
// //   ]);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const handleSendMessage = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (!message.trim()) return;

// //     const userMessage: ChatMessage = {
// //       id: Date.now().toString(),
// //       content: message,
// //       sender: "user",
// //       timestamp: new Date(),
// //     };

// //     setChatHistory((prev) => [...prev, userMessage]);
// //     setMessage("");
// //     setIsLoading(true);

// //     try {
// //       const response = await fetch('/api/chat', { // Assuming this is correctly routed to your Flask API
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           companyCode: company.ticker, // Or company.companyName, depending on what your Flask API expects
// //           metrics: company.financialRatios,
// //           financialScore: company.financialRatiosScore,
// //           sentimentScore: company.sentimentScore,
// //           redFlagsScore: company.redFlagsScore,
// //           redFlagAnalysis: company.redFlags,
// //           question: message,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.error || 'Failed to get chatbot response');
// //       }

// //       const data = await response.json();
// //       const botResponse: ChatMessage = {
// //         id: `response-${Date.now()}`,
// //         content: data.answer || "Sorry, I couldn't retrieve an answer.",
// //         sender: "bot",
// //         timestamp: new Date(),
// //       };

// //       setChatHistory((prev) => [...prev, botResponse]);

// //     } catch (error: unknown) {
// //       console.error('Error fetching chatbot response:', error);
      
// //       let errorMessage = "Sorry, I encountered an error while processing your request.";
// //       if (error instanceof Error) {
// //         errorMessage = `Error: ${error.message}`;
// //       }
      
// //       const errorResponse: ChatMessage = {
// //         id: `error-${Date.now()}`,
// //         content: errorMessage,
// //         sender: "bot",
// //         timestamp: new Date(),
// //       };
      
// //       setChatHistory(prev => [...prev, errorResponse]);
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <Card className="flex flex-col h-full">
// //       <CardHeader>
// //         <CardTitle>Financial Analyst Assistant</CardTitle>
// //       </CardHeader>
// //       <CardContent className="flex-1 flex flex-col">
// //         <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
// //           {chatHistory.map((msg) => (
// //             <div
// //               key={msg.id}
// //               className={cn(
// //                 "flex",
// //                 msg.sender === "user" ? "justify-end" : "justify-start"
// //               )}
// //             >
// //               <div
// //                 className={cn(
// //                   "max-w-[80%] rounded-lg px-4 py-2",
// //                   msg.sender === "user"
// //                     ? "bg-primary text-primary-foreground"
// //                     : "bg-muted"
// //                 )}
// //               >
// //                 {msg.content}
// //               </div>
// //             </div>
// //           ))}
// //           {isLoading && (
// //             <div className="flex justify-start">
// //               <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
// //                 <div className="flex space-x-2">
// //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
// //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
// //                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //         <form onSubmit={handleSendMessage} className="flex gap-2">
// //           <Input
// //             value={message}
// //             onChange={(e) => setMessage(e.target.value)}
// //             placeholder="Ask about this company's financial health..."
// //             className="flex-1"
// //             disabled={isLoading}
// //           />
// //           <Button type="submit" size="icon" disabled={isLoading}>
// //             <Send className="h-4 w-4" />
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Send } from "lucide-react";
// import { CompanyAnalysis } from "@/lib/types";
// import { cn } from "@/lib/utils";
// import { toast } from "sonner";

// interface ChatBotProps {
//   company: CompanyAnalysis;
// }

// interface ChatMessage {
//   id: string;
//   content: string;
//   sender: "user" | "bot";
//   timestamp: Date;
// }

// export function ChatBot({ company }: ChatBotProps) {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
//     {
//       id: "initial",
//       content: `Hello! I'm your financial analyst assistant. Ask me questions about ${company.companyName}'s financial health, red flags, or sentiment analysis.`,
//       sender: "bot",
//       timestamp: new Date(),
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSendMessage = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       content: message,
//       sender: "user",
//       timestamp: new Date(),
//     };

//     setChatHistory((prev) => [...prev, userMessage]);
//     setMessage("");
//     setIsLoading(true);

//     try {
//       const response = await fetch('/api/chat', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           companyCode: company.ticker,
//           metrics: company.financialRatios,
//           financialScore: company.financialRatiosScore,
//           sentimentScore: company.sentimentScore,
//           redFlagsScore: company.redFlagsScore,
//           redFlagAnalysis: company.redFlags,
//           question: message,
//         }),
//       });

//       let errorData;
//       let data;

//       try {
//         // Try to parse the response as JSON
//         const responseText = await response.text();
//         if (responseText.trim()) {
//           data = JSON.parse(responseText);
//         } else {
//           throw new Error("Empty response received");
//         }
//       } catch (parseError) {
//         console.error('Error parsing JSON response:', parseError);
//         throw new Error('Received invalid JSON response from server');
//       }

//       if (!response.ok) {
//         throw new Error(data?.error || 'Failed to get chatbot response');
//       }

//       const botResponse: ChatMessage = {
//         id: `response-${Date.now()}`,
//         content: data?.answer || "Sorry, I couldn't retrieve an answer.",
//         sender: "bot",
//         timestamp: new Date(),
//       };

//       setChatHistory((prev) => [...prev, botResponse]);

//     } catch (error: unknown) {
//       console.error('Error fetching chatbot response:', error);
      
//       let errorMessage = "Sorry, I encountered an error while processing your request.";
//       if (error instanceof Error) {
//         errorMessage = `Error: ${error.message}`;
//       }
      
//       const errorResponse: ChatMessage = {
//         id: `error-${Date.now()}`,
//         content: errorMessage,
//         sender: "bot",
//         timestamp: new Date(),
//       };
      
//       setChatHistory(prev => [...prev, errorResponse]);
//       toast.error("Failed to get response from the server");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="flex flex-col h-full">
//       <CardHeader>
//         <CardTitle>Financial Analyst Assistant</CardTitle>
//       </CardHeader>
//       <CardContent className="flex-1 flex flex-col">
//         <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
//           {chatHistory.map((msg) => (
//             <div
//               key={msg.id}
//               className={cn(
//                 "flex",
//                 msg.sender === "user" ? "justify-end" : "justify-start"
//               )}
//             >
//               <div
//                 className={cn(
//                   "max-w-[80%] rounded-lg px-4 py-2",
//                   msg.sender === "user"
//                     ? "bg-primary text-primary-foreground"
//                     : "bg-muted"
//                 )}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start">
//               <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
//                 <div className="flex space-x-2">
//                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
//                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
//                   <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <form onSubmit={handleSendMessage} className="flex gap-2">
//           <Input
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask about this company's financial health..."
//             className="flex-1"
//             disabled={isLoading}
//           />
//           <Button type="submit" size="icon" disabled={isLoading}>
//             <Send className="h-4 w-4" />
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }


import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";
import { CompanyAnalysis } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ChatBotProps {
  company: CompanyAnalysis;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBot({ company }: ChatBotProps) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      id: "initial",
      content: `Hello! I'm your financial analyst assistant. Ask me questions about ${company.companyName}'s financial health, red flags, or sentiment analysis.`,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // Backend API URL - use environment variable or hardcode the correct URL
  const API_URL = "http://localhost:8082/api/chat";

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: message,
      sender: "user",
      timestamp: new Date(),
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyCode: company.ticker,
          metrics: company.financialRatios,
          financialScore: company.financialRatiosScore,
          sentimentScore: company.sentimentScore,
          redFlagsScore: company.redFlagsScore,
          redFlagAnalysis: company.redFlags,
          question: message,
        }),
      });

      // First check if the response is ok
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }

      // Then safely get the text content
      const responseText = await response.text();
      
      // Only try to parse JSON if there's actual content
      let data;
      if (responseText && responseText.trim()) {
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing JSON response:', parseError, 'Raw response:', responseText);
          throw new Error('Received invalid JSON response from server');
        }
      } else {
        throw new Error('Received empty response from server');
      }

      const botResponse: ChatMessage = {
        id: `response-${Date.now()}`,
        content: data?.answer || "Sorry, I couldn't retrieve an answer.",
        sender: "bot",
        timestamp: new Date(),
      };

      setChatHistory((prev) => [...prev, botResponse]);

    } catch (error: unknown) {
      console.error('Error fetching chatbot response:', error);
      
      let errorMessage = "Sorry, I encountered an error while processing your request.";
      if (error instanceof Error) {
        errorMessage = `Error: ${error.message}`;
      }
      
      const errorResponse: ChatMessage = {
        id: `error-${Date.now()}`,
        content: errorMessage,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setChatHistory(prev => [...prev, errorResponse]);
      toast.error("Failed to get response from the server. Make sure your Flask backend is running on port 8082.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>Financial Analyst Assistant</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4 space-y-4 max-h-[400px]">
          {chatHistory.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex",
                msg.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg px-4 py-2",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] rounded-lg px-4 py-2 bg-muted">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}
        </div>
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about this company's financial health..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
