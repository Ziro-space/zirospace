// app/providers.jsx
'use client'
import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }) {
    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
            console.log('PostHog key is not set')
            return
        }
        if (!process.env.NEXT_PUBLIC_POSTHOG_HOST) {
            console.log('PostHog host is not set')
            return
        }
        posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
            api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
            person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
            capture_pageview: false // Disable automatic pageview capture, as we capture manually
        })
    }, [])

return (
    <PHProvider client={posthog}>
        <PostHogPageView />
        {children}
    </PHProvider>
)
}