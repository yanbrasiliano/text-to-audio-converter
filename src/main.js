class TextToSpeech {
  constructor() {
    this.voiceSelection = document.querySelector("#voice-selection");
    this.textInput = document.querySelector("#text-input");
    this.playButton = document.querySelector("#play-btn");
    this.downloadTextButton = document.querySelector("#download-text-btn");
    this.fileUpload = document.querySelector("#file-upload");
    this.rateControl = document.querySelector("#rate-control");
    this.rateValue = document.querySelector("#rate-value");

    this.speech = new SpeechSynthesisUtterance();
    this.availableVoices = [];

    this.init();
  }

  init() {
    window.speechSynthesis.onvoiceschanged = () => this.updateVoices();
    this.voiceSelection.addEventListener("change", () => this.selectVoice());
    this.playButton.addEventListener("click", () => this.playText());
    this.downloadTextButton.addEventListener("click", () =>
      this.downloadText()
    );
    this.fileUpload.addEventListener("change", (event) =>
      this.uploadFile(event)
    );
    this.rateControl.addEventListener("input", () => this.updateRate());
  }

  updateVoices() {
    this.availableVoices = window.speechSynthesis.getVoices();
    this.speech.voice = this.availableVoices[0];

    this.voiceSelection.innerHTML = "";
    this.availableVoices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      this.voiceSelection.appendChild(option);
    });
  }

  selectVoice() {
    this.speech.voice = this.availableVoices[this.voiceSelection.value];
  }

  playText() {
    this.speech.text = this.textInput.value;
    window.speechSynthesis.speak(this.speech);
  }

  downloadText() {
    const text = this.textInput.value;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  uploadFile(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.textInput.value = e.target.result;
      };
      reader.readAsText(file);
    }
  }

  updateRate() {
    this.speech.rate = this.rateControl.value;
    this.rateValue.textContent = this.rateControl.value;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TextToSpeech();
});
