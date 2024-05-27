const randomString = (length) => {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const uniqueStrings = [];
  
    while (uniqueStrings.length < length) {
      const randomString = [];
  
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString.push(characters[randomIndex]);
      }
  
      uniqueStrings.push(randomString.join(""));
    }
  
    return uniqueStrings[Math.floor(Math.random() * uniqueStrings.length)];
  };
  
  //const randomString10 = randomString(10);
  
module.exports={ randomString }