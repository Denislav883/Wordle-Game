export const getRandomWord = async () => {

    try {
        const response = await fetch('https://random-word-api.herokuapp.com/word?length=5'); // get a random 5 letters word from a random word api(the word comes in an array)

        const [word] = await response.json();

        return word;
    } catch (e) {
        console.error('Error', e);
    }
}