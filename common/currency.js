const Currencies = {
    ℓUSD: {
        name: "lUSD",
        type: "crypto"
    },
    ℓBTC: {
        name: "lBTC",
        type: "crypto"
    },
    ℓETH: {
        name: "lETH",
        type: "crypto"
    },
    ℓBCH: {
        name: "lBCH",
        type: "crypto"
    },
    ℓEOS: {
        name: "lEOS",
        type: "crypto"
    },
    ℓLTC: {
        name: "lLTC",
        type: "crypto"
    },
    ℓXRP: {
        name: "lXRP",
        type: "crypto"
    },
    ℓTRON: {
        name: "lTRON",
        type: "crypto"
    },
    ℓBSV: {
        name: "lBSV",
        type: "crypto"
    },
    ℓLINK: {
        name: "lLINK",
        type: "crypto"
    },
    ℓZEC: {
        name: "lZEC",
        type: "crypto"
    },
    ℓNEO: {
        name: "lNEO",
        type: "crypto"
    },
    ℓBNB: {
        name: "lBNB",
        type: "crypto"
    },
    ℓDASH: {
        name: "lDASH",
        type: "crypto"
    },
    ℓJUST: {
        name: "lJUST",
        type: "crypto"
    },
    ℓDOT: {
        name: "lDOT",
        type: "crypto"
    },
    ℓXCF: {
        name: "lXCF",
        type: "commodity"
    },
    ℓXAU: {
        name: "lXAU",
        type: "commodity"
    },
    ℓXAG: {
        name: "lXAG",
        type: "commodity"
    },
    ℓSOY: {
        name: "lSOY",
        type: "commodity"
    },
    ℓOIL: {
        name: "lOIL",
        type: "commodity"
    },
    ℓNIKK: {
        name: "lNIKK",
        type: "index"
    },
    ℓFTSE: {
        name: "lFTSE",
        type: "index"
    },
    ℓCAC: {
        name: "lCAC",
        type: "index"
    },
    ℓDAX: {
        name: "lDAX",
        type: "index"
    }
};

//导入资源路径
const requireIcon = () => {
    return Object.keys(Currencies).map(key => {
        let currency = Currencies[key];
        const icons = {
            icon: require(`@/static/currency/${currency.name}.svg`),
            icon_inactive: require(`@/static/currency/${currency.name}_inactive.svg`)
        };
        Currencies[key] = { ...currency, ...icons };
    });
};
requireIcon();
export default Currencies;
