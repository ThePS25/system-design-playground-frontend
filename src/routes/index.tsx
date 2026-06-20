import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';
import { ExplorerListPage } from '@/features/architecture-explorer/pages/ExplorerListPage';
import { ExplorerDetailPage } from '@/features/architecture-explorer/pages/ExplorerDetailPage';
import { TrafficSimulatorPage } from '@/features/traffic-simulator/pages/TrafficSimulatorPage';
import { FailureSimulatorPage } from '@/features/failure-simulator/pages/FailureSimulatorPage';
import { ScalingListPage } from '@/features/scaling-evolution/pages/ScalingListPage';
import { ScalingEvolutionPage } from '@/features/scaling-evolution/pages/ScalingEvolutionPage';
import { ChallengeListPage } from '@/features/design-challenge/pages/ChallengeListPage';
import { ChallengeWorkspacePage } from '@/features/design-challenge/pages/ChallengeWorkspacePage';
import { InterviewPrepPage } from '@/features/interview-prep/pages/InterviewPrepPage';
import { InterviewDetailPage } from '@/features/interview-prep/pages/InterviewDetailPage';
import { CostEstimatorPage } from '@/features/cost-estimator/pages/CostEstimatorPage';
import { GlossaryPage } from '@/features/glossary/pages/GlossaryPage';
import { GlossaryCategoryPage } from '@/features/glossary/pages/GlossaryCategoryPage';
import { GlossaryTermPage } from '@/features/glossary/pages/GlossaryTermPage';
import { ROUTES } from './paths';

export const router = createBrowserRouter([
  { path: ROUTES.home, element: <HomePage /> },
  { path: ROUTES.explorer, element: <ExplorerListPage /> },
  { path: '/explorer/:slug', element: <ExplorerDetailPage /> },
  { path: ROUTES.traffic, element: <TrafficSimulatorPage /> },
  { path: ROUTES.failure, element: <FailureSimulatorPage /> },
  { path: ROUTES.scaling, element: <ScalingListPage /> },
  { path: '/scaling/:slug', element: <ScalingEvolutionPage /> },
  { path: ROUTES.challenge, element: <ChallengeListPage /> },
  { path: '/challenge/:slug', element: <ChallengeWorkspacePage /> },
  { path: ROUTES.interview, element: <InterviewPrepPage /> },
  { path: '/interview/:slug', element: <InterviewDetailPage /> },
  { path: ROUTES.glossary, element: <GlossaryPage /> },
  { path: '/glossary/:category', element: <GlossaryCategoryPage /> },
  { path: '/glossary/:category/:slug', element: <GlossaryTermPage /> },
  { path: ROUTES.cost, element: <CostEstimatorPage /> },
]);
