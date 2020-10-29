const currencies = {
    lUSD: {
        name: "ℓUSD",
        fullName: "ℓUSD",
        type: "crypto",
    },
    lBTC: {
        name: "ℓBTC",
        fullName: "Liquid Bitcoin",
        type: "crypto"
    },
    lETH: {
        name: "ℓETH",
        fullName: "Liquid Ether",
        type: "crypto"
    },
    lBCH: {
        name: "ℓBCH",
        fullName: "ℓBCH",
        type: "crypto"
    },
    lEOS: {
        name: "ℓEOS",
        fullName: "ℓEOS",
        type: "crypto"
    },
    lLTC: {
        name: "ℓLTC",
        fullName: "ℓLTC",
        type: "crypto"
    },
    lXRP: {
        name: "ℓXRP",
        fullName: "ℓXRP",
        type: "crypto"
    },
    lTRON: {
        name: "ℓTRON",
        fullName: "ℓTRON",
        type: "crypto"
    },
    lBSV: {
        name: "ℓBSV",
        fullName: "ℓBSV",
        type: "crypto"
    },
    lLINK: {
        name: "ℓLINK",
        fullName: "ℓLINK",
        type: "crypto"
    },
    lZEC: {
        name: "ℓZEC",
        fullName: "ℓZEC",
        type: "crypto"
    },
    lNEO: {
        name: "ℓNEO",
        fullName: "ℓNEO",
        type: "crypto"
    },
    lBNB: {
        name: "ℓBNB",
        fullName: "ℓBNB",
        type: "crypto"
    },
    lDASH: {
        name: "ℓDASH",
        fullName: "ℓDASH",
        type: "crypto"
    },
    lJUST: {
        name: "ℓJUST",
        fullName: "ℓJUST",
        type: "crypto"
    },
    lDOT: {
        name: "ℓDOT",
        fullName: "ℓDOT",
        type: "crypto"
    },
    lXCF: {
        name: "ℓXCF",
        fullName: "ℓXCF",
        type: " "
    },
    lXAU: {
        name: "ℓXAU",
        fullName: "ℓXAU",
        type: "commodity"
    },
    lXAG: {
        name: "ℓXAG",
        fullName: "ℓXAG",
        type: "commodity"
    },
    lSOY: {
        name: "ℓSOY",
        fullName: "ℓSOY",
        type: "commodity"
    },
    lOIL: {
        name: "ℓOIL",
        fullName: "ℓOIL",
        type: "commodity"
    },
    lNIKK: {
        name: "ℓNIKK",
        fullName: "ℓNIKK",
        type: "index"
    },
    lFTSE: {
        name: "ℓFTSE",
        fullName: "ℓFTSE",
        type: "index"
    },
    lCAC: {
        name: "ℓCAC",
        fullName: "ℓCAC",
        type: "index"
    },
    lDAX: {
        name: "ℓDAX",
        fullName: "ℓDAX",
        type: "index"
    },
    lHB10: {
        name: "ℓHB-10",
        fullName: "Liquid Huobi index",
        type: "index"
    },
};

//导入资源路径
const requireIcon = () => {
    return Object.keys(currencies).map(key => {
        let currency = currencies[key];
        currency.icon = require(`@/static/currency/${key}.svg`);
        currency.icon_inactive = require(`@/static/currency/${key}_inactive.svg`);
    });
};

requireIcon();

export const sourceKey = "lUSD";

export default currencies;
