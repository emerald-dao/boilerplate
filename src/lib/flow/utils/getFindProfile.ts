import { contractAddresses } from '$lib/stores/ContractAddressesStore';
import type { FindProfile } from '@emerald-dao/component-library/models/user.interface';
import * as fcl from '@onflow/fcl';
import { get } from 'svelte/store';

const getFindProfile = async (address: string): Promise<FindProfile | null> => {
	try {
		return await fcl.query({
			cadence: `
        import FIND from ${get(contractAddresses).FIND}
        pub fun main(address: Address): Profile? {
            if let name = FIND.reverseLookup(address) {
              let profile = FIND.lookup(name)!
              return Profile(_name: name, _address: address, _avatar: profile.getAvatar())
            }
            
            return nil
        }

        pub struct Profile {
          pub let name: String
          pub let address: Address
          pub let avatar: String

          init(_name: String, _address: Address, _avatar: String) {
            self.name = _name
            self.address = _address
            self.avatar = _avatar
          }
        }
        `,
			args: (arg, t) => [arg(address, t.Address)]
		});
	} catch (e) {
		console.log(e);
		return null;
	}
};

export default getFindProfile;
