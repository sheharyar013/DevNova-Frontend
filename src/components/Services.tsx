import {
  Smartphone,
  Globe,
  Database,
  Cloud,
  Palette,
  ShoppingCart,
  Lock,
  Cpu
} from 'lucide-react'

const Services = () => {
  const services = [
    {
      icon: Globe,
      title: 'Web Development',
      description: 'Custom websites and web applications built with modern technologies and best practices.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: Smartphone,
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications for iOS and Android devices.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: Cloud,
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure and deployment solutions for your applications.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: Database,
      title: 'Database Design',
      description: 'Robust database architecture and optimization for optimal performance.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      icon: ShoppingCart,
      title: 'E-Commerce',
      description: 'Complete e-commerce solutions with payment integration and inventory management.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Lock,
      title: 'Security',
      description: 'Comprehensive security solutions to protect your digital assets and data.',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      icon: Cpu,
      title: 'AI Integration',
      description: 'Intelligent features powered by machine learning and artificial intelligence.',
      color: 'from-teal-500 to-cyan-500',
    },
  ]

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive software solutions tailored to meet your business needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 card-hover"
              >
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity`} />

                {/* Icon */}
                <div className="relative">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-sm font-semibold">Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-6">
            Don't see what you're looking for?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all hover:scale-105 shadow-lg font-semibold"
          >
            Let's discuss your project
          </a>
        </div>
      </div>
    </section>
  )
}

export default Services
