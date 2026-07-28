'use client'

import Link from 'next/link'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { FeatureCard } from '@/components/feature-card'
import { Button } from '@/components/ui/button'
import {
  Zap, CheckCircle, FileCheck, BookOpen, Globe,
  Lock, Search, ArrowRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                Your AI Government <span className="text-blue-600 dark:text-blue-400">Service Assistant</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                Get instant help regarding government schemes, documents, certificates, eligibility checks, application processes and much more. Your trusted companion for all government services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat">
                  <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-semibold flex items-center justify-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Start Chat
                  </Button>
                </Link>
                <Link href="/schemes">
                  <Button variant="outline" className="w-full sm:w-auto px-8 py-3 text-base font-semibold flex items-center justify-center gap-2">
                    Explore Schemes
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative h-96 rounded-2xl bg-gradient-to-br from-blue-500/10 to-green-500/10 dark:from-blue-500/5 dark:to-green-500/5 border border-blue-200 dark:border-blue-900/30 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="space-y-4 text-center">
                  <div className="text-6xl">🤖</div>
                  <div className="text-4xl">💼</div>
                  <div className="text-4xl">📋</div>
                </div>
              </div>
              {/* Animated background elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-300 dark:bg-blue-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-300 dark:bg-green-900 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-16">
          <div className="mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-2">
              What We Offer
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Complete assistance for all your government service needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={Search}
              title="Government Schemes"
              description="Find and learn about all available government schemes matching your eligibility"
              onClick={() => window.location.href = '/schemes'}
            />
            <FeatureCard
              icon={CheckCircle}
              title="Eligibility Checker"
              description="Instantly check if you qualify for various schemes and benefits"
              onClick={() => window.location.href = '/chat'}
            />
            <FeatureCard
              icon={FileCheck}
              title="Document Checklist"
              description="Get complete list of required documents for every procedure"
              onClick={() => window.location.href = '/chat'}
            />
            <FeatureCard
              icon={BookOpen}
              title="Application Guide"
              description="Step-by-step guidance on how to apply for any service"
              onClick={() => window.location.href = '/chat'}
            />
            <FeatureCard
              icon={Zap}
              title="Smart Search"
              description="Powerful AI-powered search to find exactly what you need"
              onClick={() => window.location.href = '/chat'}
            />
            <FeatureCard
              icon={Globe}
              title="Multilingual Support"
              description="Get assistance in Hindi, Marathi, Tamil, Telugu, Kannada and more"
              onClick={() => window.location.href = '/chat'}
            />
            <FeatureCard
              icon={Lock}
              title="Secure & Private"
              description="Your data is protected with enterprise-grade security"
            />
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Government Schemes', value: '500+' },
              { label: 'Documents Covered', value: '50+' },
              { label: 'Languages', value: '10+' },
              { label: 'Citizens Helped', value: '100K+' },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-slate-200 dark:border-slate-700 text-center"
              >
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {stat.value}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-900 dark:to-blue-700 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Help?
            </h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Start chatting with our AI assistant today to get instant answers about any government service, scheme, or document.
            </p>
            <Link href="/chat">
              <Button className="bg-white text-blue-600 hover:bg-slate-100 px-8 py-3 text-base font-semibold">
                Start Now
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </LayoutWrapper>
  )
}

// Re-export MessageSquare since it wasn't imported
import { MessageSquare } from 'lucide-react'
