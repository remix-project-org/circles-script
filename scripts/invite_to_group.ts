import { ethers } from 'ethers'
import { Sdk } from '@circles-sdk/sdk'
import { BrowserProviderContractRunner } from "@circles-sdk/adapter-ethers"

const run = async () => {
    // Initialize the SDK
    const adapter = new BrowserProviderContractRunner();
    await adapter.init();
    const sdk = new Sdk(adapter)

    const user = '0xf7f307601497eAD8217543Fc9B350Ae6DA5fB5eF'
    
    // worked: 0x43d5d435b1aae39551951e07b5e6618a1657f5a89117d45710e3d74b76ac23a6
    const provider = new ethers.BrowserProvider(web3Provider)
    const receipt = await provider.getTransactionReceipt('0x43d5d435b1aae39551951e07b5e6618a1657f5a89117d45710e3d74b76ac23a6')
    const groupAddress = ethers.stripZerosLeft(receipt.logs[15].topics[1])

    console.log('group address', groupAddress)
    const baseGroupAvatar = await sdk.getAvatar(groupAddress.toLowerCase())
    
    console.log('group avatar', baseGroupAvatar)

    console.log('owner', await baseGroupAvatar.owner())
    console.log('service', await baseGroupAvatar.service())
    
    console.log(await baseGroupAvatar.isTrustedBy(user))

    console.log(await baseGroupAvatar.trust(user))
}

run().then(console.log).catch(console.error)