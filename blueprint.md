# Shadcn/UI and Build Fix Plan

## Overview

This plan outlines the steps to fix the project's build error. The primary issues stem from outdated configurations and problematic CSS rules.

## Plan

1.  **Update `src/app/globals.css` (Completed):**
    *   Removed the old `@import "shadcn/tailwind.css";` line.

2.  **Fix Global CSS Rule (Current Step):**
    *   Remove the `* { @apply border-border outline-ring/50; }` rule from `src/app/globals.css` to resolve the `CssSyntaxError`.

3.  **Final Checks:**
    *   Run `npm run build` to confirm the fix.
    *   Run `npm run lint` to check for any remaining issues.
