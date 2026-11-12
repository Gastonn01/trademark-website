import type { Ref } from "react"

type SpamGuardFieldsProps = {
  startedAt: number
  hpRef?: Ref<HTMLInputElement>
}

// Off-screen honeypot plus the render timestamp. The wrapper is zero-size so
// it does not change layout; the input itself is positioned off-screen rather
// than display:none, which automated fillers still complete.
export function SpamGuardFields({ startedAt, hpRef }: SpamGuardFieldsProps) {
  return (
    <div aria-hidden="true" className="absolute h-0 w-0 overflow-hidden">
      <input
        ref={hpRef}
        type="text"
        name="hp"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        defaultValue=""
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      <input type="hidden" name="startedAt" value={startedAt} />
    </div>
  )
}
