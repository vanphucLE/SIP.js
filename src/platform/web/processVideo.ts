import * as bodyPix from "@tensorflow-models/body-pix";
import "@tensorflow/tfjs";

class blurBackground {
  net: any = null;
  loadedVideo = false;
  rawVideo: any = null;
  isBlur = false;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;

  constructor() {
    this.video = document.createElement("video");
    this.video.width = 480;
    this.video.height = 320;

    this.canvas = document.createElement("canvas");

    this.loadModel();
  }

  async loadModel() {
    const options = {
      multiplier: 0.75,
      stride: 32,
      quantBytes: 4
    };
    bodyPix.load(options).then((val: any) => {
      this.net = val;
    });
  }

  async processVideo() {
    this.loadedVideo = true;
    while (this.loadedVideo) {
      const segmentation = await this.net.segmentPerson(this.video);

      const backgroundBlurAmount = 6;
      const edgeBlurAmount = 2;
      const flipHorizontal = false;

      bodyPix.drawBokehEffect(
        this.canvas,
        this.video,
        segmentation,
        backgroundBlurAmount,
        edgeBlurAmount,
        flipHorizontal
      );
    }
  }

  addVideo(videoStream: any) {
    this.rawVideo = videoStream;
    videoStream.oninactive = () => {
      this.loadedVideo = false;
      this.rawVideo = null;
      console.log("[Pb Logs] Video Stream ended");
    };

    console.log("[Pb Logs] VideoStream need to process is", videoStream);

    this.video.srcObject = videoStream;
    console.log("[Pb Logs] VideoStream need to process is", this.video);

    this.video.onloadeddata = () => {
      this.processVideo();
      this.video.play();
    };
  }

  result() {
    if (this.isBlur) {
      return this.canvas.captureStream(10);
    } else {
      return this.rawVideo;
    }
  }
}

const processor = new blurBackground();

export default processor;
