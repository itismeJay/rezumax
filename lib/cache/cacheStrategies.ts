export const CacheTTL = {
  SHORT:     300,    // 5 min
  MEDIUM:    900,    // 15 min
  LONG:      3600,   // 1 hour
  VERY_LONG: 86400,  // 24 hrs
} as const;

export const CacheStrategy = {
  resume: {
    list: {
      ttl: CacheTTL.SHORT,
      enabled: true,
    },
    single: {
      ttl: CacheTTL.MEDIUM,
      enabled: true,
    },
    recent: {
      ttl: CacheTTL.SHORT,   // 5 min — same as list
      enabled: true,
    },
  },
  user: {
    profile: {
      ttl: CacheTTL.LONG,    // 1 hour — name/email rarely changes
      enabled: true,
    },
    stats: {
      ttl: CacheTTL.SHORT,   // 5 min — updates when resumes change
      enabled: true,
    },
  },
} as const;