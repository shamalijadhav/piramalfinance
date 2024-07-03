// import { ProductLogics } from "./loadformlogic";
// import { otpPopupFailureFun, removeLoader } from "../../../../clientlibs/support/otppopup/js/otppopup";
import { fetchAPI } from "../../scripts/scripts.js";
import { accessTokenURL, generateOTPURL, leadAPIURL, otpTokenURL, resendOTPUrl, smsURL, verifyOTPURL } from "./loanformapiurls.js";
import { cutomerEmployment, cutomerNo, loanFromBtn, loanOtpInput, loanProduct } from "./loanformdom.js";
import { ProductLogics } from "./loanformlogic.js";


let loanStatus = "Rejected";

export function buttonCLick() {


    loanFromBtn().addEventListener("click", function ({ currentTarget }) {
        // debugger;
        currentTarget.closest(".loan-form-button-container").classList.add("loader-initialized");
        loanOtpInput().value = "";
        workFlow();
    });
}

export function getAccessToken() {
    return new Promise(function (resolve) {
        if (!isTimePassed(sessionStorage.getItem("tokenexpiretime"))) {
            resolve(sessionStorage.getItem("accesstoken"));
        } else {
            AccessTokenAPI()
                .then(function (accessTokenRsp) {
                    let accessTokenRspObj = getJsonObj(accessTokenRsp);
                    sessionStorage.setItem("accesstoken", accessTokenRspObj.responseJson.accesstoken);
                    sessionStorage.setItem("tokenexpiretime", accessTokenRspObj.responseJson.tokenexpiretime);
                    resolve(accessTokenRspObj.responseJson.accesstoken);
                });
        }
    });
}

export function AccessTokenAPI() {
    const requestJson = {
        requestJson: {
            "client_id": "79641f863d2a4151b7fcaadfece67e9e",
            "client_secret": "2a86f9105b464e8389883d2362cb96b0",
            "source": "WebApp"
        },
    }

    return new Promise(async function (resolve, reject) {
        try {
            // const request = new Request(accessTokenURL, {
            //     method: "POST",
            //     body: JSON.stringify(requestJson),
            // });

            const response = await fetchAPI("POST", accessTokenURL, requestJson);
            resolve(response);
        } catch (error) {
            reject(error)
            showNetworkFailedScreen(error);

        }
        // callPostAPI(accessTokenURL, requestJson)
        //     .then(function (response) {
        //         resolve(response);
        //     })
        //     .catch(function (error) {
        //         console.warn(error);
        //         reject(error);
        //         showNetworkFailedScreen(error);
        //     });
    });
}

export function generateOTPAPI(access_token, mobileno, productName) {
    let requesObj = {
        requestJson: {
            "mobileno": mobileno,
            "source": "External",
            "productName": productName
        },
        "headerJson": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + access_token
        }
    }

    return new Promise((resolve, reject) => {
        fetchAPI("POST", generateOTPURL, requesObj)
            .then(function (generateOTPRsp, reject) {
                let generateOTPRspObj = getJsonObj(generateOTPRsp);
                let otpAuthId = generateOTPRspObj.responseJson.authUniqueId;
                sessionStorage.setItem("otpAuthId", otpAuthId);
                resolve(generateOTPRspObj.responseJson);
            })
            .catch(function (error) {
                console.warn(error);
                showNetworkFailedScreen(error);
            });
    });
}

function getOtpToken(generateOtpAuthId) {
    let requesObj = {
        requestJson: "client_id=gx7vVKKAcOCGIpWc6O7kBYRo209OAHhq&client_secret=L3pARR8QWmanaNVC&grant_type=client_credentials"
    }

    // return new Promise((resolve, reject) => {
    //     callPostAPI(otpTokenURL, requesObj)
    //         .then(function(otpTokenRsp) {
    //             let otpTokenRspObj = getJsonObj(otpTokenRsp);
    //             resolve(otpTokenRspObj);
    //         })
    //         .catch(function(error) {
    //             console.warn(error);
    //         });
    // });

    return new Promise(function (resolve, reject) {
        var data = "client_id=gx7vVKKAcOCGIpWc6O7kBYRo209OAHhq&client_secret=L3pARR8QWmanaNVC&grant_type=client_credentials";

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    resolve(JSON.parse(this.responseText));
                } else {
                    reject(new Error('Request failed with status ' + this.status));
                }
            }
        });

        xhr.open("POST", otpTokenURL);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        // WARNING: Cookies will be stripped away by the browser before sending the request.
        xhr.setRequestHeader("Cookie", "CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1");

        xhr.send(data);
    });

    return new Promise(function (resolve, reject) {
        resolve("8jy1AFXCXeV3Hv4Xwh34LVRbZdYE");
    });
}

function smsAPI(accessToken) {
    let requesObj = {
        requestJson: {},
        headerJson: {
            Authorization: "Bearer " + accessToken
        }
    }

    return new Promise((resolve, reject) => {
        fetchAPI("POST", smsURL, requesObj)
            .then(function (smsURLRes) {
                let smsURLResObj = getJsonObj(smsURLRes);
                resolve(smsURLResObj.responseJson.access_token);
            })
            .catch(function (error) {
                console.warn(error);
                showNetworkFailedScreen(error);
            });
    });
}

function leadAPI(accessToken) {
    let requestObj = {
        requestJson: getLeadFormData(loanStatus),
        headerJson: {
            Authorization: "Bearer " + accessToken
        }
    }

    return new Promise(function (resolve, reject) {
        fetchAPI("POST", leadAPIURL, requestObj)
            .then(function (response) {
                console.log("Data inserted successfully.");
                resolve("Data inserted successfully.");
            });
    });
}

export function verfyOtpAPI(otp) {
    let requestObj = {
        requestJson: {
            "authUniqueId": sessionStorage.getItem("otpAuthId"),
            "source": "External",
            "otp": otp
        },
        headerJson: {
            Authorization: "Bearer " + sessionStorage.getItem("accesstoken")
        }
    }

    return new Promise(function (resolve, reject) {
        fetchAPI("POST",
            verifyOTPURL, requestObj)
            .then(function (response) {
                resolve(response.responseJson);
            }).catch(function (err) {
                showNetworkFailedScreen(err);
            })
    });
}

export function resendOtpAPI(loanProduct) {
    let requesObj = {
        requestJson: {
            "authUniqueId": sessionStorage.getItem("otpAuthId"),
            "source": "External",
            "productName": loanProduct
        },
        headerJson: {
            Authorization: "Bearer " + sessionStorage.getItem("accesstoken")
        }
    }

    return new Promise(function (resolve, reject) {
        fetchAPI("POST", resendOTPUrl, requesObj)
            .then(function (response) {
                resolve(response);
            }).catch(function (err) {
                showNetworkFailedScreen(err);
            })
    });
}

export function workFlow() {
    getAccessToken()
        .then(accesstoken => {
            return generateOTPAPI(accesstoken, cutomerNo().value, loanProduct().dataset.loanType)
        })
        .then(function () {
            console.log("Data inserted successfully");
            verifyOtpBtnClick();
            resendOtpBtnClick();
        })
        .catch(function (err) {
            console.warn(err, err.message);
            showNetworkFailedScreen(err);
        })
        .finally(function () {
            loanFromBtn().closest(".loan-form-button-container").classList.remove("loader-initialized");
        });
}

function getLeadFormData(loanStatus) {
    const formLoanType = document.querySelector('#form-loan-type')?.value;
    const formLoanAmount = document.querySelector('#form-loan-amount')?.value;
    const formCustomerName = document.querySelector('#form-customer-name')?.value;
    const formCustomerNo = document.querySelector('#form-customer-no')?.value;
    const Occupation = document.querySelector('[name=emplyoment]:checked').id == "radio-salary" ? "Salaried" : "Business";
    const formIncome = document.querySelector('#form-income')?.value;
    const formDOB = document.querySelector('#loan-form-dob')?.value;
    const formState = document.querySelector('#form-state')?.value;
    const formBranchCity = document.querySelector('#form-branch-city')?.value;

    const leadDataObj = {
        "Name": formCustomerName,
        "MobileNumber": formCustomerNo,
        "Occupation": Occupation,
        "LoanProduct": formLoanType,
        "MonthlyIncome": formIncome,
        "LoanAmount": formLoanAmount,
        "DateOfBirth": formDOB,
        "State": formState,
        "Branch": formBranchCity,
        "RejectStatus": loanStatus
    }

    return { "LeadData": leadDataObj };
}

function getJsonObj(data) {
    return typeof data == 'string' ? JSON.parse(data) : data;
}

function verifyOtpBtnClick() {
    let verifyOtpBtn = document.querySelector("#loan-from-otp-verify");
    if (verifyOtpBtn.dataset.isEvent) {
        return;
    }
    verifyOtpBtn.addEventListener("click", function () {
        let otpValue = document.querySelector("#loan-form-otp-input").value;
        verifyOtpBtn.closest(".loan-form-button-container").classList.add("loader-initialized");

        if (otpValue) {
            verfyOtpAPI(otpValue)
                .then(function ({ returnResponse }) {
                    let statusCode = returnResponse.statusCode;

                    let otpMsgElement = document.querySelector(".wrongotpmessage");
                    if (statusCode != 100) {
                        otpMsgElement.style.display = "block";
                        return;
                    } else {
                        otpMsgElement.style.display = "none";
                    }

                    let loaninnerform = document.querySelector(".loan-form-sub-parent");

                    if (ProductLogics(loanFormCriteria())) {
                        loaninnerform.classList.add("loan-form-success");
                        loanStatus = "Approved";
                    } else {
                        loaninnerform.classList.add("loan-form-request-fail");
                        loanStatus = "Rejected";
                    }

                    leadAPI(sessionStorage.getItem("accesstoken"))
                        .catch(function (error) {
                            console.warn(error);
                            showNetworkFailedScreen(error);
                        });
                })
                .catch(function (error) {
                    console.warn("verifyOtpErr: " + error);
                    showNetworkFailedScreen(error);
                })
                .finally(function () {
                    verifyOtpBtn.closest(".loan-form-button-container").classList.remove("loader-initialized");
                });
        }
    });
    verifyOtpBtn.dataset.isEvent = true;
}

function resendOtpBtnClick() {
    let resendOtpBtn = document.querySelector("#loan-form-resend-otp");
    if (resendOtpBtn.dataset.isEvent) {
        return;
    }

    resendOtpBtn.addEventListener("click", function () {
        resendOtpAPI(loanProduct().dataset.loanType)
            .then(function ({ responseJson }) {
                let otpAuthId = responseJson.authUniqueId;
                sessionStorage.setItem("otpAuthId", otpAuthId);
                console.log(responseJson.returnResponse.message);
            })
            .catch(function (error) {
                console.warn("resendOtpErr: " + error);
                showNetworkFailedScreen(error);
            });
    });

    resendOtpBtn.dataset.isEvent = true;
}

function isTimePassed(timestamp) {
    if (!timestamp || timestamp == "undefined") return true;
    const currentTime = new Date();
    const givenTime = new Date(timestamp);
    console.log(givenTime, givenTime < currentTime);
    return givenTime < currentTime;
}

function loanFormCriteria() {
    let product = loanProduct().dataset.loanType;
    let occupation = cutomerEmployment().id == "radio-salary" ? "salaried" : "business";



    return getProductMap(product, occupation);
}

function getProductMap(product, occupation) {
    if (product == "hl" || product == "msme") return occupation == "salaried" ? "otherLoanSAL" : "otherLoanSE";

    if (product == "ubl") return occupation == "business" ? "bussinessLoan" : false;

    if (product == "pl") return occupation == "salaried" ? "personalLoan" : false;

    if (product == "ucl") return occupation == "salaried" ? "preOwnedCarLoanSAL" : "preOwnedCarLoanSE";

    return false;
}

export function showNetworkFailedScreen(err) {
    if (err.code == "ERR_NETWORK") {
        let loaninnerform = document.querySelector(".loan-form-sub-parent");
        loaninnerform.classList.add("loan-form-something-wrong");
        let otpPopupFailure = document.querySelector('.failedContainer');
        otpPopupFailureFun(otpPopupFailure);
    }
}