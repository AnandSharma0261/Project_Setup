// User Types
export interface User {
  id: string
  name: string
  email: string
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface LoadingState {
  isLoading: boolean
  error: string | null
}

// Routing Types
export const LayoutType = {
  FULL_PAGE: 'full-page',
  STANDARD: 'standard',
  MINIMAL: 'minimal',
  DASHBOARD: 'dashboard'
} as const

export type LayoutType = typeof LayoutType[keyof typeof LayoutType]

export interface RouteConfig {
  path: string
  component: string
  layout: LayoutType
  title?: string
  description?: string
  protected?: boolean
  exact?: boolean
  showInNav?: boolean
  navLabel?: string
  icon?: string
  order?: number
}

export interface NavigationItem {
  path: string
  label: string
  icon?: string
  order: number
  children?: NavigationItem[]
}

export interface RouteMetadata {
  title: string
  description?: string
  breadcrumbs?: Array<{
    label: string
    path?: string
  }>
}

// Dashboard Types
export interface DashboardMetrics {
  totalUsers: number
  totalReviewers: number
  totalAuditors: number
  totalOrganizations: number
  totalAudits: number
  completed: number
  inProgress: number
  pendingReview: number
  auditsChange: number
  completedChange: number
  progressChange: number
  reviewChange: number
}

export interface AuditorStatus {
  autoSubmitted: number
  approvalInProgress: number
  approved: number
  approvalPending: number
}

export interface ReviewerStatus {
  autoSubmitted: number
  approvalInProgress: number
  approved: number
  approvalPending: number
}

export interface AutoSubmissionStatus {
  reviewed: number
  completed: number
  pending: number
  alloted: number
}

export interface AuditData {
  id: number
  dealerCode: string
  dealerName: string
  auditorStatus: 'Completed' | 'Yet to Start' | 'In Progress'
  reviewerStatus: 'In Progress' | 'Approval Pending' | 'Yet to Start'
  score: number
  actionPlanOpen: number
  actionPlanClosed: number
  actionPlanSummary: string
}

export interface DashboardFilters {
  department: string
  region: string
  country: string
}

export interface DashboardState {
  metrics: DashboardMetrics
  filters: DashboardFilters
  loading: boolean
  error: string | null
  sidebarOpen: boolean
  auditorStatus: AuditorStatus
  reviewerStatus: ReviewerStatus
  autoSubmissionStatus: AutoSubmissionStatus
  auditsData: AuditData[]
}

// All types and enums are already exported above