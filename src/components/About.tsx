import { Users, Target, Award, TrendingUp, CheckCircle2 } from 'lucide-react'

const About = () => {
  const stats = [
    { number: '150+', label: 'Projects Completed' },
    { number: '50+', label: 'Happy Clients' },
    { number: '8+', label: 'Years Experience' },
    { number: '25+', label: 'Team Members' },
  ]

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'We are committed to delivering solutions that exceed expectations and drive real business value.',
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Your success is our success. We work closely with you every step of the way.',
    },
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality, ensuring every project meets the highest standards.',
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We stay ahead of the curve, leveraging the latest technologies and methodologies.',
    },
  ]

  const whyChooseUs = [
    'Expert team with diverse technical skills',
    'Proven track record of successful projects',
    'Agile development methodology',
    'Transparent communication throughout',
    '24/7 support and maintenance',
    'Competitive pricing with no hidden costs',
  ]

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-gradient">DevNova</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are a team of passionate developers, designers, and strategists dedicated to
            transforming your vision into reality through innovative software solutions.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 border border-primary-100"
            >
              <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Our Story
            </h3>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Founded in 2016, DevNova has grown from a small startup to a trusted software
              development partner for businesses worldwide. Our journey has been driven by a
              simple belief: technology should empower businesses, not complicate them.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Today, we work with startups, SMEs, and enterprises across various industries,
              helping them navigate digital transformation and achieve their business goals
              through custom software solutions.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our team combines technical expertise with creative thinking to deliver
              solutions that are not only functional but also beautiful and user-friendly.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop"
                alt="Team collaboration"
                className="rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=400&fit=crop"
                alt="Team meeting"
                className="rounded-2xl shadow-lg mt-8"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary-500 rounded-full blur-3xl opacity-20" />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Our Values
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all card-hover"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-blue-600 rounded-xl mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">
                Why Choose DevNova?
              </h3>
              <p className="text-gray-300 mb-8">
                We combine technical excellence with business acumen to deliver solutions
                that truly make a difference. Here's what sets us apart:
              </p>
              <div className="grid gap-4">
                {whyChooseUs.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle2 className="h-6 w-6 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Code Quality</span>
                    <span className="text-white font-bold">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '98%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Client Satisfaction</span>
                    <span className="text-white font-bold">99%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full" style={{ width: '99%' }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">On-Time Delivery</span>
                    <span className="text-white font-bold">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-500 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
