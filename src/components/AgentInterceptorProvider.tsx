'use client'

import { useEffect } from 'react'
import { installAgentInterceptor } from '@/lib/agent-fetch-interceptor'

/**
 * Provider that installs the global fetch interceptor for /api/agent calls.
 * Errors are auto-sent to parent iframe via postMessage (no internal modal).
 *
 * Add this to your layout.tsx to enable error detection for ALL agent calls.
 */
export function AgentInterceptorProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Install interceptor on mount - errors auto-sent to parent
    installAgentInterceptor()
  }, [])

  return <>{children}</>
}

export default AgentInterceptorProvider
