class Util {
    constructor(contractSettings) {
        this.contractSettings = contractSettings;
        this.waitForTransaction = this.waitForTransaction.bind(this);
    }

    async waitForTransaction(transactionHash) {
        return new Promise(resolve => {
            const check = async () => {
                const transactionInformation = await this.contractSettings.provider.getTransaction(
                    transactionHash
                );
                if (
                    transactionInformation &&
                    transactionInformation.blockHash
                ) {

                    //second
                    const transactionInfo = await this.contractSettings.provider.getTransactionReceipt(
                        transactionHash
                    );
                    status = transactionInfo.status;
                    resolve(status == 1);
                } else {
                    setTimeout(check, 3000);
                }
            };

            check();
        });
    }
}

export default Util;
