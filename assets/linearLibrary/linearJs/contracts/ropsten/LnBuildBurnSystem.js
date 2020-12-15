
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnBuildBurnSystem';
  
      function LnBuildBurnSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnBuildBurnSystem'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
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
    
      this.paused = async () => {
        
        return await this.contract.paused();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setPaused = async (_paused, txParams) => {
        txParams = txParams || {};
        return await this.contract.setPaused(_paused, txParams);
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      this.SetLusdTokenAddress = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetLusdTokenAddress(_address, txParams);
      };
    
      this.MaxCanBuildAsset = async (user) => {
        
        return await this.contract.MaxCanBuildAsset(user);
      };
    
      this.BuildAsset = async (user, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.BuildAsset(user, amount, txParams);
      };
    
      this.BuildMaxAsset = async (user, txParams) => {
        txParams = txParams || {};
        return await this.contract.BuildMaxAsset(user, txParams);
      };
    
      this.BurnAsset = async (user, amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.BurnAsset(user, amount, txParams);
      };
    
      this.BurnAssetToTarget = async (user, txParams) => {
        txParams = txParams || {};
        return await this.contract.BurnAssetToTarget(user, txParams);
      };
    
      }
  
      export default LnBuildBurnSystem;
    