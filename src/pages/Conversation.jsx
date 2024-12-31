import { useAuth } from "@clerk/clerk-react"; // Import Clerk's auth hook
import { ChatAltIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";
import BotAvatar from "../components/shared/BotAvatar";
import Empty from "../components/shared/Empty";
import Header from "../components/shared/Header";
import Loader from "../components/shared/Loader";
import UserAvatar from "../components/shared/UserAvatar";
import UserProfile from "../components/shared/UserProfile";

const Conversation = () => {
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
        "http://127.0.0.1:8000/api/conversations/",
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
          content: "An error occurred while fetching the response.",
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
          title="Conversation"
          description="Our most advanced Conversation model."
          icon={
            <ChatAltIcon className="h-10 w-10 text-purple-500 bg-purple-200 p-1 rounded" />
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
                placeholder="How do I calculate the radius of a circle?"
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
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
