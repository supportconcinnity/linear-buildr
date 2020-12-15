
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/ropsten/LnColateralBuildBurnAPI';
  
      function LnColateralBuildBurnAPI(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnColateralBuildBurnAPI'],
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
    
      this.buildBurnSystem = async () => {
        
        return await this.contract.buildBurnSystem();
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
    
      this.getSystemTotalCollateralInUsd = async () => {
        
        return await this.contract.getSystemTotalCollateralInUsd();
      };
    
      this.getUserTotalCollateralInUsd = async (_user) => {
        
        return await this.contract.getUserTotalCollateralInUsd(_user);
      };
    
      this.getUserCollateral = async (_user, _currency) => {
        
        return await this.contract.getUserCollateral(_user, _currency);
      };
    
      this.getUserCollaterals = async (_user) => {
        
        return await this.contract.getUserCollaterals(_user);
      };
    
      this.isSatisfyTargetRatio = async (_user) => {
        
        return await this.contract.isSatisfyTargetRatio(_user);
      };
    
      this.maxRedeemableInUsd = async (_user) => {
        
        return await this.contract.maxRedeemableInUsd(_user);
      };
    
      this.maxRedeemable = async (user, _currency) => {
        
        return await this.contract.maxRedeemable(user, _currency);
      };
    
      this.maxCanBuildAsset = async (user) => {
        
        return await this.contract.maxCanBuildAsset(user);
      };
    
      this.collateralAndBuild = async (_currency, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.collateralAndBuild(_currency, _amount, txParams);
      };
    
      this.burnAndRedeemMax = async (_currency, txParams) => {
        txParams = txParams || {};
        return await this.contract.burnAndRedeemMax(_currency, txParams);
      };
    
      this.burnAndRedeem = async (_currency, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.burnAndRedeem(_currency, _amount, txParams);
      };
    
      this.collateralEthAndBuild = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.collateralEthAndBuild(txParams);
      };
    
      this.burnAndRedeemETH = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.burnAndRedeemETH(_amount, txParams);
      };
    
      this.burnAssetToTarget = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.burnAssetToTarget(txParams);
      };
    
      }
  
      export default LnColateralBuildBurnAPI;
    