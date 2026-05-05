import { useState } from 'react';
import { Onboarding } from './components/Onboarding';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Home } from './components/Home';
import { ProjectInput } from './components/ProjectInput';
import { EstimationResult } from './components/EstimationResult';
import { CostBreakdown } from './components/CostBreakdown';
import { MyProjects } from './components/MyProjects';
import { BillsDocuments } from './components/BillsDocuments';
import { Settings } from './components/Settings';
import { Home as HomeIcon, Calculator, FolderOpen, FileText, Settings as SettingsIcon } from 'lucide-react';
import { Toaster } from './components/ui/sonner';

export type Project = {
  id: string;
  name: string;
  type: string;
  date: string;
  totalCost: number;
  dimensions: {
    length: number;
    breadth: number;
    height: number;
    thickness?: number;
  };
  materials: {
    name: string;
    quantity: number;
    unit: string;
    rate: number;
    cost: number;
  }[];
  location: string;
};

export type Document = {
  id: string;
  title: string;
  date: string;
  projectId: string;
  type: 'bill' | 'document';
  fileType: string;
};

export default function App() {
  const [appState, setAppState] = useState<'onboarding' | 'login' | 'signup' | 'main'>('onboarding');
  const [currentScreen, setCurrentScreen] = useState<'home' | 'input' | 'result' | 'breakdown' | 'projects' | 'bills' | 'settings'>('home');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Residential Building',
      type: 'Building',
      date: '2025-11-10',
      totalCost: 145000,
      dimensions: { length: 20, breadth: 15, height: 3 },
      materials: [
        { name: 'Cement', quantity: 120, unit: 'bags', rate: 450, cost: 54000 },
        { name: 'Sand', quantity: 40, unit: 'm³', rate: 800, cost: 32000 },
        { name: 'Gravel', quantity: 35, unit: 'm³', rate: 900, cost: 31500 },
        { name: 'Steel', quantity: 1500, unit: 'kg', rate: 65, cost: 97500 },
      ],
      location: 'Mumbai',
    },
    {
      id: '2',
      name: 'Compound Wall',
      type: 'Wall',
      date: '2025-11-08',
      totalCost: 68000,
      dimensions: { length: 50, breadth: 0.23, height: 2 },
      materials: [
        { name: 'Bricks', quantity: 5000, unit: 'nos', rate: 8, cost: 40000 },
        { name: 'Cement', quantity: 50, unit: 'bags', rate: 450, cost: 22500 },
        { name: 'Sand', quantity: 8, unit: 'm³', rate: 800, cost: 6400 },
      ],
      location: 'Delhi',
    },
  ]);
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: 'Cement Purchase Bill', date: '2025-11-10', projectId: '1', type: 'bill', fileType: 'PDF' },
    { id: '2', title: 'Steel Invoice', date: '2025-11-09', projectId: '1', type: 'bill', fileType: 'PDF' },
    { id: '3', title: 'Site Plan', date: '2025-11-08', projectId: '2', type: 'document', fileType: 'PDF' },
  ]);

  const handleOnboardingComplete = () => {
    setAppState('login');
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setAppState('main');
  };

  const handleSignup = (email: string) => {
    setUserEmail(email);
    setAppState('main');
  };

  const handleNewEstimate = (project: Project) => {
    setCurrentProject(project);
    setCurrentScreen('result');
  };

  const handleSaveProject = (project: Project) => {
    setProjects([project, ...projects]);
  };

  const handleViewBreakdown = () => {
    setCurrentScreen('breakdown');
  };

  const handleRecalculate = (updatedProject: Project) => {
    setCurrentProject(updatedProject);
    setCurrentScreen('result');
  };

  // Show onboarding flow
  if (appState === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Show login screen
  if (appState === 'login') {
    return (
      <Login
        onLogin={handleLogin}
        onSignup={() => setAppState('signup')}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Show signup screen
  if (appState === 'signup') {
    return (
      <Signup
        onSignup={handleSignup}
        onBackToLogin={() => setAppState('login')}
        isDarkMode={isDarkMode}
      />
    );
  }

  // Main app
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Toaster />
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-gray-900 transition-colors">
        {/* Mobile App Container */}
        <div className="max-w-md mx-auto min-h-screen bg-white dark:bg-gray-800 shadow-xl flex flex-col">
          {/* Content Area */}
          <div className="flex-1 overflow-y-auto pb-20">
            {currentScreen === 'home' && (
              <Home
                projects={projects}
                onNewEstimate={() => setCurrentScreen('input')}
                onMyProjects={() => setCurrentScreen('projects')}
                onSavedBills={() => setCurrentScreen('bills')}
              />
            )}
            {currentScreen === 'input' && (
              <ProjectInput
                onEstimate={handleNewEstimate}
                onBack={() => setCurrentScreen('home')}
              />
            )}
            {currentScreen === 'result' && currentProject && (
              <EstimationResult
                project={currentProject}
                onViewBreakdown={handleViewBreakdown}
                onSaveProject={handleSaveProject}
                onBack={() => setCurrentScreen('input')}
              />
            )}
            {currentScreen === 'breakdown' && currentProject && (
              <CostBreakdown
                project={currentProject}
                onRecalculate={handleRecalculate}
                onBack={() => setCurrentScreen('result')}
              />
            )}
            {currentScreen === 'projects' && (
              <MyProjects
                projects={projects}
                onViewProject={(project) => {
                  setCurrentProject(project);
                  setCurrentScreen('result');
                }}
                onNewProject={() => setCurrentScreen('input')}
              />
            )}
            {currentScreen === 'bills' && (
              <BillsDocuments
                documents={documents}
                projects={projects}
                onAddDocument={() => {}}
              />
            )}
            {currentScreen === 'settings' && (
              <Settings
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode(!isDarkMode)}
              />
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-around items-center h-16">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  currentScreen === 'home' ? 'text-[#1E88E5]' : 'text-gray-500'
                }`}
              >
                <HomeIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Home</span>
              </button>
              <button
                onClick={() => setCurrentScreen('input')}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  currentScreen === 'input' || currentScreen === 'result' || currentScreen === 'breakdown' ? 'text-[#1E88E5]' : 'text-gray-500'
                }`}
              >
                <Calculator className="w-6 h-6" />
                <span className="text-xs mt-1">Estimate</span>
              </button>
              <button
                onClick={() => setCurrentScreen('projects')}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  currentScreen === 'projects' ? 'text-[#1E88E5]' : 'text-gray-500'
                }`}
              >
                <FolderOpen className="w-6 h-6" />
                <span className="text-xs mt-1">Projects</span>
              </button>
              <button
                onClick={() => setCurrentScreen('bills')}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  currentScreen === 'bills' ? 'text-[#1E88E5]' : 'text-gray-500'
                }`}
              >
                <FileText className="w-6 h-6" />
                <span className="text-xs mt-1">Bills</span>
              </button>
              <button
                onClick={() => setCurrentScreen('settings')}
                className={`flex flex-col items-center justify-center flex-1 h-full ${
                  currentScreen === 'settings' ? 'text-[#1E88E5]' : 'text-gray-500'
                }`}
              >
                <SettingsIcon className="w-6 h-6" />
                <span className="text-xs mt-1">Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}