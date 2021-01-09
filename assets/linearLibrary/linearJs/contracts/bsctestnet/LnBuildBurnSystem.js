
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/bsctestnet/LnBuildBurnSystem';
  
      function LnBuildBurnSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnBuildBurnSystem'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.BuildAsset = async (amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.BuildAsset(amount, txParams);
      };
    
      this.BuildMaxAsset = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.BuildMaxAsset(txParams);
      };
    
      this.BurnAsset = async (amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.BurnAsset(amount, txParams);
      };
    
      this.BurnAssetToTarget = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.BurnAssetToTarget(txParams);
      };
    
      this.Currency_LINA = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.Currency_LINA(txParams);
      };
    
      this.MaxCanBuildAsset = async (user, txParams) => {
        txParams = txParams || {};
        return await this.contract.MaxCanBuildAsset(user, txParams);
      };
    
      this.SetLusdTokenAddress = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetLusdTokenAddress(_address, txParams);
      };
    
      this.admin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.admin(txParams);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.build = async (user, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.build(user, amount, txParams);
      };
    
      this.burn = async (user, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.burn(user, amount, txParams);
      };
    
      this.calcBuildAmount = async (user, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.calcBuildAmount(user, _amount, txParams);
      };
    
      this.calcRedeemAmount = async (user, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.calcRedeemAmount(user, _amount, txParams);
      };
    
      this.candidate = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.candidate(txParams);
      };
    
      this.messageSender = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.messageSender(txParams);
      };
    
      this.paused = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.paused(txParams);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setMessageSender = async (sender, txParams) => {
        txParams = txParams || {};
        return await this.contract.setMessageSender(sender, txParams);
      };
    
      this.setPaused = async (_paused, txParams) => {
        txParams = txParams || {};
        return await this.contract.setPaused(_paused, txParams);
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      }
  
      export default LnBuildBurnSystem;
    