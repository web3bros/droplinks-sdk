export interface DropLink {
  id: number;
  claimCode: string;
  publicAddress: string;
  locked: boolean;
  claimLink: string;
  campaignId: number | null;
  claimed: boolean;
}

interface ExtraClaimerInfo {
  email: string;
}

export interface DropLinkClaim {
  id: number;
  claimedAt: string;
  claimedByAccount: string;
  dropLinkId: number;
  claimLink: string;
  extraClaimerInfo?: ExtraClaimerInfo;
}

export interface NewDropLinkOptions {
  campaign: string;
  locked: false;
}

export interface DropLinksSearchOptions {
  campaignId?: number;
  claimed?: boolean;
  after?: number;
}
