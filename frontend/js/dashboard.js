const token =
    localStorage.getItem(
        "access_token"
    );

if (!token) {

    window.location.href =
        "login.html";
}


let editingCitizenId = null;


const citizenForm =
    document.getElementById(
        "citizenForm"
    );

const citizenTableBody =
    document.getElementById(
        "citizenTableBody"
    );

const message =
    document.getElementById(
        "message"
    );

const searchInput =
    document.getElementById(
        "searchInput"
    );

const dobInput =
    document.getElementById(
        "dob"
    );

const ageInput =
    document.getElementById(
        "age"
    );


if (
    !localStorage.getItem(
        "loggedInUser"
    )
) {

    window.location.href =
        "login.html";
}


document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    () => {

        localStorage.removeItem(
            "loggedInUser"
        );

        localStorage.removeItem(
            "access_token"
        );

        window.location.href =
            "login.html";
    }
);


dobInput.addEventListener(
    "change",
    () => {

        const dob =
            new Date(dobInput.value);

        const today =
            new Date();

        let age =
            today.getFullYear() -
            dob.getFullYear();

        const monthDiff =
            today.getMonth() -
            dob.getMonth();

        if (

            monthDiff < 0 ||

            (
                monthDiff === 0 &&
                today.getDate() <
                dob.getDate()
            )
        ) {

            age--;
        }

        ageInput.value = age;
    }
);


async function loadCitizens() {

    try {

        const response =
            await fetch(
                "http://127.0.0.1:8000/citizens",

                {
                    headers: {

                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const citizens =
            await response.json();

        citizenTableBody.innerHTML = "";

        if (citizens.length === 0) {

            citizenTableBody.innerHTML = `

                <tr>

                    <td colspan="8">
                        No citizens found
                    </td>

                </tr>
            `;

            return;
        }

        citizens.forEach((citizen) => {

            const row =
                document.createElement("tr");

            row.innerHTML = `

                <td>${citizen.id}</td>

                <td>
                    ${citizen.first_name}
                    ${citizen.middle_name || ""}
                    ${citizen.last_name}
                </td>

                <td>${citizen.gender}</td>

                <td>${citizen.age}</td>

                <td>${citizen.email}</td>

                <td>${citizen.mobile_number}</td>

                <td>${citizen.city}</td>

                <td>

                    <button
                        onclick='editCitizen(${JSON.stringify(citizen)})'
                    >
                        Edit
                    </button>

                    <button
                        onclick="deleteCitizen(${citizen.id})"
                    >
                        Delete
                    </button>

                </td>
            `;

            citizenTableBody.appendChild(
                row
            );
        });

    } catch (error) {

        console.error(error);

        message.style.color = "red";

        message.textContent =
            "Failed to load citizens";
    }
}


citizenForm.addEventListener(
    "submit",

    async (e) => {

        e.preventDefault();

        const citizenData = {

            first_name:
                document.getElementById(
                    "first_name"
                ).value.trim(),

            middle_name:
                document.getElementById(
                    "middle_name"
                ).value.trim(),

            last_name:
                document.getElementById(
                    "last_name"
                ).value.trim(),

            gender:
                document.getElementById(
                    "gender"
                ).value,

            dob:
                document.getElementById(
                    "dob"
                ).value,

            age:
                parseInt(
                    document.getElementById(
                        "age"
                    ).value
                ),

            email:
                document.getElementById(
                    "email"
                ).value.trim(),

            mobile_number:
                document.getElementById(
                    "mobile_number"
                ).value.trim(),

            city:
                document.getElementById(
                    "city"
                ).value.trim(),

            state:
                document.getElementById(
                    "state"
                ).value.trim(),

            country:
                document.getElementById(
                    "country"
                ).value.trim()
        };


        if (
            citizenData.mobile_number.length !== 10
        ) {

            message.style.color = "red";

            message.textContent =
                "Mobile number must be 10 digits";

            return;
        }


        try {

            const url =
                editingCitizenId
                ? `http://127.0.0.1:8000/citizens/${editingCitizenId}`
                : "http://127.0.0.1:8000/citizens";

            const method =
                editingCitizenId
                ? "PUT"
                : "POST";

            const response =
                await fetch(url, {

                    method: method,

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`
                    },

                    body: JSON.stringify(
                        citizenData
                    )
                });

            const data =
                await response.json();

            if (response.ok) {

                message.style.color =
                    "green";

                message.textContent =
                    data.message;

                citizenForm.reset();

                editingCitizenId = null;

                loadCitizens();

            } else {

                message.style.color =
                    "red";

                message.textContent =
                    data.detail ||
                    "Operation failed";
            }

        } catch (error) {

            console.error(error);

            message.style.color =
                "red";

            message.textContent =
                "Server Error";
        }
    }
);


async function deleteCitizen(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this citizen?"
        );

    if (!confirmDelete) {

        return;
    }

    try {

        const response =
            await fetch(

                `http://127.0.0.1:8000/citizens/${id}`,

                {
                    method: "DELETE",

                    headers: {

                        "Authorization":
                            `Bearer ${token}`
                    }
                }
            );

        const data =
            await response.json();

        if (response.ok) {

            message.style.color =
                "green";

            message.textContent =
                data.message;

            loadCitizens();

        } else {

            message.style.color =
                "red";

            message.textContent =
                data.detail;
        }

    } catch (error) {

        console.error(error);

        message.style.color =
            "red";

        message.textContent =
            "Delete failed";
    }
}


function editCitizen(citizen) {

    editingCitizenId =
        citizen.id;

    document.getElementById(
        "first_name"
    ).value =
        citizen.first_name;

    document.getElementById(
        "middle_name"
    ).value =
        citizen.middle_name || "";

    document.getElementById(
        "last_name"
    ).value =
        citizen.last_name;

    document.getElementById(
        "gender"
    ).value =
        citizen.gender;

    document.getElementById(
        "dob"
    ).value =
        citizen.dob;

    document.getElementById(
        "age"
    ).value =
        citizen.age;

    document.getElementById(
        "email"
    ).value =
        citizen.email;

    document.getElementById(
        "mobile_number"
    ).value =
        citizen.mobile_number;

    document.getElementById(
        "city"
    ).value =
        citizen.city;

    document.getElementById(
        "state"
    ).value =
        citizen.state;

    document.getElementById(
        "country"
    ).value =
        citizen.country;

    window.scrollTo({

        top: 0,

        behavior: "smooth"
    });

    message.style.color =
        "blue";

    message.textContent =
        "Editing citizen...";
}


searchInput.addEventListener(
    "keyup",

    () => {

        const value =
            searchInput.value
            .toLowerCase();

        const rows =
            document.querySelectorAll(
                "tbody tr"
            );

        rows.forEach((row) => {

            row.style.display =

                row.innerText
                .toLowerCase()
                .includes(value)

                ? ""

                : "none";
        });
    }
);


loadCitizens();