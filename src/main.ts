class TextToSpeech {
  private voiceSelection: HTMLSelectElement;
  private textInput: HTMLInputElement;
  private playButton: HTMLButtonElement;
  private downloadTextButton: HTMLButtonElement;
  private fileUpload: HTMLInputElement;
  private rateControl: HTMLInputElement;
  private rateValue: HTMLElement;

  private speech: SpeechSynthesisUtterance;
  private availableVoices: SpeechSynthesisVoice[];

  constructor() {
    this.voiceSelection = document.querySelector(
      "#voice-selection"
    ) as HTMLSelectElement;
    this.textInput = document.querySelector("#text-input") as HTMLInputElement;
    this.playButton = document.querySelector("#play-btn") as HTMLButtonElement;
    this.downloadTextButton = document.querySelector(
      "#download-text-btn"
    ) as HTMLButtonElement;
    this.fileUpload = document.querySelector(
      "#file-upload"
    ) as HTMLInputElement;
    this.rateControl = document.querySelector(
      "#rate-control"
    ) as HTMLInputElement;
    this.rateValue = document.querySelector("#rate-value") as HTMLElement;

    this.speech = new SpeechSynthesisUtterance();
    this.availableVoices = [];

    this.init();
  }

  private init() {
    window.speechSynthesis.onvoiceschanged = () => this.updateVoices();
    this.voiceSelection.addEventListener("change", () => this.selectVoice());
    this.playButton.addEventListener("click", () => this.playText());
    this.downloadTextButton.addEventListener("click", () =>
      this.downloadText()
    );
    this.fileUpload.addEventListener("change", (event: Event) =>
      this.uploadFile(event)
    );
    this.rateControl.addEventListener("input", () => this.updateRate());
  }

  private updateVoices() {
    this.availableVoices = window.speechSynthesis.getVoices();
    this.speech.voice = this.availableVoices[0];

    this.voiceSelection.innerHTML = "";
    this.availableVoices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = index.toString();
      option.textContent = `${voice.name} (${voice.lang})`;
      this.voiceSelection.appendChild(option);
    });
  }

  private selectVoice() {
    const selectedIndex = parseInt(this.voiceSelection.value, 10); // Convert value to number
    this.speech.voice = this.availableVoices[selectedIndex];
  }

  private playText() {
    this.speech.text = this.textInput.value;
    window.speechSynthesis.speak(this.speech);
  }

  private downloadText() {
    const text = this.textInput.value;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "text.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  private uploadFile(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        this.textInput.value = e.target?.result as string;
      };
      reader.readAsText(file);
    }
  }

  private updateRate() {
    this.speech.rate = parseFloat(this.rateControl.value);
    this.rateValue.textContent = this.rateControl.value;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TextToSpeech();
});
