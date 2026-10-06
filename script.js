// ==========================================
// GET ALL USERS
// ==========================================

const getAllUser = async () => {

    try {

        const response = await fetch(
            "http://localhost:5000/api/users/getUser"
        );


        // Check HTTP response

        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        // Convert response to JSON

        const data = await response.json();


        console.log("GET USERS RESPONSE:");
        console.log(data);


        // Check API success

        if (!data.success) {

            console.error(
                data.message || "Failed to fetch users"
            );

            return;

        }


        // Get users from API response

        const all_users = data.data;


        // Render users

        render_users(all_users);


    } catch (error) {

        console.error(
            "Get users error:",
            error
        );

    }

};



// ==========================================
// RENDER USERS
// ==========================================

const render_users = (userlist) => {

    const container =
        document.getElementById(
            "user-card-container"
        );


    let list = "";



    // ==========================================
    // NO USERS
    // ==========================================

    if (!userlist || userlist.length === 0) {

        container.innerHTML = `

            <div class="col-12">

                <div class="alert alert-info text-center">

                    No users found.

                </div>

            </div>

        `;


        document
            .getElementById("loader")
            .classList
            .add("d-none");


        return;

    }



    // ==========================================
    // CREATE USER CARDS
    // ==========================================

    userlist.forEach((u) => {


        console.log("USER:");
        console.log(u);


        // Get first letter of name

        const avatar =
            u.name
                ? u.name
                    .charAt(0)
                    .toUpperCase()
                : "U";



        list += `

            <div class="col-12 col-sm-6 col-lg-4">

                <div class="card user-card h-100">

                    <div class="card-body">

                        <div class="d-flex align-items-center gap-3">


                            <!-- Avatar -->

                            <div class="user-avatar">

                                ${avatar}

                            </div>



                            <!-- User Details -->

                            <div>

                                <div class="username">

                                    ${u.name}

                                </div>


                                <div class="email">

                                    ${u.email}

                                </div>

                            </div>


                        </div>

                    </div>

                </div>

            </div>

        `;

    });



    // ==========================================
    // DISPLAY USERS
    // ==========================================

    container.innerHTML = list;



    // ==========================================
    // HIDE LOADER
    // ==========================================

    document
        .getElementById("loader")
        .classList
        .add("d-none");

};



// ==========================================
// LOAD USERS WHEN PAGE LOADS
// ==========================================

getAllUser();



// ==========================================
// JQUERY FORM VALIDATION
// ==========================================

$("#create-user-form").validate({


    // ==========================================
    // VALIDATION RULES
    // ==========================================

    rules: {

        name: {

            required: true,

            minlength: 3,

            maxlength: 50

        },


        email: {

            required: true,

            email: true,

            maxlength: 60

        }

    },



    // ==========================================
    // VALIDATION MESSAGES
    // ==========================================

    messages: {

        name: {

            required:
                "Please enter name",

            minlength:
                "Name must be at least 3 characters",

            maxlength:
                "Name cannot exceed 50 characters"

        },


        email: {

            required:
                "Please enter email",

            email:
                "Please enter a valid email",

            maxlength:
                "Email cannot exceed 60 characters"

        }

    },



    // ==========================================
    // FORM SUBMIT
    // ==========================================

    submitHandler: async function (form) {


        // ==========================================
        // GET FORM VALUES
        // ==========================================

        const name =
            $("#name")
                .val()
                .trim();


        const email =
            $("#email")
                .val()
                .trim();



        console.log("Sending user data:");

        console.log({

            name: name,

            email: email

        });



        try {


            // ==========================================
            // POST USER
            // ==========================================

            const response = await fetch(

                "http://localhost:5000/api/users/postUser",

                {

                    method: "POST",


                    headers: {

                        "Content-Type":
                            "application/json"

                    },


                    body: JSON.stringify({

                        name: name,

                        email: email

                    })

                }

            );



            // ==========================================
            // CONVERT RESPONSE TO JSON
            // ==========================================

            const result =
                await response.json();



            console.log(
                "CREATE USER RESPONSE:"
            );

            console.log(result);



            // ==========================================
            // SUCCESS
            // ==========================================

            if (
                response.ok &&
                result.success
            ) {


                alert(
                    "User created successfully!"
                );



                // ==========================================
                // RESET FORM
                // ==========================================

                form.reset();



                // ==========================================
                // CLOSE MODAL
                // ==========================================

                const modalElement =
                    document.getElementById(
                        "createUserModal"
                    );


                const modal =
                    bootstrap.Modal
                        .getInstance(
                            modalElement
                        );


                if (modal) {

                    modal.hide();

                }



                // ==========================================
                // REFRESH USER LIST
                // ==========================================

                getAllUser();


            } else {


                // ==========================================
                // API ERROR
                // ==========================================

                alert(

                    result.message ||
                    "Failed to create user"

                );

            }


        } catch (error) {


            // ==========================================
            // NETWORK ERROR
            // ==========================================

            console.error(
                "Create user error:",
                error
            );


            alert(
                "Unable to connect to server."
            );

        }

    }

});