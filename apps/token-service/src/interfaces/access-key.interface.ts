export interface SaveAccessKeyInterface {
  accessKey: string;
  expiryDate: string;
  rateLimitPerMinute: number;
  isEnabled: boolean;
}

export interface DeleteAccessKeyInterface {
  accessKey: string;
}

export interface FetchRateLimitLogsInterface {
  accessKey: string;
  requestedAt: any;
}
