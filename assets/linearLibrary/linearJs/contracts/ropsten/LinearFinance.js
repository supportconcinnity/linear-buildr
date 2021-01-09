
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LinearFinance';
  
      function LinearFinance(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LinearFinance'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.DECIMALS = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.DECIMALS(txParams);
      };
    
      this.MAX_SUPPLY = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.MAX_SUPPLY(txParams);
      };
    
      this.TOKEN_NAME = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.TOKEN_NAME(txParams);
      };
    
      this.TOKEN_SYMBOL = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.TOKEN_SYMBOL(txParams);
      };
    
      this.admin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.admin(txParams);
      };
    
      this.allowance = async (owner, spender, txParams) => {
        txParams = txParams || {};
        return await this.contract.allowance(owner, spender, txParams);
      };
    
      this.approve = async (spender, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.approve(spender, value, txParams);
      };
    
      this.balanceOf = async (account, txParams) => {
        txParams = txParams || {};
        return await this.contract.balanceOf(account, txParams);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.burn = async (account, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.burn(account, amount, txParams);
      };
    
      this.candidate = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.candidate(txParams);
      };
    
      this.decimals = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.decimals(txParams);
      };
    
      this.integrationProxy = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.integrationProxy(txParams);
      };
    
      this.messageSender = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.messageSender(txParams);
      };
    
      this.mint = async (account, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.mint(account, amount, txParams);
      };
    
      this.name = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.name(txParams);
      };
    
      this.paused = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.paused(txParams);
      };
    
      this.proxy = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.proxy(txParams);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setIntegrationProxy = async (_integrationProxy, txParams) => {
        txParams = txParams || {};
        return await this.contract.setIntegrationProxy(_integrationProxy, txParams);
      };
    
      this.setMessageSender = async (sender, txParams) => {
        txParams = txParams || {};
        return await this.contract.setMessageSender(sender, txParams);
      };
    
      this.setPaused = async (_paused, txParams) => {
        txParams = txParams || {};
        return await this.contract.setPaused(_paused, txParams);
      };
    
      this.setProxy = async (_proxy, txParams) => {
        txParams = txParams || {};
        return await this.contract.setProxy(_proxy, txParams);
      };
    
      this.setTokenStorage = async (_tokenStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.setTokenStorage(_tokenStorage, txParams);
      };
    
      this.symbol = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.symbol(txParams);
      };
    
      this.tokenStorage = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.tokenStorage(txParams);
      };
    
      this.totalSupply = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.totalSupply(txParams);
      };
    
      this.transfer = async (to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transfer(to, value, txParams);
      };
    
      this.transferFrom = async (from, to, value, txParams) => {
        txParams = txParams || {};
        return await this.contract.transferFrom(from, to, value, txParams);
      };
    
      }
  
      export default LinearFinance;
    