function CartID() {
    const generateRandomString = () => {
        const length = 6;
        const characters = "123456890abcdefghijklmnopqrstuvw";
        let randomString = "";
        
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            randomString += characters.charAt(randomIndex);
        }
        
        localStorage.setItem("randomString", randomString);
        return randomString; // Ensure it returns the new random string
    };

    let existingRandomString = localStorage.getItem("randomString");

    if (!existingRandomString) {
        existingRandomString = generateRandomString();
    }

    return existingRandomString;
}

export default CartID;
