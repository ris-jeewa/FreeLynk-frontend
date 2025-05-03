import { FaCode, FaPalette, FaChartLine, FaLanguage, FaMobile, FaVideo, FaMusic, FaPen ,FaShieldAlt, FaHandshake, FaUsers} from 'react-icons/fa'

export const profiles = [
    { name: 'Adam Crawford', image: '/avatars/hero-img-4.jpeg', rotation: 0, distance: 160 },
    { name: 'Christina Jones', image: '/avatars/hero-img-2.jpeg', rotation: 60, distance: 160 },
    { name: 'James Warner', image: '/avatars/hero-img-3.jpeg', rotation: 120, distance: 160 },
    { name: 'Sophia Garner', image: '/avatars/hero-img-1.jpeg', rotation: 180, distance: 160 },
    { name: 'Kevin Kapoor', image: '/avatars/hero-img-6.jpeg', rotation: 240, distance: 160 },
    { name: 'Megan Trainer', image: '/avatars/hero-img-7.jpeg', rotation: 300, distance: 160 },
  ];


  export const categories = [
    { 
      name: 'Web Development', 
      icon: <FaCode className="text-4xl" />,
      description: 'Frontend, Backend, Full Stack',
      color: 'bg-blue-500'
    },
    { 
      name: 'Design & Creative', 
      icon: <FaPalette className="text-4xl" />,
      description: 'UI/UX, Graphic Design, Branding',
      color: 'bg-purple-500'
    },
    { 
      name: 'Marketing', 
      icon: <FaChartLine className="text-4xl" />,
      description: 'Digital Marketing, SEO, Social Media',
      color: 'bg-green-500'
    },
    { 
      name: 'Writing & Translation', 
      icon: <FaLanguage className="text-4xl" />,
      description: 'Content Writing, Copywriting, Translation',
      color: 'bg-yellow-500'
    },
    { 
      name: 'Mobile Development', 
      icon: <FaMobile className="text-4xl" />,
      description: 'iOS, Android, Cross-platform',
      color: 'bg-red-500'
    },
    { 
      name: 'Video & Animation', 
      icon: <FaVideo className="text-4xl" />,
      description: 'Video Editing, Motion Graphics',
      color: 'bg-pink-500'
    },
    { 
      name: 'Music & Audio', 
      icon: <FaMusic className="text-4xl" />,
      description: 'Music Production, Sound Design',
      color: 'bg-indigo-500'
    },
    { 
      name: 'Content Writing', 
      icon: <FaPen className="text-4xl" />,
      description: 'Blog Writing, Technical Writing',
      color: 'bg-orange-500'
    }
  ];


export const features = [
    {
      icon: <FaShieldAlt className="text-4xl text-orange-500" />,
      title: "Secure Platform",
      description: "Your projects and payments are protected with our advanced security measures"
    },
    {
      icon: <FaHandshake className="text-4xl text-orange-500" />,
      title: "Trusted Community",
      description: "Join thousands of verified freelancers and clients worldwide"
    },
    {
      icon: <FaChartLine className="text-4xl text-orange-500" />,
      title: "Growth Opportunities",
      description: "Access to high-quality projects and continuous learning resources"
    },
    {
      icon: <FaUsers className="text-4xl text-orange-500" />,
      title: "Diverse Talent",
      description: "Find the perfect match for your project from our global talent pool"
    }
  ];