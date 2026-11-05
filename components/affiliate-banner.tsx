import Link from "next/link"

export function AffiliateBanner() {
  return (
    <Link
      href="/affiliates"
      className="block bg-accent/10 border-b border-accent/20 text-center py-2.5 text-sm text-primary hover:bg-accent/15 transition-colors"
    >
      Content creator? Earn 20% commission recommending Just Protected — join here
    </Link>
  )
}
