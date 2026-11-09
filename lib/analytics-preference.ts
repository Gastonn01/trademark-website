export const ANALYTICS_EXCLUSION_COOKIE = "jp_exclude_analytics"

export function isAnalyticsExcluded() {
  return typeof document !== "undefined" && document.cookie.split(";").some(
    (cookie) => cookie.trim() === `${ANALYTICS_EXCLUSION_COOKIE}=1`,
  )
}
