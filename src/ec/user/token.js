
class Token {
  static _getTokenPart1() {
    return '1bad6b6a92';
  }

  static _getTokenPart2() {
    return 'e474f156a6';
  }

  static _getTokenPart3() {
    return 'b97bc938af';
  }

  static _getTokenPart4() {
    return 'a73aab7f85';
  }

  static token() {
    return Token._getTokenPart1() + Token._getTokenPart2() + Token._getTokenPart3() + Token._getTokenPart4();
  }
}

export default Token;
