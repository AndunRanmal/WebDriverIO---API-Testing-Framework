import AlmService from "../functions/alm.functions";

let articleId = 16368017;
let requestData = {
    "username": "seleniumUatOOOCreate1@mailinator.com",
    "password": "123456Test",
    "externalLogin": false
};
let articleName = "Selenium-OO-Test-2020-11-20WATuWIwyxK";
let journalId = "8096251";
let cookie;
let participantId;

describe('ALM Test Suite', () => {
    it('Authenticate User', () => {
        let response;
        browser.call(() => {
            return AlmService.authenticateApi(requestData)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        cookie = response.headers["set-cookie"];
        participantId = response.data.payload.participantId;
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual("SUCCESS")
    })

    it('Get article details', () => {
        let response;
        browser.call(() => {
            return AlmService.getArticleDetails(articleId, cookie)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        expect(response.status).toEqual(200);
        expect(response.data.status).toEqual("SUCCESS")
        expect(response.data.payload.article.name).toEqual(articleName)
        expect(response.data.payload.journal.id).toEqual(journalId)
    })

    it('Get article details', () => {
        let response;
        browser.call(() => {
            return AlmService.getRelationshipWithArticle(articleId, cookie)
                .then(data => response = data)
                .catch(err => console.log(err))
        })
        expect(response.status).toEqual(200);
        let contents = response.data.content;
        contents.forEach(object => {
            expect(object.participantId).toEqual(participantId)
            expect(object.attributes[2].attributeValue).toEqual(requestData.username)
        });
    })

    // it('should assert the mock data', () => {
    //     let response;
    //     browser.call(() => {
    //         return UserApiService.mockApiGetMethod()
    //             .then(data => response = data)
    //             .catch(err => console.log(err))
    //     });
    //     expect(response.status).toEqual(200)
    //     expect(response.data.message).toEqual("Hello World!!!")
    // });
});