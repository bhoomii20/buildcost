import { useState } from 'react';
import { Button } from './ui/button';
import { ChevronRight, Calculator, FolderOpen, FileText, HardHat } from 'lucide-react';
import { motion } from 'motion/react';

type OnboardingProps = {
  onComplete: () => void;
};

const slides = [
  {
    title: 'Welcome to BuildCost',
    description: 'Your all-in-one digital construction assistant for estimating costs and managing projects',
    icon: HardHat,
    color: '#1E88E5',
  },
  {
    title: 'Estimate Materials',
    description: 'Calculate required quantities and costs for cement, sand, steel, bricks, and more in seconds',
    icon: Calculator,
    color: '#FBC02D',
  },
  {
    title: 'Manage Projects',
    description: 'Save all your estimates, track project costs, and access them anytime, anywhere',
    icon: FolderOpen,
    color: '#43A047',
  },
  {
    title: 'Organize Documents',
    description: 'Store bills, invoices, and documents in one secure place, linked to your projects',
    icon: FileText,
    color: '#E53935',
  },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1E88E5] to-[#1976D2] flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full flex flex-col items-center justify-center">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center w-full text-center"
        >
          {/* Icon */}
          <div className="mb-6 sm:mb-8 flex justify-center w-full">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto">
              <Icon className="w-12 h-12 sm:w-16 sm:h-16" style={{ color: slide.color }} />
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center w-full">
            <h2 className="text-gray-800 mb-3 sm:mb-4 text-center">{slide.title}</h2>
            <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base text-center">{slide.description}</p>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mb-6 sm:mb-8 w-full">
              {slides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-[#1E88E5]'
                      : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 w-full">
              {currentSlide < slides.length - 1 && (
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="flex-1 h-11 sm:h-12 text-sm sm:text-base"
                >
                  Skip
                </Button>
              )}
              <Button
                onClick={handleNext}
                className="flex-1 h-11 sm:h-12 bg-[#1E88E5] hover:bg-[#1976D2] text-white text-sm sm:text-base"
              >
                {currentSlide < slides.length - 1 ? (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                  </>
                ) : (
                  'Get Started'
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}