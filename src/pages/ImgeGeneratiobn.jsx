import { useAuth } from "@clerk/clerk-react";
import { DownloadIcon, PhotographIcon } from "@heroicons/react/outline";
import axios from "axios";
import { useState } from "react";
import Empty from "../components/shared/Empty";
import Header from "../components/shared/Header";
import Loader from "../components/shared/Loader";
import UserProfile from "../components/shared/UserProfile";

const ImageGeneration = () => {
  const { getToken } = useAuth(); // Use Clerk's auth hook
  const [formData, setFormData] = useState({
    prompt: "",
    amount: "1",
    resolution: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(""); // Error state

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
    setError(""); // Clear previous error

    try {
      setImages([]);

      const token = await getToken();
      const values = {
        prompt: formData.prompt,
        amount: formData.amount,
        resolution: formData.resolution,
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/image/",
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(response.data);

      const urls = response.data; //response.data.map((image) => image);
      //   console.log(urls);

      setImages(urls);
      setFormData({ prompt: "", amount: "1", resolution: "" });
    } catch (error) {
      setError("Failed to generate images. Please try again.");
      console.error("Error:", error);
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
          title="Image Generation"
          description="Turn your prompt into an Image."
          icon={
            <PhotographIcon className="h-10 w-10 text-pink-600 bg-pink-200 p-1 rounded" />
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
                name="prompt"
                value={formData.prompt}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 placeholder-gray-400 rounded-lg outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                disabled={isLoading}
                placeholder="A picture of a horse in Swiss alps"
              />
            </div>
            {/* <div className="col-span-12 lg:col-span-2">
              <select
                name="amount"
                disabled={isLoading}
                onChange={handleChange}
                required
                value={formData.amount}
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg shadow-sm focus:border-black hover:bg-gray-50 cursor-pointer"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {amountOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className="text-gray-700"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}

            {/* <div className="col-span-12 lg:col-span-2">
              <select
                name="resolution"
                disabled={isLoading}
                onChange={handleChange}
                required
                value={formData.resolution}
                className="w-full px-4 py-3 bg-gray-100 text-gray-800 border border-gray-300 rounded-lg focus:border-black hover:bg-gray-50 cursor-pointer"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {resolutionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div> */}
            <button
              type="submit"
              className="col-span-12 bg-black p-3 text-white rounded-md lg:col-span-2"
              disabled={isLoading}
            >
              Generate
            </button>
          </form>

          {error && (
            <div className="mt-4 text-red-600 bg-red-100 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="space-y-4 mt-4">
            {isLoading && (
              <div className="p-20">
                <Loader />
              </div>
            )}
            {images.length === 0 && !isLoading && !error && (
              <Empty label="No images generated." />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4  mt-8">
              {images.map((src, index) => (
                <div className="rounded-lg overflow-hidden" key={index}>
                  <div className="relative aspect-square">
                    <img src={src} alt="image" />
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => window.open(src)}
                      className="bg-black p-3 w-full text-white rounded-md flex items-center justify-center"
                    >
                      <DownloadIcon className="h-4 w-4 mr-2" /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGeneration;
