export const GET_SHOP = `
    {
        shop {
            name
            email
            myshopifyDomain
            url
            id
            currencyCode
            billingAddress {
                country
                countryCodeV2
            }
            plan {
                displayName
                partnerDevelopment
                shopifyPlus
            }
        }
    }
`;