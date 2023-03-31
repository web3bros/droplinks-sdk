import {
  DropLink,
  DropLinkClaim,
  DropLinksSearchOptions,
  NewDropLinkOptions,
} from "./types";
import axios from "axios";

export class DropLinks {
  private static apiKey: string;
  private static apiUrl: string = "https://droplinks.io/api/v1";

  public static init(apiKey: string) {
    DropLinks.apiKey = apiKey;
    return this;
  }

  private static async request(
    method: string,
    url: string,
    data: object | undefined = undefined,
    params: object | undefined = undefined
  ): Promise<any> {
    return axios({
      method,
      url: `${this.apiUrl}${url}`,
      data,
      params,
      headers: {
        "X-API-KEY": this.apiKey,
      },
    })
      .then((response) => response.data)
      .catch((error) => {
        console.error(
          `droplinks.io returned ${error.response.status}: ${
            error.response?.data?.error || error.response.statusText
          }`
        );
        throw error;
      });
  }

  public static async create(options: NewDropLinkOptions): Promise<DropLink> {
    return this.request("POST", `/drop-links/create`, {
      campaign: options.campaign,
      locked: options.locked,
    }).then((response) => {
      const dropLink = response.dropLinks[0];

      return {
        id: dropLink.id,
        claimCode: dropLink.claimCode,
        locked: dropLink.locked,
        campaignId: dropLink.groupId,
        publicAddress: dropLink.publicKey,
        claimLink: dropLink.dropLinkURL,
        claimed: false,
      } as DropLink;
    });
  }

  public static async getClaims(): Promise<DropLinkClaim[]> {
    return this.request("GET", "/drop-links/claims").then((response) => {
      const claims = response.claims;

      return claims.map((claim: any) => {
        return {
          id: claim.id,
          claimedAt: claim.claimedAt,
          claimedByAccount: claim.claimedByAccount,
          dropLinkId: claim.dropLinkId,
          claimLink: claim.claimURL,
          extraClaimerInfo: claim.extraClaimerInfo,
        } as DropLinkClaim;
      });
    });
  }

  public static async getDropLinks(
    options: DropLinksSearchOptions = {}
  ): Promise<DropLink[]> {
    return this.request(
      "GET",
      "/drop-links",
      {},
      {
        groupId: options.campaignId,
        claimed: options.claimed,
      }
    ).then((response) => {
      const dropLinks = response.dropLinks;

      return dropLinks.map((dropLink: any) => {
        return {
          id: dropLink.id,
          claimCode: dropLink.claimCode,
          locked: dropLink.locked,
          campaignId: dropLink.groupId,
          publicAddress: dropLink.publicKey,
          claimLink: dropLink.dropLinkURL,
          claimed: dropLink.claimed,
        } as DropLink;
      });
    });
  }
}

export { DropLink, DropLinkClaim, DropLinksSearchOptions, NewDropLinkOptions };
