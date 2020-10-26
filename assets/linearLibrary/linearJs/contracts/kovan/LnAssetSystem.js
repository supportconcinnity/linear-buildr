
      import {Contract} from 'ethers';
      import ContractSettings from '../../contractSettings';
      import abi from '../../lib/abis/kovan/LnAssetSystem';
  
      function LnAssetSystem(contractSettings) {
        this.contractSettings = contractSettings || new ContractSettings();
  
        this.contract = new Contract(
          this.contractSettings.addressList['LnAssetSystem'],
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
    
      this.getAddress = async (name) => {
        
        return await this.contract.getAddress(name);
      };
    
      this.getAddressWithRequire = async (name, reason) => {
        
        return await this.contract.getAddressWithRequire(name, reason);
      };
    
      this.mAddress2Names = async (address_1) => {
        
        return await this.contract.mAddress2Names(address_1);
      };
    
      this.mAddrs = async (bytes32_1) => {
        
        return await this.contract.mAddrs(bytes32_1);
      };
    
      this.mAssetList = async (uint256_1) => {
        
        return await this.contract.mAssetList(uint256_1);
      };
    
      this.setCandidate = async (_candidate, txParams) => {
        txParams = txParams || {};
        return await this.contract.setCandidate(_candidate, txParams);
      };
    
      this.update = async (name, dest, txParams) => {
        txParams = txParams || {};
        return await this.contract.update(name, dest, txParams);
      };
    
      this.updateAll = async (names, destinations, txParams) => {
        txParams = txParams || {};
        return await this.contract.updateAll(names, destinations, txParams);
      };
    
      this.addAsset = async (asset, txParams) => {
        txParams = txParams || {};
        return await this.contract.addAsset(asset, txParams);
      };
    
      this.removeAsset = async (name, txParams) => {
        txParams = txParams || {};
        return await this.contract.removeAsset(name, txParams);
      };
    
      this.assetNumber = async () => {
        
        return await this.contract.assetNumber();
      };
    
      this.totalAssetsInUsd = async () => {
        
        return await this.contract.totalAssetsInUsd();
      };
    
      this.getAssetAddresses = async () => {
        
        return await this.contract.getAssetAddresses();
      };
    
      }
  
      export default LnAssetSystem;
    