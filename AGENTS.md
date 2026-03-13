# AGENTS.md — Next.js Landing Page & CMS

This file is the **source of truth** for all AI agents and developers working on this project. Read it in full before writing any code, making any architectural decisions, or responding to prompts. Instructions here take precedence over general training knowledge.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Coding Standards](#coding-standards)
- [React & Next.js Conventions](#react--nextjs-conventions)
- [API Integration (Go Backend)](#api-integration-go-backend)
- [Comments & Documentation](#comments--documentation)
- [Error Handling](#error-handling)
- [Testing](#testing)
- [Security](#security)
- [Styling](#styling)
- [Performance](#performance)
- [Deployment](#deployment)
- [Common Pitfalls](#common-pitfalls)

---

## Project Overview

This is the **public-facing landing page and content management system (CMS)** for a mobile chat application. It is a standalone Next.js application that:

- Markets the chat application to potential users
- Allows admins to manage landing page content without touching code
- Communicates with an existing **Go backend** via REST API
- Has no authentication on the public side — only the admin panel requires auth

**Two sides of the system:**

| Side | Description | Auth Required |
|------|-------------|---------------|
| Public website | Landing page, features, pricing, blog | ❌ No |
| Admin panel (`/admin`) | CMS editor, settings, media manager | ✅ Yes |

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js (App Router) | 15.x |
| Language | TypeScript | 5.x |
| Styling | Tailwind CSS | 3.x |
| Component Library | shadcn/ui | Latest |
| Animations | Framer Motion | 11.x |
| Server State | TanStack Query (React Query) | 5.x |
| Client State | Zustand | 4.x |
| Forms | React Hook Form + Zod | Latest |
| HTTP Client | Axios | 1.x |
| Icons | Lucide React | Latest |
| Font | next/font (Inter + display font) | Built-in |
| Package Manager | pnpm | Latest |
| Testing (Unit) | Vitest + React Testing Library | Latest |
| Testing (E2E) | Playwright | Latest |
| Linting | ESLint + Prettier | Latest |

---

## Project Structure

```
chat-app-landing/
├── app/                          # Next.js App Router
│   ├── (public)/                 # Public routes (no auth)
│   │   ├── page.tsx              # Landing page (/)
│   │   ├── pricing/page.tsx      # Pricing page
│   │   ├── features/page.tsx     # Features page
│   │   ├── blog/
│   │   │   ├── page.tsx          # Blog index
│   │   │   └── [slug]/page.tsx   # Blog post detail
│   │   └── layout.tsx            # Public layout (nav + footer)
│   ├── (admin)/                  # Admin panel routes (auth required)
│   │   ├── admin/
│   │   │   ├── page.tsx          # Admin dashboard
│   │   │   ├── content/          # Content editor pages
│   │   │   ├── media/            # Media manager
│   │   │   └── settings/         # Site settings
│   │   └── layout.tsx            # Admin layout (sidebar)
│   ├── api/                      # Next.js API routes (proxy/BFF layer)
│   │   └── [...]/route.ts
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
│
├── components/
│   ├── ui/                       # shadcn/ui primitives (do not edit)
│   ├── sections/                 # Landing page sections
│   │   ├── HeroSection.tsx
│   │   ├── FeaturesSection.tsx
│   │   ├── PricingSection.tsx
│   │   ├── TestimonialsSection.tsx
│   │   └── CTASection.tsx
│   ├── layout/                   # Shared layout components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── AdminSidebar.tsx
│   └── shared/                   # Reusable generic components
│
├── lib/
│   ├── api/                      # API client functions (Go backend)
│   │   ├── client.ts             # Axios instance + interceptors
│   │   ├── content.ts
│   │   └── auth.ts
│   ├── hooks/                    # Custom React hooks
│   ├── store/                    # Zustand stores
│   ├── utils/                    # Pure utility functions
│   └── validations/              # Zod schemas
│
├── types/                        # Global TypeScript type definitions
│   ├── api.ts                    # API response shapes
│   ├── content.ts                # CMS content types
│   └── index.ts
│
├── public/                       # Static assets
│   ├── images/
│   └── fonts/
│
├── tests/
│   ├── unit/                     # Vitest unit tests
│   └── e2e/                      # Playwright E2E tests
│
├── AGENTS.md                     # ⬅ This file
├── .env.local                    # Local environment variables (never commit)
├── .env.example                  # Template for required env vars
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── vitest.config.ts
```

---

## Coding Standards

### TypeScript

**Always use strict TypeScript. No `any`, no implicit types.**

```typescript
// ✅ DO: Explicit types, interface-driven design
interface HeroContent {
  headline: string;
  subheadline: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  backgroundImage?: string;
}

async function getHeroContent(): Promise<HeroContent> {
  // implementation
}

// ❌ DON'T: Implicit or loose types
async function getHeroContent() {
  return await fetch('/api/content').then(r => r.json()); // returns any
}
```

**Use `type` for unions/intersections, `interface` for object shapes:**

```typescript
// ✅ Type for unions
type ContentStatus = 'draft' | 'published' | 'archived';

// ✅ Interface for object shapes
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  status: ContentStatus;
  publishedAt: Date | null;
}
```

### File Naming

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Hooks | camelCase with `use` prefix | `usePageContent.ts` |
| Utilities | camelCase | `formatDate.ts` |
| Types | camelCase | `content.ts` |
| Stores | camelCase | `useAuthStore.ts` |
| API files | camelCase | `content.ts` |
| Pages (App Router) | lowercase | `page.tsx`, `layout.tsx` |

---

## React & Next.js Conventions

### Component Structure

```typescript
// ✅ DO: Typed props, explicit return type, named export
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  variant?: 'default' | 'highlighted';
}

export function FeatureCard({
  icon,
  title,
  description,
  variant = 'default',
}: FeatureCardProps): JSX.Element {
  return (
    <div className={cn('rounded-xl p-6', variant === 'highlighted' && 'ring-2 ring-primary')}>
      {icon}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

// ❌ DON'T: Untyped props, default export for non-page components
export default function FeatureCard({ icon, title, description }) {
  return <div>{title}</div>;
}
```

**Default exports are reserved for Next.js pages and layouts only.**

### Server vs Client Components

```typescript
// app/(public)/page.tsx
// ✅ Server Component by default — fetch data at the top level
export default async function LandingPage() {
  const [heroContent, features, testimonials] = await Promise.all([
    getHeroContent(),
    getFeatures(),
    getTestimonials(),
  ]);

  return (
    <>
      <HeroSection data={heroContent} />
      <FeaturesSection data={features} />
      <TestimonialsSection data={testimonials} />
    </>
  );
}

// components/sections/TestimonialsSection.tsx
// ✅ Client Component only when interactivity is required
'use client';

import { useState } from 'react';

interface TestimonialsSectionProps {
  data: Testimonial[];
}

export function TestimonialsSection({ data }: TestimonialsSectionProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  // carousel logic
}
```

**Rules for `'use client'`:**
- Add it only when the component uses `useState`, `useEffect`, browser APIs, or event listeners
- Push client boundaries as deep into the tree as possible
- Never add `'use client'` to a layout or page that can remain a Server Component

### Metadata & SEO

```typescript
// app/(public)/page.tsx
import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    openGraph: {
      title: settings.metaTitle,
      description: settings.metaDescription,
      images: [{ url: settings.ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: settings.metaTitle,
      description: settings.metaDescription,
    },
  };
}
```

---

## API Integration (Go Backend)

**All API calls go through a shared Axios instance in `lib/api/client.ts`. Never use raw `fetch` in components.**

### Axios Client Setup

```typescript
// lib/api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach auth token for admin routes
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken(); // from cookie or storage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralised error handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Attempt token refresh or redirect to login
      await handleUnauthorized();
    }
    return Promise.reject(error);
  },
);
```

### API Functions

```typescript
// lib/api/content.ts
import { apiClient } from './client';
import type { PageContent, SiteSettings } from '@/types/content';

/**
 * Fetch CMS content for a specific page section
 * 
 * @param section - The page section identifier (e.g., "hero", "features")
 * @returns Parsed page content from the Go backend
 * @throws AxiosError if the request fails or section is not found
 */
export async function getPageContent(section: string): Promise<PageContent> {
  const { data } = await apiClient.get<PageContent>(`/content/${section}`);
  return data;
}

export async function updatePageContent(
  section: string,
  payload: Partial<PageContent>,
): Promise<PageContent> {
  const { data } = await apiClient.patch<PageContent>(`/content/${section}`, payload);
  return data;
}
```

### TanStack Query for Client-Side Fetching

```typescript
// Use in admin panel components (client-side)
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPageContent, updatePageContent } from '@/lib/api/content';

export function usePageContent(section: string) {
  return useQuery({
    queryKey: ['content', section],
    queryFn: () => getPageContent(section),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useUpdatePageContent(section: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<PageContent>) => updatePageContent(section, payload),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['content', section] });
    },
  });
}
```

---

## Comments & Documentation

**JSDoc blocks for all exported functions and complex hooks:**

```typescript
/**
 * Smoothly scrolls to a section on the landing page.
 * Used by the navbar CTA buttons.
 *
 * @param sectionId - The HTML id of the target section
 * @param offset - Additional pixel offset from the top (default: 80px for fixed navbar)
 */
export function scrollToSection(sectionId: string, offset: number = 80): void {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}
```

**Inline comments explain WHY, never WHAT:**

```typescript
// ✅ DO: Explain intent
// Revalidate every 60s so content editors see changes without a full redeploy
export const revalidate = 60;

// ❌ DON'T: Describe what the code obviously does
// Set revalidate to 60
export const revalidate = 60;
```

---

## Error Handling

**Use typed error boundaries and consistent API error shapes:**

```typescript
// ✅ DO: Handle errors explicitly in API functions
export async function getPageContent(section: string): Promise<PageContent> {
  try {
    const { data } = await apiClient.get<PageContent>(`/content/${section}`);
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        throw new ContentNotFoundError(`Section "${section}" not found`);
      }
    }
    throw error;
  }
}

// Custom error classes
export class ContentNotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ContentNotFoundError';
  }
}
```

**Error UI in components:**

```typescript
// ✅ DO: Graceful degradation — public pages must never show blank/broken state
export function FeaturesSection({ data }: { data: Feature[] | null }) {
  if (!data || data.length === 0) {
    // Return a static fallback rather than crashing
    return <FeaturesSectionFallback />;
  }

  return (/* ... */);
}
```

---

## Testing

**CRITICAL: Every feature must have corresponding tests.**

### Unit Tests (Vitest + React Testing Library)

```typescript
// tests/unit/components/HeroSection.test.tsx
import { render, screen } from '@testing-library/react';
import { HeroSection } from '@/components/sections/HeroSection';
import { mockHeroContent } from '@/tests/mocks/content.mock';

describe('HeroSection', () => {
  it('renders headline from content data', () => {
    render(<HeroSection data={mockHeroContent} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      mockHeroContent.headline,
    );
  });

  it('renders primary CTA button with correct href', () => {
    render(<HeroSection data={mockHeroContent} />);
    const cta = screen.getByRole('link', { name: mockHeroContent.ctaPrimary.label });
    expect(cta).toHaveAttribute('href', mockHeroContent.ctaPrimary.href);
  });

  it('does not render secondary CTA when not provided', () => {
    const data = { ...mockHeroContent, ctaSecondary: undefined };
    render(<HeroSection data={data} />);
    expect(screen.queryByTestId('cta-secondary')).not.toBeInTheDocument();
  });
});
```

### Mock Factories

```typescript
// tests/mocks/content.mock.ts
import type { HeroContent, Feature } from '@/types/content';

export const mockHeroContent: HeroContent = {
  headline: 'The Chat App Built for Teams',
  subheadline: 'Fast, secure, and ridiculously easy to use.',
  ctaPrimary: { label: 'Get Started Free', href: '/download' },
  ctaSecondary: { label: 'See How It Works', href: '#features' },
  backgroundImage: '/images/hero-bg.jpg',
};

export function createMockFeature(overrides?: Partial<Feature>): Feature {
  return {
    id: 'feature-1',
    icon: 'MessageCircle',
    title: 'Real-Time Messaging',
    description: 'Send messages instantly with sub-100ms delivery.',
    ...overrides,
  };
}
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/landing.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Landing Page', () => {
  test('hero section is visible and CTA navigates correctly', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByTestId('cta-primary')).toBeVisible();

    await page.getByTestId('cta-primary').click();
    await expect(page).toHaveURL(/\/download/);
  });

  test('navbar links scroll to correct sections', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Features' }).click();
    await expect(page.getByTestId('features-section')).toBeInViewport();
  });
});

test.describe('Admin CMS', () => {
  test.use({ storageState: 'tests/e2e/.auth/admin.json' });

  test('admin can update hero headline', async ({ page }) => {
    await page.goto('/admin/content/hero');
    await page.getByLabel('Headline').fill('Updated Headline');
    await page.getByRole('button', { name: 'Save Changes' }).click();
    await expect(page.getByText('Changes saved')).toBeVisible();
  });
});
```

### Coverage Requirements

- **Minimum 80%** coverage on all utility functions and hooks
- **100% coverage** on all form validation schemas (Zod)
- **All happy paths** tested for every public-facing section
- **All error/empty states** tested for every component that fetches data

---

## Security

### Authentication (Admin Panel Only)

```typescript
// middleware.ts — protect all /admin routes
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');

  if (request.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
```

### Environment Variables

```typescript
// ✅ DO: Use a validated config object — never access process.env directly in components
// lib/config.ts
const envSchema = z.object({
  apiUrl: z.string().url(),
  nextPublicAppUrl: z.string().url(),
});

export const config = envSchema.parse({
  apiUrl: process.env.API_URL,
  nextPublicAppUrl: process.env.NEXT_PUBLIC_APP_URL,
});

// ❌ DON'T: Raw process.env access
const url = process.env.API_URL; // no validation, no type safety
```

### Input Sanitization (CMS Forms)

```typescript
// ✅ DO: Validate all admin form inputs with Zod before sending to backend
const updateHeroSchema = z.object({
  headline: z.string().min(10).max(100).trim(),
  subheadline: z.string().min(10).max(200).trim(),
  ctaPrimaryLabel: z.string().min(2).max(40).trim(),
  ctaPrimaryHref: z.string().url().or(z.string().startsWith('/')),
});
```

### Rate Limiting (Contact/Download Forms)

- Implement rate limiting on all public form submission API routes
- Use the Go backend's rate limiting where possible
- Add client-side debouncing on submit buttons

---

## Styling

### Tailwind Conventions

```typescript
// ✅ DO: Use design system tokens defined in tailwind.config.ts
<section className="bg-background py-24 md:py-32">
  <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
    Features
  </h2>
</section>

// ✅ DO: Use cn() utility for conditional classes
import { cn } from '@/lib/utils';

<button className={cn(
  'rounded-lg px-6 py-3 font-semibold transition-colors',
  variant === 'primary' && 'bg-primary text-primary-foreground hover:bg-primary/90',
  variant === 'outline' && 'border border-border bg-background hover:bg-accent',
)}>

// ❌ DON'T: Arbitrary values without documented reason
<div className="mt-[13px] px-[7px]">  {/* Use mt-3 px-2 instead */}
```

### Component Variants with `cva`

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const sectionVariants = cva('w-full px-4 md:px-8', {
  variants: {
    background: {
      default: 'bg-background',
      muted: 'bg-muted',
      primary: 'bg-primary text-primary-foreground',
    },
    padding: {
      sm: 'py-12',
      md: 'py-20',
      lg: 'py-28 md:py-36',
    },
  },
  defaultVariants: {
    background: 'default',
    padding: 'md',
  },
});
```

### Mobile-First Design

All sections must be **fully responsive**. Design mobile-first:

```typescript
// ✅ DO: Mobile-first breakpoints
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

// ❌ DON'T: Desktop-first overrides
<div className="grid grid-cols-3 gap-6 sm:grid-cols-1">
```

---

## Performance

### Next.js Image Optimization

```typescript
import Image from 'next/image';

// ✅ DO: Always use next/image with explicit dimensions
<Image
  src={hero.backgroundImage}
  alt="Hero background"
  width={1920}
  height={1080}
  priority                     // LCP images get priority
  className="object-cover"
  placeholder="blur"
  blurDataURL={hero.blurHash}  // Use blur placeholder
/>

// ❌ DON'T: Raw <img> tags
<img src={hero.backgroundImage} alt="Hero" />
```

### Code Splitting

```typescript
// Lazy-load heavy sections that are below the fold
import dynamic from 'next/dynamic';

const TestimonialsCarousel = dynamic(
  () => import('@/components/sections/TestimonialsCarousel'),
  { loading: () => <TestimonialsSkeleton /> },
);
```

### Caching Strategy

```typescript
// app/(public)/page.tsx
// Revalidate ISR pages every 60 seconds
export const revalidate = 60;

// For static content that rarely changes, use full static generation
export const revalidate = false; // or `export const dynamic = 'force-static'`
```

---

## Deployment

### Environment Variables

```bash
# .env.example — commit this file
NEXT_PUBLIC_APP_URL=https://your-app.com
NEXT_PUBLIC_API_URL=https://api.your-app.com

# Server-only (never NEXT_PUBLIC prefix for secrets)
API_SECRET_KEY=
JWT_SECRET=
ADMIN_EMAIL=
```

### Docker

```dockerfile
FROM node:22-alpine AS base
RUN corepack enable pnpm

FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "server.js"]
```

### Health Check

```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version,
  });
}
```

---

## Common Pitfalls

### 1. Hydration Mismatch
**Error:** `Text content did not match`  
**Solution:** Avoid rendering time-based or browser-only values on the server without a `useEffect` or `suppressHydrationWarning`.

### 2. Missing `'use client'` on Interactive Components
**Error:** `useState` / `useEffect` called in a Server Component  
**Solution:** Add `'use client'` to the component. If the parent is a Server Component, extract only the interactive part into a separate client component.

### 3. Environment Variable Not Available Client-Side
**Error:** `undefined` for `process.env.SOME_VAR` in the browser  
**Solution:** Variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

### 4. Stale CMS Content After Admin Update
**Error:** Public page still shows old content after admin saves  
**Solution:** Call `revalidatePath()` or use the Go backend to trigger `On-Demand Revalidation` via `fetch('/api/revalidate', ...)`.

### 5. Large Bundle from Framer Motion
**Error:** First load JS is too large  
**Solution:** Import only the specific Framer Motion submodules you need (`motion/react` in v11+), and lazy-load animation-heavy sections.

### 6. Admin Routes Accessible Without Auth
**Error:** `/admin` pages accessible without a token  
**Solution:** Ensure `middleware.ts` is correctly configured and the matcher covers all admin paths.

---

## Additional Resources

- **Next.js Documentation:** https://nextjs.org/docs
- **TanStack Query:** https://tanstack.com/query
- **shadcn/ui:** https://ui.shadcn.com
- **Framer Motion:** https://motion.dev
- **Zod:** https://zod.dev
- **Playwright:** https://playwright.dev
- **Vitest:** https://vitest.dev

---

*Keep this file updated as the project evolves. Any architectural decision that deviates from this guide must be documented here with a rationale.*