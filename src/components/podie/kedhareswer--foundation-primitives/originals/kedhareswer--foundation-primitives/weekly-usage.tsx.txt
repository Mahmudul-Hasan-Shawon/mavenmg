"use client"

import FoundationPrimitives from "@/components/ui/foundation-primitives"

export default function Demo() {
  return (
    // w-full matters: 21st centres demos in a flex wrapper, and a flex item left
    // at width:auto shrinks the page to its content.
    <div className="w-full">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-16">
        <FoundationPrimitives />
      </div>
    </div>
  )
}
