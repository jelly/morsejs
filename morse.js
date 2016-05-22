MORSE = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    // Numbers 
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "0": "-----"
};

jQuery(document).ready(function() {
  var audioCtx;

	function play_morse() {
	  if (audioCtx === undefined) {
      audioCtx = new AudioContext();
    } else {
      audioCtx.close();
      audioCtx = new AudioContext();
    }

		oscillator = audioCtx.createOscillator();
		oscillator.frequency.value = 750; // value in hertz

		var gainNode = audioCtx.createGain();
		gainNode.gain.value = 0;
		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		oscillator.start(0);

		var data = $('.input_morse').val().toUpperCase();
		var text = $('.morsecode');

		text.val('');
		text.show();

		var t = 0;
		var dot = 1.2 / 20;

		for(var i = 0; i < data.length; i++) {
			if(data[i] == ' ') {
				text.val(text.val() + ' ');
				t += dot * 3;
			} else if(MORSE[data[i]] !== undefined) {
				var code = MORSE[data[i]];
				for(var j = 0; j < code.length; j++) {
					switch(code[j]) {
						case '.':
							gainNode.gain.setValueAtTime(1.0, t);
							t += dot;
							gainNode.gain.setValueAtTime(0.0, t);
							break;
						case '-':
							gainNode.gain.setValueAtTime(1.0, t);
							t += dot * 3;
							gainNode.gain.setValueAtTime(0.0, t);
							break;
					}
					text.val(text.val() + code[j]);

					t += 3 * dot;
				}
				text.val(text.val() + ' ');
			}
		}
	}

	$('.play').on('click', function() {
		play_morse();
	});
	$('.morsecode').hide();
});
