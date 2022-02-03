import { Component, OnInit } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import * as $ from 'jquery';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: '#scanner-container' 
        },
        decoder: {
            readers: [
                "code_128_reader",
                "ean_reader",
                "ean_8_reader",
                "code_39_reader",
                "code_39_vin_reader",
                "codabar_reader",
                "upc_reader",
                "upc_e_reader",
                "i2of5_reader"
            ],
        },

    }, (err:any) => {

      Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay;
        var drawingCanvas = Quagga.canvas.dom.overlay;
        
        if (result) {
          if (result.boxes) {
            if(drawingCanvas.attributes[2].nodeValue && drawingCanvas.attributes[3].nodeValue){
              drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.attributes[2].nodeValue), parseInt(drawingCanvas.attributes[3].nodeValue));
              result.boxes.filter((box) => {
                  return box !== result.box;
              }).forEach((box) => {
                  Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, { color: "green", lineWidth: 2 });
              });
            }
          }
  
          if (result.box) {
            Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, { color: "#00F", lineWidth: 2 });
          }
  
          if (result.codeResult && result.codeResult.code) {
            Quagga.ImageDebug.drawPath(result.line, { x: 'x', y: 'y' }, drawingCtx, { color: 'red', lineWidth: 3 });
          }
        }
      });

      if (err) {
          console.log(err);
          return
      }

      console.log("Initialization finished. Ready to start");
      Quagga.start();

      // Establecer bandera en se está ejecutando
      // ._scannerIsRunning = true;
    });


    Quagga.onDetected(function (result) {
      if(result.codeResult.code && result.codeResult.code.length == 13){
        console.log("Barcode detected and processed : [" + result.codeResult.code + "]");
        Quagga.stop();
      }
    });
  }

}
