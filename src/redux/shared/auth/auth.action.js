import JwtDecode from 'jwt-decode';
import CryptoJS from 'crypto-js';
export const DECODE_TOKEN = "DECODE_TOKEN";
export const CHECKEXPIRE_TOKEN = "CHECKEXPIRE_TOKEN";


export const decodeToken = (token) => {
    return async (dispatch) => {
        try {
            //Creating the Vector Key
            var iv = CryptoJS.enc.Hex.parse('e84ad660c4721ae0e84ad660c4721ae0');
            //Encoding the Password in from UTF8 to byte array
            var Pass = CryptoJS.enc.Utf8.parse('test');
            //Encoding the Salt in from UTF8 to byte array
            var Salt = CryptoJS.enc.Utf8.parse("insight123resultxyz");
            //Creating the key in PBKDF2 format to be used during the decryption
            var key128Bits1000Iterations = CryptoJS.PBKDF2(Pass.toString(CryptoJS.enc.Utf8), Salt, { keySize: 128 / 32, iterations: 1000 });
            //Enclosing the test to be decrypted in a CipherParams object as supported by the CryptoJS libarary
            var cipherParams = CryptoJS.lib.CipherParams.create({
                ciphertext: CryptoJS.enc.Base64.parse(token)
            });

            //Decrypting the string contained in cipherParams using the PBKDF2 key
            var decrypted = CryptoJS.AES.decrypt(cipherParams, key128Bits1000Iterations, { mode: CryptoJS.mode.CBC, iv: iv, padecodedTokening: CryptoJS.pad.Pkcs7 });
            var result = decrypted.toString(CryptoJS.enc.Utf8);
            //console.log('r',result);
            const decodedToken = JwtDecode(result);
            //console.log('decodedToken', decodedToken);
            var userMenuAccessList = decodedToken.UserMenuAccessList;
            var userAPIAccessList = decodedToken.UserAPIAccessList;
            var domain = decodedToken.domain;
            const dd = JwtDecode(result);
            var accessLevelList = dd.AccessLevel;
            var userId = dd.nameid
            //console.log('domain', domain);
            var exp = decodedToken.exp;
            window.localStorage.setItem('userName', decodedToken.unique_name);
            window.localStorage.setItem('email', decodedToken.email);

          await  dispatch({
                type: DECODE_TOKEN,
                userMenu: userMenuAccessList,
                userAPI: userAPIAccessList,
                accessLevel: accessLevelList,
                expirationTime: exp,
                userId: userId,
                domain: domain,
                userName: decodedToken.unique_name,
                email: decodedToken.email
            });
            //console.log('userMenu',userMenuAccessList);
        }
        catch (err) {
            throw (err);
        }
    }
}




//----------------------------------------------------------------------------------------
// export const decodeToken = (token) => {
//     return async (dispatch) => {
//         try {
//             //console.log(token);
//             // var decryptedecodedTokenata=CryptoJS.AES.decrypt(token,'E546C8DF278CD5931069B522E695D4F2').toString(CryptoJS.enc.Utf8);

//             //console.log(decryptedecodedTokenata);
//             // Encrypt
//             // var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');
//             // Decrypt
//             // var x = token.toString();
//             //var bytes = CryptoJS.AES.decrypt(token, 'E546C8DF278CD5931069B522E695D4F2');
//             //var plaintext = bytes.toString(CryptoJS.enc.UTF8);

//             // console.log(plaintext);
//             //--------------------------------------
//             // Encrypt 
//             var ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123');

//             // Decrypt 
//             var bytes = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
//             var plaintext = bytes.toString(CryptoJS.enc.Utf8);

//             //console.log(plaintext);

//             //--------------------------------------------------------------------
//             const decoded = decode(token);
//             var accessLevelList = decoded.AccessLevel;
//             var exp = decoded.exp;




//             dispatch({
//                 type: DECODE_TOKEN,
//                 accessLevel: accessLevelList,
//                 expirationTime: exp
//             });

//         }
//         catch (err) {
//             throw (err);
//         }
//     }
// }

//----------------------------------------------------------------------------------------
export const checkTokenExpiration = (data) => {
    return async (dispatch) => {
        try {

            dispatch({ type: CHECKEXPIRE_TOKEN, result: data });

        }
        catch (err) {
            throw (err);
        }
    }
}