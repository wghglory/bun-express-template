import { faker } from '@faker-js/faker';

export const users = [
	{
		id: 'acme',
		name: 'ACME',
		username: 'ACME full name',
		active: true,
		lastModifiedDate: '2022-01-01',
	},
	...new Array(45).fill(1).map((i) => {
		return {
			id: faker.string.uuid(),
			name: faker.company.name(),
			username: faker.person.firstName(),
			active: Math.random() < 0.5,
			lastModifiedDate: faker.date.past().toDateString(),
		};
	}),
];
