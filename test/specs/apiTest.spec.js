import Axios from "axios";
import UserApiService from "../functions/UserApiService.functions";

describe('My Mock api application', () => {

    it('Get Users from GoRest Api', () => {
        let response;
        browser.call(() => {
            return UserApiService.getUsers()
            .then(data =>  response = data)
            .catch(err => console.log(err))
        })
        expect(response.status).toEqual(200);
    })

    it('should assert the mock data', () => {
        let response;
        browser.call(() => {
          return UserApiService.mockApiGetMethod()
            .then(data => response = data)
            .catch(err => console.log(err))
        });
        expect(response.status).toEqual(200)
        expect(response.data.message).toEqual("Hello World!!!")
        });
});