'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { SchemeCard } from '@/components/scheme-card'
import { Search, Filter } from 'lucide-react'

const schemes = [
  {
    name: 'PM-JAY Ayushman Bharat',
    category: 'Healthcare',
    description: 'Health insurance coverage up to ₹5 lakh per family per year',
    eligibility: ['Income below certain limit', 'SECC database beneficiary', 'Unorganized workers'],
    benefits: ['Free hospitalization', 'Cashless treatment', 'No copay'],
  },
  {
    name: 'PMAY Housing',
    category: 'Housing',
    description: 'Affordable housing scheme for low-income groups',
    eligibility: ['Annual income below ₹18 lakh', 'No existing pucca house', 'Indian citizen'],
    benefits: ['Loan assistance up to ₹9 lakh', 'Subsidized interest rates', 'Tax exemption'],
  },
  {
    name: 'PM-KISAN',
    category: 'Agriculture',
    description: 'Direct income support to farmers',
    eligibility: ['Agricultural landholders', 'Indian citizen', 'Less than 2 hectares'],
    benefits: ['₹6000 per year', 'Transferred directly to bank', 'Three installments'],
  },
  {
    name: 'MGNREGA',
    category: 'Employment',
    description: 'Guarantee employment for rural households',
    eligibility: ['Rural resident', '18+ years', 'Willing to work'],
    benefits: ['100 days employment', 'Minimum wage guarantee', 'Social security benefits'],
  },
  {
    name: 'Pradhan Mantri Mudra Loan',
    category: 'Finance',
    description: 'Loan scheme for small businesses and entrepreneurs',
    eligibility: ['Age 18+', 'Income below certain limit', 'Business registered'],
    benefits: ['Loan up to ₹10 lakh', 'Zero collateral', 'Flexible repayment'],
  },
  {
    name: 'Jan Dhan Yojana',
    category: 'Banking',
    description: 'Universal financial inclusion scheme',
    eligibility: ['Indian citizen', 'Age 18+', 'Any income'],
    benefits: ['Free bank account', 'Insurance coverage', 'Overdraft facility'],
  },
  {
    name: 'Kanya Sumangala Yojana',
    category: 'Education',
    description: 'Support for girl child education',
    eligibility: ['Girl child', 'Family income below limit', 'Registered in Uttar Pradesh'],
    benefits: ['Direct cash transfer', 'Education support', 'Up to ₹15000'],
  },
  {
    name: 'PMJDY Education Loan',
    category: 'Education',
    description: 'Education loan scheme for meritorious students',
    eligibility: ['Students with merit', 'Low-income family', 'Enrolled in institution'],
    benefits: ['Loan up to ₹7.5 lakh', 'Moratorium period', 'Easy repayment'],
  },
]

const categories = ['All', ...new Set(schemes.map((s) => s.category))]

export default function SchemesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesCategory = selectedCategory === 'All' || scheme.category === selectedCategory
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Government Schemes
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Explore and discover government schemes matching your eligibility
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="flex gap-3 bg-slate-100 dark:bg-slate-900 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-slate-500 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-sm text-slate-600 dark:text-slate-400">
          Showing {filteredSchemes.length} of {schemes.length} schemes
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.name}
              name={scheme.name}
              category={scheme.category}
              description={scheme.description}
              eligibility={scheme.eligibility}
              benefits={scheme.benefits}
              onClick={() => alert(`Viewing details for ${scheme.name}`)}
            />
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 dark:text-slate-400 text-lg">
              No schemes found matching your search.
            </p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All')
              }}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
