
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnRewardLocker';
  
      function LnRewardLocker(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnRewardLocker'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.admin = async () => {
        
        return await this.contract.admin();
      };
    
      this.balanceOf = async (address_1) => {
        
        return await this.contract.balanceOf(address_1);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async () => {
        
        return await this.contract.candidate();
      };
    
      this.linaToken = async () => {
        
        return await this.contract.linaToken();
      };
    
      this.maxRewardArrayLen = async () => {
        
        return await this.contract.maxRewardArrayLen();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.totalNeedToReward = async () => {
        
        return await this.contract.totalNeedToReward();
      };
    
      this.userRewards = async (address_1, uint256_1) => {
        
        return await this.contract.userRewards(address_1, uint256_1);
      };
    
      this.setLinaAddress = async (_token, txParams) => {
        txParams = txParams || {};
        return await this.contract.setLinaAddress(_token, txParams);
      };
    
      this.Init = async (_feeSysAddr, txParams) => {
        txParams = txParams || {};
        return await this.contract.Init(_feeSysAddr, txParams);
      };
    
      this.appendReward = async (_user, _amount, _lockTo, txParams) => {
        txParams = txParams || {};
        return await this.contract.appendReward(_user, _amount, _lockTo, txParams);
      };
    
      this.Slimming = async (_user, txParams) => {
        txParams = txParams || {};
        return await this.contract.Slimming(_user, txParams);
      };
    
      this.ClaimMaxable = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.ClaimMaxable(txParams);
      };
    
      this.Claim = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.Claim(_amount, txParams);
      };
    
      }
  
      export default LnRewardLocker;
    