export class CounterLetterInWordService {
  counterLetters(word: string) {
    const counter: { [key: string]: number } = {};
    const regex = /[a-zA-ZÀ-ÿ]/;
    for (const letter of word.toLowerCase()) {
      if (regex.test(letter)) {
        counter[letter] = (counter[letter] || 0) + 1;
      }
    }
    return JSON.stringify(counter);
  }
  counterRLetters(word: string) {
    let rCount = 0;
    for (const letter of word.toLowerCase()) {
      if (letter === "r") {
        rCount++;
      }
    }
    return String(rCount);
  }
}
