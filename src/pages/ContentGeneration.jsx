/* eslint-disable no-unused-vars */
import { useAuth } from "@clerk/clerk-react"; // Import Clerk's auth hook
import { CodeIcon, VideoCameraIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";
import BotAvatar from "../components/shared/BotAvatar";
import Empty from "../components/shared/Empty";
import Header from "../components/shared/Header";
import Loader from "../components/shared/Loader";
import UserAvatar from "../components/shared/UserAvatar";
import UserProfile from "../components/shared/UserProfile";
import ReactMarkdown from 'react-markdown';

const ContentGeneration = () => {
  const { getToken } = useAuth(); // Use Clerk's auth hook
  const [formData, setFormData] = useState({
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = await getToken();
      const userMessage = {
        role: "user",
        content: formData.content,
      };
      //const newMessages = [...responseMessage, userMessage]
      const response = await axios.post(
        "http://127.0.0.1:8000/api/content/",
        {
          prompt: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update responseMessage state
      setResponseMessage((current) => [...current, userMessage, response.data]);
      setFormData({ content: "" });
    } catch (error) {
      console.error("Error:", error);

      // Enhanced error handling
      setResponseMessage((current) => [
        ...current,
        {
          role: "error",
          content: "An error occurred while fetching the response. Please regenerate..",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="relative">
        <UserProfile />
      </div>
      <div className="p-10">
        <Header
          title="Content Generation"
          description="Generate content using descriptive text"
          icon={
            <VideoCameraIcon className="h-10 w-10 text-orange-700 bg-orange-200 p-1 rounded" />
          }
        />

        <div className="px-4 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <div className="col-span-12 lg:col-span-10">
              <input
                type="text"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-lg outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                disabled={isLoading}
                placeholder="Create me simple blog content"
              />
            </div>
            <button
              type="submit"
              className="col-span-12 bg-black p-3 text-white rounded-md lg:col-span-2"
              disabled={isLoading}
            >
              Generate
            </button>
          </form>

          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-blue-50">
                <Loader />
              </div>
            )}
            {responseMessage.length === 0 && !isLoading && (
              <Empty label="No conversations started." />
            )}
            <div className="flex flex-col-reverse gap-y-4">
              {responseMessage.map((message, index) => (
                <div
                  key={index}
                  className={`p-8 w-full flex items-start gap-x-8 rounded-lg ${
                    message.role === "user"
                      ? " border border-black/10"
                      : "bg-blue-50"
                  }`}
                >
                  <span>
                    {message.role === "assistant" ? (
                      <BotAvatar />
                    ) : (
                      <UserAvatar />
                    )}
                  </span>
                  <ReactMarkdown
                    components={{
                       
                        pre: ({ node, ...props }) => (
                            <div className="overflow-auto w-full my-4 p-4 bg-gray-900 text-white rounded-md shadow-md">
                                <pre {...props} />
                            </div>
                        ),
                        code: ({ node, inline, ...props }) => (
                            inline ? (
                                <code className="bg-gray-100 rounded px-1.5 py-0.5 text-purple-600 font-mono" {...props} />
                            ) : (
                                <code className="block bg-gray-800 p-3 rounded-md text-sm text-green-400 font-mono overflow-auto" {...props} />
                            )
                        )
                    }}
                    className="text-sm overflow-hidden leading-7"
                  
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentGeneration;
