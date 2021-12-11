const DeviceHost = "192.168.1.14";
export const onSubmitRegisterForm = async (email, password) => {
    try {
        const body = { email, password };
        const response = await fetch(`http://${DeviceHost}:3000/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        //const parseRes = await response.json()
        console.log("register sucsess ");

    } catch (err) {
        console.error(err.message);
    }
}
export const onSubmitLoginForm = async (email, password) => {
    try {
        const res = await fetch(`http://${DeviceHost}:3000/auth/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        return res.json();
    }
    catch (err) {
        console.log('error with login')
    }

}




