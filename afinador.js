// Aguarda o carregamento do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Seleciona os elementos do DOM
    const startBtn = document.getElementById('start-btn');
    const stopBtn = document.getElementById('stop-btn');
    const noteDetected = document.getElementById('note-detected');
    const frequencyElement = document.getElementById('frequency');
    const statusElement = document.getElementById('status');

    // Variáveis para controlar o afinador
    let audioContext;
    let analyser;
    let microphoneStream;
    let isTuning = false;

    // Função para iniciar o afinador
    startBtn.addEventListener('click', function () {
        if (!isTuning) {
            startTuner();
        }
    });

    // Função para parar o afinador
    stopBtn.addEventListener('click', function () {
        if (isTuning) {
            stopTuner();
        }
    });

    // Função para iniciar o afinador
    function startTuner() {
        isTuning = true;
        statusElement.textContent = "Ativando microfone...";

        // Solicita permissão para usar o microfone
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                microphoneStream = audioContext.createMediaStreamSource(stream);
                microphoneStream.connect(analyser);

                analyser.fftSize = 2048;
                statusElement.textContent = "Microfone ativado. Aguardando som...";
                detectPitch();
            })
            .catch(function (err) {
                statusElement.textContent = `Erro ao acessar o microfone: ${err.message}`;
                console.error("Erro ao acessar o microfone:", err);
            });
    }

    // Função para parar o afinador
    function stopTuner() {
        isTuning = false;
        if (microphoneStream) {
            microphoneStream.disconnect();
        }
        if (audioContext) {
            audioContext.close();
        }
        statusElement.textContent = "Afinador parado.";
        noteDetected.textContent = "Nenhuma nota detectada";
        frequencyElement.textContent = "Frequência: 0 Hz";
    }

    // Função para detectar o pitch (nota)
    function detectPitch() {
        if (!isTuning) return;

        const bufferLength = analyser.fftSize;
        const dataArray = new Float32Array(bufferLength);
        analyser.getFloatTimeDomainData(dataArray);

        const frequency = getFrequencyFromAudioData(dataArray);
        const closestNote = getClosestNoteFromFrequency(frequency);

        if (frequency > 0) {
            noteDetected.textContent = closestNote.note;
            frequencyElement.textContent = `Frequência: ${frequency.toFixed(2)} Hz`;
        } else {
            noteDetected.textContent = "Nenhuma nota detectada";
            frequencyElement.textContent = "Frequência: 0 Hz";
        }

        requestAnimationFrame(detectPitch);
    }

    // Função para obter a frequência a partir dos dados de áudio (placeholder)
    function getFrequencyFromAudioData(data) {
        // Aqui você pode implementar um algoritmo real de detecção de pitch
        return Math.random() * 400; // Exemplo temporário de frequência
    }

    // Função para determinar a nota mais próxima com base na frequência
    function getClosestNoteFromFrequency(frequency) {
        const notes = [
            { note: 'E', frequency: 82.41 },
            { note: 'A', frequency: 110.00 },
            { note: 'D', frequency: 146.83 },
            { note: 'G', frequency: 196.00 },
            { note: 'B', frequency: 246.94 },
            { note: 'e', frequency: 329.63 }
        ];

        let closestNote = notes[0];
        let minDiff = Math.abs(frequency - closestNote.frequency);

        for (let i = 1; i < notes.length; i++) {
            const diff = Math.abs(frequency - notes[i].frequency);
            if (diff < minDiff) {
                minDiff = diff;
                closestNote = notes[i];
            }
        }

        return closestNote;
    }
});
