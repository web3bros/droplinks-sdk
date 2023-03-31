# Droplinks.io SDK

[Droplinks.io](http://droplinks.io) is the easiest way to distribute your NFTs and tokens with claim links & QR codes.

Each link(droplink) is a wallet that you have access to it's private key. With the droplinks.io SDK you can

* Create new droplinks and get their public address
* Get all the droplinks that you created
* Get all the claims of your droplinks along with info like the public address of the claimer and their email

Install the [droplinks.io](http://droplinks.io) sdk

```jsx
npm install @droplinks/sdk
```

Import it

```jsx
import { DropLinks, DropLinksSearchOptions, DropLinkClaim } from "@droplinks/sdk"
```

Initialize it with your [droplinks.io](http://droplinks.io) API key(get it from [here](https://droplinks.io/dropapi))

```jsx
DropLinks.init(YOUR_API_KEY)
```

Create a new droplink

```jsx
DropLinks.create().then((dropLink: DropLink) => {
   // your code here to transfer assets to droplink.publicAddress
});
```

Get all your droplinks

```jsx
DropLinks.getDropLinks({claimed: true} as DropLinksSearchOptions).then((dropLinks: DropLink[]) => {
  dropLinks.forEach((dropLinks: DropLink) => {
		// each droplink has the following type
    // {
    //   id: number
    //   claimCode: string,
    //   publicAddress: string
    //   locked: boolean
    //   claimLink: string
    //   campaignId: number | null
    //   claimed: boolean
    // }
  })
});
```

Get all the claims of your droplinks

```jsx
DropLinks.getClaims().then((claims: DropLinkClaim[]) => {
  claims.forEach((claim: DropLinkClaim) => {
    // each claim has the following type
    // {
    //   id: number
    //   claimedAt: string
    //   claimedByAccount: string
    //   dropLinkId: number
    //   claimLink: string
    //   extraClaimerInfo?: ExtraClaimerInfo
    // }
  })
});
```