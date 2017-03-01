import Token from './token';

var Credential = {
	username: 'haxpor',
	password: Token.token(),
	oauth: Token.token()
}

export default Credential;