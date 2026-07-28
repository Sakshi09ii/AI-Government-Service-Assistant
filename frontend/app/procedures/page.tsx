'use client'

import { useState } from 'react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { ProcedureCard } from '@/components/procedure-card'
import { X } from 'lucide-react'

const procedures = [
  {
    icon: '🛂',
    title: 'Passport',
    description: 'Apply for a new Indian passport or renew existing one',
    steps: 8,
    details: {
      overview: 'Indian passport is an official document that grants you entry and exit from India.',
      eligibility: 'Indian citizen by birth, citizenship, or naturalization',
      documents: ['Birth Certificate', 'Address Proof', 'Aadhar Card', 'PAN Card', 'Photos'],
      steps: [
        'Visit PSK (Passport Seva Kendra)',
        'Fill DS-11 form (new) or DS-82 (renewal)',
        'Submit documents and fees',
        'Get appointment confirmation',
        'Attend appointment',
        'Complete police verification',
        'Get dispatch confirmation',
        'Collect passport'
      ],
      fees: '₹1500 (Adult), ₹1000 (Child)',
      timeline: '10-15 days (normal), 3-5 days (tatkaal)'
    }
  },
  {
    icon: '🪪',
    title: 'Aadhaar',
    description: 'Unique 12-digit identity number for Indian residents',
    steps: 5,
    details: {
      overview: 'Aadhaar is a voluntary identity document with biometric data.',
      eligibility: 'Indian resident (any age)',
      documents: ['Birth Certificate (if available)', 'Aadhar reference', 'Mobile number'],
      steps: [
        'Locate nearest Aadhaar center',
        'Fill enrollment form',
        'Provide biometric data',
        'Get enrollment receipt',
        'Receive Aadhaar in mail'
      ],
      fees: 'Free',
      timeline: '90 days'
    }
  },
  {
    icon: '🎫',
    title: 'Driving Licence',
    description: 'Legal permit to drive motor vehicles',
    steps: 6,
    details: {
      overview: 'Driving licence is issued by Regional Transport Office (RTO).',
      eligibility: 'Age 18+ years',
      documents: ['Address Proof', 'Age Proof', 'Aadhar', 'Photos'],
      steps: [
        'Visit RTO office',
        'Fill application form',
        'Undergo theory test',
        'Get learning licence',
        'Undergo driving test',
        'Collect driving licence'
      ],
      fees: '₹200-500',
      timeline: '30-60 days'
    }
  },
  {
    icon: '💼',
    title: 'PAN Card',
    description: 'Permanent Account Number for taxation',
    steps: 4,
    details: {
      overview: 'PAN is a unique 10-digit number for all taxpayers.',
      eligibility: 'Any Indian resident with income',
      documents: ['Aadhar', 'Address Proof', 'Signature'],
      steps: [
        'Fill ITNS 280 form',
        'Submit documents',
        'Get acknowledgment',
        'Receive PAN in mail'
      ],
      fees: 'Free (if Aadhar linked)',
      timeline: '7-21 days'
    }
  },
  {
    icon: '📜',
    title: 'Birth Certificate',
    description: 'Official proof of birth and citizenship',
    steps: 5,
    details: {
      overview: 'Birth certificate is issued by Municipal Corporation.',
      eligibility: 'Newborn registration within 30 days',
      documents: ['Hospital discharge certificate', 'Parents ID proof'],
      steps: [
        'Visit municipal office',
        'Fill registration form',
        'Submit documents',
        'Pay registration fee',
        'Collect certificate'
      ],
      fees: 'Free (within 30 days), ₹5 (late registration)',
      timeline: 'Immediate'
    }
  },
  {
    icon: '🗳️',
    title: 'Voter ID',
    description: 'Identity card and voting eligibility proof',
    steps: 4,
    details: {
      overview: 'Voter ID is issued by Election Commission.',
      eligibility: 'Indian citizen aged 18+',
      documents: ['Aadhar', 'Address Proof', 'Passport'],
      steps: [
        'Visit polling station or apply online',
        'Fill Form-6',
        'Submit documents',
        'Receive Voter ID'
      ],
      fees: 'Free',
      timeline: '7-30 days'
    }
  },
  {
    icon: '📄',
    title: 'Income Certificate',
    description: 'Proof of annual income for various benefits',
    steps: 4,
    details: {
      overview: 'Income certificate is issued by revenue department.',
      eligibility: 'Indian citizen with income',
      documents: ['Aadhar', 'PAN', 'Address Proof', 'Bank statements'],
      steps: [
        'Visit tehsil office',
        'Fill application form',
        'Submit documents',
        'Collect certificate'
      ],
      fees: '₹50-100',
      timeline: '7-10 days'
    }
  },
  {
    icon: '🏠',
    title: 'Domicile Certificate',
    description: 'Proof of residence for a specific area',
    steps: 4,
    details: {
      overview: 'Domicile certificate is issued by revenue department.',
      eligibility: 'Resident for 15+ years',
      documents: ['Aadhar', 'Ration Card', 'Electricity Bill', 'Address Proof'],
      steps: [
        'Visit tehsil or taluka office',
        'Fill application form',
        'Submit documents',
        'Collect certificate'
      ],
      fees: '₹50-100',
      timeline: '5-10 days'
    }
  },
]

export default function ProceduresPage() {
  const [selectedProcedure, setSelectedProcedure] = useState<typeof procedures[0] | null>(null)

  return (
    <LayoutWrapper>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Government Documents & Procedures
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Complete step-by-step guides for all government documents
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {procedures.map((proc) => (
            <ProcedureCard
              key={proc.title}
              icon={proc.icon}
              title={proc.title}
              description={proc.description}
              steps={proc.steps}
              onClick={() => setSelectedProcedure(proc)}
            />
          ))}
        </div>

        {/* Detail Modal */}
        {selectedProcedure && (
          <div className="fixed inset-0 bg-black/50 dark:bg-black/70 z-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 bg-white dark:bg-slate-900 p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                    <span>{selectedProcedure.icon}</span>
                    {selectedProcedure.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedProcedure(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Overview</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedProcedure.details.overview}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Eligibility</h3>
                  <p className="text-slate-600 dark:text-slate-400">{selectedProcedure.details.eligibility}</p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Required Documents</h3>
                  <ul className="space-y-1">
                    {selectedProcedure.details.documents.map((doc) => (
                      <li key={doc} className="text-slate-600 dark:text-slate-400">
                        • {doc}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Steps</h3>
                  <ol className="space-y-2">
                    {selectedProcedure.details.steps.map((step, idx) => (
                      <li key={idx} className="text-slate-600 dark:text-slate-400">
                        {idx + 1}. {step}
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Fees</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedProcedure.details.fees}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Timeline</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      {selectedProcedure.details.timeline}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </LayoutWrapper>
  )
}
