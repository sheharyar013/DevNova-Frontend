import { ExternalLink, Github } from 'lucide-react'

const Portfolio = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Application',
      description: 'A full-featured online shopping platform with payment integration, inventory management, and real-time analytics.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      gradient: 'from-blue-600 to-purple-600',
    },
    {
      title: 'Healthcare App',
      category: 'Mobile Application',
      description: 'Mobile health tracking application with appointment scheduling, telemedicine, and patient records management.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop',
      tags: ['React Native', 'Firebase', 'Redux'],
      gradient: 'from-green-600 to-teal-600',
    },
    {
      title: 'Financial Dashboard',
      category: 'Web Application',
      description: 'Real-time financial analytics dashboard with interactive charts, portfolio tracking, and market insights.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      tags: ['Vue.js', 'Python', 'PostgreSQL'],
      gradient: 'from-orange-600 to-red-600',
    },
    {
      title: 'Social Media Platform',
      category: 'Web & Mobile',
      description: 'Modern social networking platform with real-time messaging, content sharing, and community features.',
      image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
      tags: ['Next.js', 'GraphQL', 'AWS'],
      gradient: 'from-pink-600 to-purple-600',
    },
    {
      title: 'AI-Powered CRM',
      category: 'Enterprise Solution',
      description: 'Customer relationship management system with AI-driven insights, automation, and predictive analytics.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['Angular', 'Python', 'TensorFlow'],
      gradient: 'from-indigo-600 to-blue-600',
    },
    {
      title: 'Restaurant POS',
      category: 'Business Application',
      description: 'Point-of-sale system for restaurants with order management, kitchen display, and inventory tracking.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
      tags: ['React', 'Express', 'MySQL'],
      gradient: 'from-yellow-600 to-orange-600',
    },
  ]

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing our finest work and successful client partnerships
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center`}>
                  <div className="flex space-x-4 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                    <button className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                      <ExternalLink className="h-5 w-5 text-gray-900" />
                    </button>
                    <button className="p-3 bg-white rounded-full hover:scale-110 transition-transform">
                      <Github className="h-5 w-5 text-gray-900" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <span className="text-sm font-semibold text-primary-500 uppercase tracking-wide">
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="text-center mt-16">
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-all hover:scale-105 shadow-lg hover:shadow-primary-500/50 font-semibold"
          >
            View All Projects
          </a>
        </div>
      </div>
    </section>
  )
}

export default Portfolio
