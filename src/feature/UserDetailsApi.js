import CommonApi from '../network/CommonApi';
import LegacyCommonApi from '../network/LegacyCommonApi';

// export class UserDetailsApi extends LegacyCommonApi {
//     // getData() {
//     //     return this.get("url");
//     // }
//     // postData(payload) {

//     //     return this.post("url", payload, { headers: { 'custom header': 'data' } });
//     //     // return this.post(url, requestPayload);
//     // }

//     getUserData() {
//         return this.get("todos/1");
//     }

//     postUserData(payload) {
//         return this.post("create", payload)
//     }
// }

export class UserDetailsApi extends CommonApi {

    postUserData(payload) {
        const options = Object.assign({
            method: 'POST',
            url: "create",
            body: payload,
        });
        return this.fetch(options);
    }
}

