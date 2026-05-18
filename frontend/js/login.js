const captchaText =
    document.getElementById("captchaText");

const refreshCaptchaBtn =
    document.getElementById(
        "refreshCaptcha"
    );

const loginForm =
    document.getElementById("loginForm");

const message =
    document.getElementById("message");

let generatedCaptcha = "";


function createCaptcha() {

    generatedCaptcha =
        Math.random()
        .toString(36)
        .substring(2, 8)
        .toUpperCase();

    captchaText.textContent =
        generatedCaptcha;
}

createCaptcha();


refreshCaptchaBtn.addEventListener(
    "click",
    createCaptcha
);


loginForm.addEventListener(
    "submit",
    async (e) => {

        e.preventDefault();

        const captchaInput =
            document.getElementById(
                "captchaInput"
            ).value;

        if (
            captchaInput !== generatedCaptcha
        ) {

            message.style.color =
                "red";

            message.textContent =
                "Invalid Captcha";

            return;
        }

        const loginInput =
            document.getElementById(
                "login_input"
            ).value;

        const password =
            document.getElementById(
                "password"
            ).value;

        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/login",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({

                            login_input:
                                loginInput,

                            password:
                                password
                        })
                    }
                );

            const data =
                await response.json();

            if (response.ok) {

                message.style.color =
                    "green";

                message.textContent =
                    data.message;

                localStorage.setItem(
    "loggedInUser",
    userInput
);

localStorage.setItem(
    "access_token",
    data.access_token
);

                setTimeout(() => {

                    window.location.href =
                        "dashboard.html";

                }, 1000);

            } else {

                message.style.color =
                    "red";

                message.textContent =
                    data.detail ||
                    "Login failed";
            }

        } catch (error) {

            message.style.color =
                "red";

            message.textContent =
                "Server connection failed";
        }

    }
);