class Util {
  constructor(provider) {
    this.provider = provider;
    this.waitForTransaction = this.waitForTransaction.bind(this);
  }

  async waitForTransaction(transactionHash) {
    return new Promise((resolve) => {
      const check = async () => {
        const transactionInformation = await this.provider.waitForTransaction(
          transactionHash
        );
        if (transactionInformation && transactionInformation.blockHash) {
          //second
          const transactionInfo = await this.provider.getTransactionReceipt(
            transactionHash
          );
          resolve(transactionInfo?.status == 1);
        } else {
          setTimeout(check, 3000);
        }
      };

      check();
    });
  }
}

export default Util;
