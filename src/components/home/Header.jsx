import { ChatAltIcon, CodeIcon, MusicNoteIcon, PhotographIcon, VideoCameraIcon } from "@heroicons/react/outline"
import FeatureCard from "./FeatureCard"


const Header = () => {
  return (
    <div className=" p-10 text-center">
      <h1 className="text-3xl font-bold mb-6">Explore the power of AI</h1>
      <p className="mb-10 text-gray-600">Chat with the smartest AI - Experience the power of AI</p>
      <div className="">
        <FeatureCard title="Conversation" icon={<ChatAltIcon className="h-10 w-10 text-purple-500 bg-purple-200 p-1 rounded" />} />
        <FeatureCard title="Music Generation" icon={<MusicNoteIcon className="h-10 w-10 text-green-600 bg-green-200 p-1 rounded" />} />
        <FeatureCard title="Image Generation" icon={<PhotographIcon className="h-10 w-10 text-pink-600 bg-pink-200 p-1 rounded" /> } />
        <FeatureCard title="Video Generation" icon={<VideoCameraIcon className="h-10 w-10 text-orange-500 bg-orange-100 p-1 rounded" />} />
        <FeatureCard title="Code Generation" icon={<CodeIcon className="h-10 w-10 text-green-800 bg-green-200 p-1 rounded" />} />
      </div>
    </div>
  )
}

export default Header