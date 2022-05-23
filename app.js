const crypto = require('crypto');
const axios = require('axios');
const prompt = require('prompt-sync')({ sigint: true });

(async () => {
    try {
        let check = true;
        while (check) {
            const shasum = crypto.createHash('sha1');
            console.log('Type in password to check');
            const userPassword = prompt({ echo: '*' });
            if (userPassword === undefined || userPassword === null) {
                console.log('Nothing to check');
                return;
            }
            shasum.update(userPassword);
            const hashedPw = shasum.digest('hex');
            // eslint-disable-next-line no-await-in-loop
            const response = await axios.get(`https://api.pwnedpasswords.com/range/${hashedPw.substring(0, 5)}`);
            let { data } = response;
            data = data.trim().split('\n');
            const dictionary = Object.assign({}, ...data.map((x) => {
                const kv = x.split(':');
                return { [kv[0]]: kv[1].trim() };
            }));
            const pwned = dictionary[hashedPw.substring(5, hashedPw.length).toUpperCase()];
            if (pwned) {
                console.log(`PWNED at least ${pwned} times`);
            } else {
                console.log('Good news — no pwnage found!');
            }
            const again = prompt('Try another password? [Yn]', 'Y');
            if (again && again.trim().toUpperCase() === 'N') {
                check = false;
                return;
            }
        }
    } catch (error) {
        console.log(error);
    }
})();
