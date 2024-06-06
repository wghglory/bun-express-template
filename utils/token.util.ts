/**
 * parse jwt header, payload
 * @param authorization Bearer a_jwt
 */
export function parseToken(authorization: string) {
	const token = authorization.split(' ')[1];
	const [header, payload, signature] = token.split('.');

	const decodedHeader = Buffer.from(header, 'base64').toString();
	const decodedPayload = Buffer.from(payload, 'base64').toString();

	console.log(decodedHeader);
	console.log(decodedPayload);
}
