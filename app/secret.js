exports.secret = 'HMACSHA256(base64UrlEncode(header) + "." +base64UrlEncode(payload)secret)';
