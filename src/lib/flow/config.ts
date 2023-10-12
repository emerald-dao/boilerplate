import { config } from '@onflow/fcl';
import dappInfo from '$lib/config/dappData';
import { env } from '$env/dynamic/public';

export const network: 'mainnet' | 'testnet' | 'emulator' = env.PUBLIC_FLOW_NETWORK as
	| 'mainnet'
	| 'testnet'
	| 'emulator';

const fclConfigInfo = {
	emulator: {
		accessNode: 'http://127.0.0.1:8888',
		discoveryWallet: 'http://localhost:8701/fcl/authn',
		discoveryAuthInclude: []
	},
	testnet: {
		accessNode: 'https://rest-testnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/testnet/authn',
		discoveryAuthInclude: ["0x82ec283f88a62e65", "0x9d2e44203cb13051"]
	},
	mainnet: {
		accessNode: 'https://rest-mainnet.onflow.org',
		discoveryWallet: 'https://fcl-discovery.onflow.org/authn',
		discoveryAuthInclude: ["0xead892083b3e2c6c", "0xe5cd26afebe62781"]
	}
};

config({
	'app.detail.title': dappInfo.title,
	'app.detail.icon': dappInfo.icon,
	'flow.network': network,
	'accessNode.api': fclConfigInfo[network].accessNode,
	'discovery.wallet': fclConfigInfo[network].discoveryWallet,
	// include Dapper Wallet and Ledger. 
	// Docs: https://developers.flow.com/tools/clients/fcl-js/api#more-configuration
	'discovery.authn.include': fclConfigInfo[network].discoveryAuthInclude
});
