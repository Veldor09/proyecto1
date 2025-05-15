export  function useLogin() {


    const login = (email, password) => {
        // Fake login check
        if (email === "admin" && password === "1234") {        
            return true;
        }
            return false;
    };

    return { login  };
}