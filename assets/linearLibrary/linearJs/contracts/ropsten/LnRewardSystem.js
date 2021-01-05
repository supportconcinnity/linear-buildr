
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnRewardSystem';
  
      function LnRewardSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnRewardSystem'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.firstPeriodStartTime = async () => {
        
        return await this.contract.firstPeriodStartTime();
      };
    
      this.userLastClaimPeriodIds = async (user) => {
        
        return await this.contract.userLastClaimPeriodIds(user);
      };
    
      this.claimReward = async (periodId, stakingReward, feeReward, v, r, s, txParams) => {
        txParams = txParams || {};
        return await this.contract.claimReward(periodId, stakingReward, feeReward, v, r, s, txParams);
      };
    
      }
  
      export default LnRewardSystem;
    