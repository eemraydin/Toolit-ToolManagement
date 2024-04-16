const decryptToken = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const buff = new Buffer.from(base64, 'base64');
    // const buff = new Buffer(base64, 'base64');
    const payloadinit = buff.toString('ascii');
    return JSON.parse(payloadinit);
}

module.exports = {decryptToken}