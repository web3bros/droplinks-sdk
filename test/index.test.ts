import {DropLinks,DropLink, DropLinkClaim, DropLinksSearchOptions, NewDropLinkOptions} from "../src";

// this is a test public API KEY for droplinks.io
const DROP_LINKS_API_KEY = "a84bb5eb72cb46008a73f78e6b922084"

DropLinks.init(DROP_LINKS_API_KEY)

test("returns valid Droplink", () => {
  return DropLinks.create({
    campaign: "test",
    locked: false
  } as NewDropLinkOptions).then((dropLink: DropLink) => {
    console.log(dropLink)
    expect(typeof dropLink.claimLink).toBe('string');
    expect(typeof dropLink.locked).toBe('boolean');
    expect(typeof dropLink.id).toBe('number');
    expect(typeof dropLink.publicAddress).toBe('string');
  });
})

DropLinks.create({
  campaign: "test",
  locked: false
} as NewDropLinkOptions).then((dropLink: DropLink) => {
  console.log(dropLink)
  expect(typeof dropLink.claimLink).toBe('string');
  expect(typeof dropLink.locked).toBe('boolean');
  expect(typeof dropLink.id).toBe('number');
  expect(typeof dropLink.publicAddress).toBe('string');
});

test("returns claims", () => {
  return DropLinks.getClaims().then((claims: DropLinkClaim[]) => {
    expect(claims).not.toEqual([])

    claims.forEach((claim: DropLinkClaim) => {
      expect(typeof claim.id).toBe('number');
      expect(typeof claim.claimedAt).toBe('string');
      expect(typeof claim.claimedByAccount).toBe('string');
      expect(typeof claim.dropLinkId).toBe('number');
      expect(typeof claim.claimLink).toBe('string');
      expect(typeof claim.extraClaimerInfo).toBe('object');
    })
  });
})

test.each([
  {campaignId: 4, claimed: false} as DropLinksSearchOptions,
  {claimed: true} as DropLinksSearchOptions
])("returns claims", (options) => {
  return DropLinks.getDropLinks(options).then((dropLinks: DropLink[]) => {
    dropLinks.forEach((dropLinks: DropLink) => {
      expect(typeof dropLinks.id).toBe('number');
      expect(typeof dropLinks.claimCode).toBe('string');
      expect(typeof dropLinks.locked).toBe('boolean');
      expect(typeof dropLinks.campaignId).toBe('number');
      expect(typeof dropLinks.publicAddress).toBe('string');
      expect(typeof dropLinks.claimLink).toBe('string');
      expect(typeof dropLinks.claimed).toBe('boolean');
      expect(dropLinks.claimed).toBe(options.claimed);
    })
  });
})