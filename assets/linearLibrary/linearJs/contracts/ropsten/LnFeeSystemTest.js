
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnFeeSystemTest';
  
      function LnFeeSystemTest(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnFeeSystemTest'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.FEE_DUMMY_ADDRESS = async () => {
        
        return await this.contract.FEE_DUMMY_ADDRESS();
      };
    
      this.Init = async (_exchangeSystem, _rewardDistri, txParams) => {
        txParams = txParams || {};
        return await this.contract.Init(_exchangeSystem, _rewardDistri, txParams);
      };
    
      this.LockTime = async () => {
        
        return await this.contract.LockTime();
      };
    
      this.OnePeriodSecs = async () => {
        
        return await this.contract.OnePeriodSecs();
      };
    
      this.RecordUserDebt = async (user, debtProportion, debtFactor, txParams) => {
        txParams = txParams || {};
        return await this.contract.RecordUserDebt(user, debtProportion, debtFactor, txParams);
      };
    
      this.addCollateralRewards = async (reward, txParams) => {
        txParams = txParams || {};
        return await this.contract.addCollateralRewards(reward, txParams);
      };
    
      this.addExchangeFee = async (feeUsd, txParams) => {
        txParams = txParams || {};
        return await this.contract.addExchangeFee(feeUsd, txParams);
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
    
      this.claimFees = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.claimFees(txParams);
      };
    
      this.collateralSystem = async () => {
        
        return await this.contract.collateralSystem();
      };
    
      this.curRewardPeriod = async () => {
        
        return await this.contract.curRewardPeriod();
      };
    
      this.debtSystem = async () => {
        
        return await this.contract.debtSystem();
      };
    
      this.exchangeSystemAddress = async () => {
        
        return await this.contract.exchangeSystemAddress();
      };
    
      this.feePeriodDuration = async () => {
        
        return await this.contract.feePeriodDuration();
      };
    
      this.feesAvailable = async (user) => {
        
        return await this.contract.feesAvailable(user);
      };
    
      this.isFeesClaimable = async (account) => {
        
        return await this.contract.isFeesClaimable(account);
      };
    
      this.preRewardPeriod = async () => {
        
        return await this.contract.preRewardPeriod();
      };
    
      this.recentFeePeriods = async (index) => {
        
        return await this.contract.recentFeePeriods(index);
      };
    
      this.rewardDistributer = async () => {
        
        return await this.contract.rewardDistributer();
      };
    
      this.rewardLocker = async () => {
        
        return await this.contract.rewardLocker();
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.setExchangeSystemAddress = async (_address, txParams) => {
        txParams = txParams || {};
        return await this.contract.setExchangeSystemAddress(_address, txParams);
      };
    
      this.switchPeriod = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.switchPeriod(txParams);
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      this.userLastClaimedId = async (address_1) => {
        
        return await this.contract.userLastClaimedId(address_1);
      };
    
      this.userPeriodDebt = async (address_1, uint256_1) => {
        
        return await this.contract.userPeriodDebt(address_1, uint256_1);
      };
    
      }
  
      export default LnFeeSystemTest;
    