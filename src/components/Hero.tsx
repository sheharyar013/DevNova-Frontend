import { ArrowRight, Sparkles, Zap, Code } from 'lucide-react'

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-8 animate-slide-down">
          <Sparkles className="h-4 w-4" />
          <span className="text-sm font-medium">Welcome to the future of software</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
          Transform Your Ideas
          <br />
          <span className="text-gradient">Into Digital Reality</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto animate-fade-in">
          We craft exceptional digital experiences through innovative software solutions
          that drive your business forward.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-slide-up">
          <a
            href="#contact"
            className="group px-8 py-4 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-all flex items-center space-x-2 hover:scale-105 shadow-xl hover:shadow-primary-500/50"
          >
            <span className="font-semibold">Start Your Project</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#portfolio"
            className="px-8 py-4 bg-white text-gray-900 rounded-full hover:bg-gray-50 transition-all border-2 border-gray-200 hover:border-primary-500 hover:scale-105 shadow-lg font-semibold"
          >
            View Our Work
          </a>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-20">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-blue-500 to-primary-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Clean Code
            </h3>
            <p className="text-gray-600 text-sm">
              Well-structured, maintainable code following industry best practices
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Fast Delivery
            </h3>
            <p className="text-gray-600 text-sm">
              Agile development process ensuring quick turnaround times
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all card-hover border border-gray-100">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Innovation
            </h3>
            <p className="text-gray-600 text-sm">
              Cutting-edge technologies and creative problem-solving approaches
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-gray-400 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default Hero
