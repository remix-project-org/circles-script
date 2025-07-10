import { Sdk } from '@circles-sdk/sdk';
// import { CirclesRpc, CirclesData } from '@circles-sdk/data';
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers"

(window as any).ethereum = web3Provider

const run = async () => {
    try {
        const adapter = new BrowserProviderContractRunner();
        await adapter.init();

        // profile: '0xf7f307601497eAD8217543Fc9B350Ae6DA5fB5eF'
        const address = '0xd97e35b2a5e047ed0a37edfd53daad30f28195d8'
        const sdk = new Sdk (adapter); 
        
        // const circlesRpc = new CirclesRpc("https://rpc.aboutcircles.com/");
        // const data = new CirclesData(circlesRpc);

        const data = sdk.data


        // const signerAddress = await signer.getAddress()
        const avatar = await sdk.getAvatar(address)
        console.log(await avatar.getMintableAmount())

        const avatarInfo = await data.getAvatarInfo(address);
        console.log(avatarInfo)
    } catch (e) {
        console.error(e)
    }    
}

run().catch(console.error).then(console.log)
