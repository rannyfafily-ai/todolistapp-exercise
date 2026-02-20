import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen 
                 bg-[url('/bg.jpg')] bg-cover bg-center bg-no-repeat 
                 text-white p-4 text-center">
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Get things done — effortlessly.
      </h1>
      <p className="text-gray-400 mb-8 max-w-md">
       Stay on top of your day and turn your plans into progress with our simple, beautifully designed todo app
      </p>
      <Link to="/todos">
        <Button className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg rounded-xl transition-all hover:scale-105">
          Try Now
        </Button>
      </Link>
    </div>
  );
}