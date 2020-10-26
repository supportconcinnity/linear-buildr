
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/kovan/LnCollateralSystem';
  
      function LnCollateralSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnCollateralSystem'],
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
    
      this.tokenInfos = async (bytes32_1) => {
        
        return await this.contract.tokenInfos(bytes32_1);
      };
    
      this.tokenSymbol = async (uint256_1) => {
        
        return await this.contract.tokenSymbol(uint256_1);
      };
    
      this.uniqueId = async () => {
        
        return await this.contract.uniqueId();
      };
    
      this.userCollateralData = async (address_1, bytes32_1) => {
        
        return await this.contract.userCollateralData(address_1, bytes32_1);
      };
    
      this.setPaused = async (_paused, txParams) => {
        txParams = txParams || {};
        return await this.contract.setPaused(_paused, txParams);
      };
    
      this.updateAddressCache = async (_addressStorage, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAddressCache(_addressStorage, txParams);
      };
    
      this.SetPause = async (pause, txParams) => {
        txParams = txParams || {};
        return await this.contract.SetPause(pause, txParams);
      };
    
      this.UpdateTokenInfo = async (_currency, _tokenAddr, _minCollateral, _close, txParams) => {
        txParams = txParams || {};
        return await this.contract.UpdateTokenInfo(_currency, _tokenAddr, _minCollateral, _close, txParams);
      };
    
      this.UpdateTokenInfos = async (_symbols, _tokenAddrs, _minCollateral, _closes, txParams) => {
        txParams = txParams || {};
        return await this.contract.UpdateTokenInfos(_symbols, _tokenAddrs, _minCollateral, _closes, txParams);
      };
    
      this.GetSystemTotalCollateralInUsd = async () => {
        
        return await this.contract.GetSystemTotalCollateralInUsd();
      };
    
      this.GetUserTotalCollateralInUsd = async (_user) => {
        
        return await this.contract.GetUserTotalCollateralInUsd(_user);
      };
    
      this.GetUserCollateral = async (_user, _currency) => {
        
        return await this.contract.GetUserCollateral(_user, _currency);
      };
    
      this.GetUserCollaterals = async (_user) => {
        
        return await this.contract.GetUserCollaterals(_user);
      };
    
      this.Collateral = async (_currency, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.Collateral(_currency, _amount, txParams);
      };
    
      this.MaxRedeemableInUsd = async (_user) => {
        
        return await this.contract.MaxRedeemableInUsd(_user);
      };
    
      this.Redeem = async (_currency, _amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.Redeem(_currency, _amount, txParams);
      };
    
      this.CollateralEth = async (txParams) => {
        txParams = txParams || {};
        return await this.contract.CollateralEth(txParams);
      };
    
      this.RedeemETH = async (_amount, txParams) => {
        txParams = txParams || {};
        return await this.contract.RedeemETH(_amount, txParams);
      };
    
      }
  
      export default LnCollateralSystem;
    