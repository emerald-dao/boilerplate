import { transaction as transactionStore } from '$lib/stores/TransactionStore';
import * as fcl from '@onflow/fcl';
import type { TransactionStatusObject } from '@onflow/fcl';

const executeTransaction = async (
	transaction: () => Promise<string>
): Promise<{
	state: 'success' | 'error';
	errorMessage: string;
}> => {
	transactionStore.initTransaction();

	try {
		// We start the transaction
		const transactionId = await transaction();
		console.log('Transaction Id', transactionId);

		// We connect our TransactionStore to the transaction to get the status
		fcl.tx(transactionId).subscribe(async (res: TransactionStatusObject) => {
			console.log(res);
			transactionStore.subscribeTransaction(res);
		});

		// We wait for the transaction to be sealed to get the result
		(await fcl.tx(transactionId).onceSealed()) as TransactionStatusObject;

		setTimeout(() => {
			transactionStore.resetTransaction();
		}, 1000);

		return {
			state: 'success',
			errorMessage: ''
		};
	} catch (e) {
		transactionStore.subscribeTransaction({
			blockId: '',
			events: [],
			status: 4,
			statusString: '',
			errorMessage: e as string,
			statusCode: '1'
		});

		setTimeout(() => {
			transactionStore.resetTransaction();
		}, 6000);

		console.log('Error in executeTransaction: ', e);

		return {
			state: 'error',
			errorMessage: e as string
		};
	}
};

export default executeTransaction;
