
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/kovan/LnChainLinkPrices';
  
      function LnChainLinkPrices(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnChainLinkPrices'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.LINA = async () => {
        
        return await this.contract.LINA();
      };
    
      this.LUSD = async () => {
        
        return await this.contract.LUSD();
      };
    
      this.admin = async () => {
        
        return await this.contract.admin();
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async () => {
        
        return await this.contract.candidate();
      };
    
      this.deletePrice = async (currencyName, txParams) => {
        txParams = txParams || {};
        return await this.contract.deletePrice(currencyName, txParams);
      };
    
      this.exchange = async (sourceName, sourceAmount, destName) => {
        
        return await this.contract.exchange(sourceName, sourceAmount, destName);
      };
    
      this.exchangeAndPrices = async (sourceName, sourceAmount, destName) => {
        
        return await this.contract.exchangeAndPrices(sourceName, sourceAmount, destName);
      };
    
      this.getCurrentRoundId = async (currencyName) => {
        
        return await this.contract.getCurrentRoundId(currencyName);
      };
    
      this.getPrice = async (currencyName) => {
        
        return await this.contract.getPrice(currencyName);
      };
    
      this.getPriceAndUpdatedTime = async (currencyName) => {
        
        return await this.contract.getPriceAndUpdatedTime(currencyName);
      };
    
      this.isStale = async (currencyName) => {
        
        return await this.contract.isStale(currencyName);
      };
    
      this.mOracleArray = async (uint256_1) => {
        
        return await this.contract.mOracleArray(uint256_1);
      };
    
      this.mOracles = async (bytes32_1) => {
        
        return await this.contract.mOracles(bytes32_1);
      };
    
      this.mPricesLastRound = async (bytes32_1) => {
        
        return await this.contract.mPricesLastRound(bytes32_1);
      };
    
      this.oracle = async () => {
        
        return await this.contract.oracle();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setOracle = async (_oracle, txParams) => {
        txParams = txParams || {};
        return await this.contract.setOracle(_oracle, txParams);
      };
    
      this.setStalePeriod = async (_time, txParams) => {
        txParams = txParams || {};
        return await this.contract.setStalePeriod(_time, txParams);
      };
    
      this.stalePeriod = async () => {
        
        return await this.contract.stalePeriod();
      };
    
      this.updateAll = async (currencyNames, newPrices, timeSent, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAll(currencyNames, newPrices, timeSent, txParams);
      };
    
      this.addOracle = async (currencyKey, OracleAddress, txParams) => {
        txParams = txParams || {};
        return await this.contract.addOracle(currencyKey, OracleAddress, txParams);
      };
    
      this.removeOracle = async (currencyKey, txParams) => {
        txParams = txParams || {};
        return await this.contract.removeOracle(currencyKey, txParams);
      };
    
      }
  
      export default LnChainLinkPrices;
    