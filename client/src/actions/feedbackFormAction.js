export const postFeedBack = (firstname , lastname, telnum, email, agree, contactType, message) => (dispatch) => {
    const Form = {
        firstname: firstname,
        lastname: lastname,
        telnum: telnum,
        email: email,
        agree: agree,
        contactType: contactType,
        message: message
    }

    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(Form),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var err = new Error("Error" + response.status + response.statusText);
            err.response = response;
            throw err;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => {
        // response.json();
        response.json();
        alert(response);
        // alert(response)
    })
    .catch(error => {console.log('Submit Feedback', error.message);
        alert("Your Form could not be submitted");
    });
}