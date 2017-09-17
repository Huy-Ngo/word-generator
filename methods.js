const alphabet = "abcdefghijklmnoprstuvwyzʃʒ";
const vowels = "aeiouy";
const consonants = "bcdfghjklmnprstvwzʃʒ";

// buttons
const rev = document.getElementById('rev');
const swa = document.getElementById('swa');
const shu = document.getElementById('shu');
const rot = document.getElementById('rot');
const vow = document.getElementById('vow');
const con = document.getElementById('con');
const bth = document.getElementById('bth');
const ran = document.getElementById('ran');
const ran3 = document.getElementById('ran3');

const buttons = [rev, swa, shu, rot, vow, con, bth, ran, ran3];

// Methods of modifying a word
const reverse = word => word.split('').reverse().join('');
const swap = word => {
	word = word.split('');
	for (let i = 0; i * 2 + 1 < word.length; i++) {
		let temp = word[i * 2];
		word[i * 2] = word[i * 2 + 1];
		word[i * 2 + 1] = temp;
	}
	return word.join('');
}
const shuffle = word => {
	word = word.split('');
	let shuffled = '';
	while (word.length > 0) {
		let index = [Math.floor(Math.random() * word.length)];
		shuffled += word[index];
		word.splice(index, 1);
	}
    return shuffled;
}
const rot13 = word => word.split('')
	.map(letter =>
		alphabet.indexOf(letter) == -1 ? letter : alphabet[(alphabet.indexOf(letter) + 13) % 26]).join('');
const vowelShift = word => word.split('')
	.map(letter =>
		vowels.indexOf(letter) == -1 ? letter : vowels[(vowels.indexOf(letter) + 1) % 6]).join('');
const consonantShift = word => word.split('')
	.map(letter =>
		consonants.indexOf(letter) == -1 ? letter : consonants[(consonants.indexOf(letter) + 1) % 20]).join('');
const bothShift = word => vowelShift(consonantShift(word));
const random = word => {
	let method = Math.floor(Math.random()*7);
	switch (method) {
		case 0:
			return reverse(word);
			break;
		case 1:
			return swap(word);
			break;
		case 2:
			return shuffle(word);
			break;
		case 3:
			return rot13(word);
			break;
		case 4:
			return vowelShift(word);
			break;
		case 5:
			return consonantShift(word);
			break;
		case 6:
			return bothShift(word);
			break;
		default:
			return random(word);
			break;
	}
}
const random3 = word => random(random(random(word)));

const functions = [reverse, swap, shuffle, rot13, vowelShift, consonantShift, bothShift, random, random3];

// Add listeners to buttons

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener('click', (e) => {
		let word = document.getElementsByName('seed')[0].value
		document.getElementsByName('seed')[0].value = functions[i](word);
	});
}