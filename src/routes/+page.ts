import type { PageLoad } from './$types';
import { mockData } from '$lib';

export const load: PageLoad = async () => {
	return {
		mockData
	};
};
