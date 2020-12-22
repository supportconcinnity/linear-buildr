
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/mainnet/LnFeeSystem';
  
      function LnFeeSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnFeeSystem'],
          abi,
          this.contractSettings.signer || this.contractSettings.provider
        );
  
        
      this.FEE_DUMMY_ADDRESS = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.FEE_DUMMY_ADDRESS(txParams);
      };
    
      this.Init = async (_exchangeSystem, _rewardDistri, txParams) => {
        txParams = txParams || {};
        return await this.contract.Init(_exchangeSystem, _rewardDistri, txParams);
      };
    
      this.LockTime = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.LockTime(txParams);
      };
    
      this.OnePeriodSecs = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.OnePeriodSecs(txParams);
      };
    
      this.RecordUserDebt = async (user, debtProportion, debtFactor, txParams) => {
        txParams = txParams || {};
        return await this.contract.RecordUserDebt(user, debtProportion, debtFactor, txParams);
      };
    
      this.SetPeriodData = async (index, id, startingDebtFactor, startTime, feesToDistribute, feesClaimed, rewardsToDistribute, rewardsClaimed, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetPeriodData(index, id, startingDebtFactor, startTime, feesToDistribute, feesClaimed, rewardsToDistribute, rewardsClaimed, txParams);
      };
    
      this.__LnAdminUpgradeable_init = async (_admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnAdminUpgradeable_init(_admin, txParams);
      };
    
      this.__LnFeeSystem_init = async (_admin, txParams) => {
        txParams = txParams || {};
        return await this.contract.__LnFeeSystem_init(_admin, txParams);
      };
    
      this.addCollateralRewards = async (reward, txParams) => {
        txParams = txParams || {};
        return await this.contract.addCollateralRewards(reward, txParams);
      };
    
      this.addExchangeFee = async (feeUsd, txParams) => {
        txParams = txParams || {};
        return await this.contract.addExchangeFee(feeUsd, txParams);
      };
    
      this.admin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.admin(txParams);
      };
    
      this.becomeAdmin = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.becomeAdmin(txParams);
      };
    
      this.candidate = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.candidate(txParams);
      };
    
      this.claimFees = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.claimFees(txParams);
      };
    
      this.collateralSystem = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.collateralSystem(txParams);
      };
    
      this.curRewardPeriod = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.curRewardPeriod(txParams);
      };
    
      this.debtSystem = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.debtSystem(txParams);
      };
    
      this.exchangeSystemAddress = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.exchangeSystemAddress(txParams);
      };
    
      this.feePeriodDuration = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.feePeriodDuration(txParams);
      };
    
      this.feesAvailable = async (user, txParams) => {
        txParams = txParams || {};
        return await this.contract.feesAvailable(user, txParams);
      };
    
      this.isFeesClaimable = async (account, txParams) => {
        txParams = txParams || {};
        return await this.contract.isFeesClaimable(account, txParams);
      };
    
      this.preRewardPeriod = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.preRewardPeriod(txParams);
      };
    
      this.recentFeePeriods = async (index, txParams) => {
        txParams = txParams || {};
        return await this.contract.recentFeePeriods(index, txParams);
      };
    
      this.rewardDistributer = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.rewardDistributer(txParams);
      };
    
      this.rewardLocker = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.rewardLocker(txParams);
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
    
      this.userLastClaimedId = async (address_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.userLastClaimedId(address_1, txParams);
      };
    
      this.userPeriodDebt = async (address_1, uint256_1, txParams) => {
        txParams = txParams || {};
        return await this.contract.userPeriodDebt(address_1, uint256_1, txParams);
      };
    
      }
  
      export default LnFeeSystem;
    