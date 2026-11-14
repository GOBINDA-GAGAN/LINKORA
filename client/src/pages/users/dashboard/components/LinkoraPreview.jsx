
import {
  Globe,
  ArrowUpRight,
  Share2,
  Link2,
  Globe2,
} from "lucide-react";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";

const links = [
  {
    title: "My Website",
    subtitle: "Explore my personal website",
    icon: Globe2,
    color: "bg-blue-50 text-blue-600",
  },
  {
    title: "Instagram",
    subtitle: "Follow my daily updates",
    icon: FaInstagram,
    color: "bg-pink-50 text-pink-600",
  },
  {
    title: "GitHub",
    subtitle: "Explore my projects",
    icon: FaGithub,
    color: "bg-gray-100 text-gray-800",
  },
  {
    title: "YouTube",
    subtitle: "Watch my latest videos",
    icon: FaYoutube,
    color: "bg-red-50 text-red-600",
  },
];

export default function LinkoraPreview() {
  return (
    <div className="w-full flex justify-end ">
      {/* Mobile preview */}
      <div className=" h-200 w-100 bg-brand-primary rounded-2xl">

      </div>
    
    </div>
  );
}
