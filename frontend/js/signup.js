const dobInput = document.getElementById("dob");
const ageInput = document.getElementById("age");

const captchaText =
    document.getElementById("captchaText");

const refreshCaptchaBtn =
    document.getElementById("refreshCaptcha");

const generateOtpBtn =
    document.getElementById("generateOtpBtn");

const otpDisplay =
    document.getElementById("otpDisplay");

const timerDisplay =
    document.getElementById("timer");

const signupForm =
    document.getElementById("signupForm");

const message =
    document.getElementById("message");

let generatedCaptcha = "";
let generatedOtp = "";
let otpValid = false;


dobInput.addEventListener("change", () => {

    if (!dobInput.value) {

        ageInput.value = "";

        return;
    }

    const dob = new Date(dobInput.value);

    const today = new Date();

    let age =
        today.getFullYear() -
        dob.getFullYear();

    const monthDifference =
        today.getMonth() -
        dob.getMonth();

    if (
        monthDifference < 0 ||
        (
            monthDifference === 0 &&
            today.getDate() < dob.getDate()
        )
    ) {
        age--;
    }

    if (age < 0) {
        ageInput.value = "";
        return;
    }

    ageInput.value = age;
});


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


generateOtpBtn.addEventListener(
    "click",
    () => {

        generatedOtp =
            Math.floor(
                100000 +
                Math.random() * 900000
            ).toString();

        otpDisplay.textContent =
            `OTP: ${generatedOtp}`;

        otpValid = true;

        let seconds = 30;

        timerDisplay.textContent =
            `OTP expires in ${seconds}s`;

        const interval = setInterval(() => {

            seconds--;

            timerDisplay.textContent =
                `OTP expires in ${seconds}s`;

            if (seconds <= 0) {

                clearInterval(interval);

                generatedOtp = "";

                otpValid = false;

                otpDisplay.textContent = "";

                timerDisplay.textContent =
                    "OTP Expired";
            }

        }, 1000);

    }
);


signupForm.addEventListener(
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
            message.textContent =
                "Invalid Captcha";

            return;
        }

        const enteredOtp =
            document.getElementById(
                "otpInput"
            ).value;

        if (
            !otpValid ||
            enteredOtp !== generatedOtp
        ) {
            message.textContent =
                "Invalid or Expired OTP";

            return;
        }
        const mobile =
    document.getElementById(
        "mobile_number"
    ).value;

if (!/^[0-9]{10}$/.test(mobile)) {

    message.style.color = "red";

    message.textContent =
        "Mobile number must be 10 digits";

    return;
}
const password =
    document.getElementById(
        "password"
    ).value;

const confirmPassword =
    document.getElementById(
        "confirm_password"
    ).value;

if (password !== confirmPassword) {

    message.style.color = "red";

    message.textContent =
        "Passwords do not match";

    return;
}
        const userData = {

            first_name:
                document.getElementById(
                    "first_name"
                ).value,

            middle_name:
                document.getElementById(
                    "middle_name"
                ).value,

            last_name:
                document.getElementById(
                    "last_name"
                ).value,

            gender:
                document.getElementById(
                    "gender"
                ).value,

            dob:
                document.getElementById(
                    "dob"
                ).value,

            email:
                document.getElementById(
                    "email"
                ).value,

            mobile_number:
                document.getElementById(
                    "mobile_number"
                ).value,

            password:
                document.getElementById(
                    "password"
                ).value,

            confirm_password:
                document.getElementById(
                    "confirm_password"
                ).value
        };

        try {

            const response = await fetch(
                "http://127.0.0.1:8000/signup",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify(
                        userData
                    )
                }
            );

            const data =
                await response.json();

            if (response.ok) {

                message.style.color =
                    "green";

                message.textContent =
                    data.message;

            } else {

                message.style.color =
                    "red";

                if (Array.isArray(data.detail)) {

    message.textContent =
        data.detail
        .map(error => error.msg)
        .join(", ");

} else {

    message.textContent =
        data.detail || "Signup failed";
}
            }

        } catch (error) {

            message.style.color =
                "red";

            message.textContent =
                "Server connection failed";
        }

    }
);