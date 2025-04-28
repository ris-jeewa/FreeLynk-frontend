import React from 'react'
import { BiHome } from 'react-icons/bi'
import { CiSettings } from 'react-icons/ci'

export const Home = () => {
  return (
    <div className="font-sans bg-gray-50 min-h-screen">
      {/* Navbar */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">FreeLynk</h1>
          
        </div>
      </header>
      <div className="py-4 flex-1/2 fixed inset-0 bg-opacity-50 z-20 md:hidden">
          <div className="px-4 py-2 text-xs text-gray-500 font-medium uppercase">Menu</div>
          
          <nav 
            href="/" 
            // icon={<BiHome />} 
            // isActive={location === '/'}
          >
            Dashboard
          </nav>
          
          <nav 
            href="/projects" 
            // icon={<BriefcaseBusiness />} 
            // isActive={location.startsWith('/projects')}
          >
            Browse Projects
          </nav>
          
          {/* {user?.role === 'client' && (
            <nav 
              href="/create-project" 
              icon={<PlusSquare />} 
              isActive={location === '/create-project'}
            >
              Post a Project
            </nav>
          )} */}
          
          <nav 
            href="/messages" 
            // icon={<MessageSquare />} 
            // isActive={location === '/messages'}
          >
            Messages
          </nav>
          
          <nav 
            href="/contracts" 
            // icon={<ScrollText />} 
            // isActive={location === '/contracts'}
          >
            Contracts
          </nav>
          
          <nav 
            href="/payments" 
            // icon={<CreditCard />} 
            // isActive={location === '/payments'}
          >
            Payments
          </nav>
          
          <div className="px-4 py-2 mt-4 text-xs text-gray-500 font-medium uppercase">Account</div>
          
          <nav 
            href="/profile" 
            // icon={<User />} 
            // isActive={location === '/profile'}
          >
            My Profile
          </nav>
          
          <nav 
            href="/settings" 
            // icon={<CiSettings />} 
            // isActive={location === '/settings'}
          >
            Settings
          </nav>
        </div>

      <div className="flex-1/2">
        {/* Hero Section */}
      <section className="bg-blue-100 py-20 text-center">
        <h2 className="text-4xl font-bold text-blue-800 mb-4">Find the Perfect Freelancer</h2>
        <p className="text-gray-700 mb-8">Connect with talented freelancers around the globe, get things done fast.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700">Get Started</button>
      </section>

      {/* Services */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h3 className="text-2xl font-bold mb-8 text-gray-800">Explore Services</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {["Web Dev", "Graphic Design", "Marketing", "Writing"].map((service, i) => (
            <div key={i} className="bg-white shadow-sm rounded-lg p-6 text-center hover:shadow-md transition">
              <p className="text-lg font-medium text-gray-700">{service}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Freelancers */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Top Freelancers</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((id) => (
              <div key={id} className="border rounded-lg p-6 text-center">
                <img src={`https://i.pravatar.cc/150?img=${id + 10}`} alt="Freelancer" className="w-20 h-20 rounded-full mx-auto mb-4" />
                <h4 className="font-semibold">Freelancer {id}</h4>
                <p className="text-sm text-gray-500">Web Developer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-16">
        <p>© 2025 FreeLynk. All rights reserved.</p>
      </footer>
      </div>
    </div>
  )
}

