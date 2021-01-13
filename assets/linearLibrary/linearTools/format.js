import numbro from "numbro";
import { utils } from "ethers";
import _ from "lodash";

//格式化bigNumber到number
export const formatEtherToNumber = val => {
    if (_.isArray(val)) {
        return val.map(item => Number(utils.formatEther(item)));
    } else {
        if (!val || !Number(val)) return 0;
        return Number(utils.formatEther(val));
    }
};

//数字千分位
export const formatNumber = (val, decimals = 2) => {
    if (!val || !Number(val)) return 0;
    return numbro(_.floor(val, decimals)).format("0,0." + "0".repeat(decimals));
};

//大数转千分位
export const formatNumberFromBigNumber = (val, decimals = 2) => {
    if (!val || !Number(val)) return 0;
    return numbro(_.floor(utils.formatEther(val), decimals)).format(
        "0,0." + "0".repeat(decimals)
    );
};

//文本转byte32
export const formatStringToByte32 = text => {
    return utils.hexlify(utils.zeroPad(utils.toUtf8Bytes(text.toString()), 32));
};

//钱包地址转byte32
export const formatAddressToByte32 = address => {
    return utils.hexlify(utils.zeroPad(address, 32));
};

//钱包地址缩略, 例: 0x1234...7890
export const abbreviateAddress = address => {
    if (!address) return "";
    return address.substr(0, 6) + "..." + address.substr(-4, 4);
};
