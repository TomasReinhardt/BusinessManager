import { Component, OnInit, Output,EventEmitter, Input } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import * as $ from 'jquery';

@Component({
  selector: 'scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent implements OnInit {
  public codigoBarr:string = "";
  @Input() scannerInit: boolean = false;
  @Output() getCodigo = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    $('#buttonRscan').hide();
    this.startScanner();
  }
  
  ngDoCheck() {
    if (this.scannerInit){
      this.startScanner();
      this.scannerInit = false;
    }
  }
  startScanner() {
    Quagga.init({
      locate: false,
      inputStream: {
          name: "Live",
          type: "LiveStream",
          target: '#scanner-container',
          constraints: {
            width: 1280,
            height: 720,
            facingMode: "environment"
          },
          singleChannel: false
      },
      decoder: {
          readers: [
              // "code_128_reader",
              "ean_reader",
              "ean_8_reader",
              // "code_39_reader",
              // "code_39_vin_reader",
              // "codabar_reader",
              // "upc_reader",
              // "upc_e_reader",
              // "i2of5_reader"
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

      Quagga.start();

      // Establecer bandera en se está ejecutando
      // ._scannerIsRunning = true;
    });


    Quagga.onDetected( (result) => {
      if(result.codeResult.code &&( result.codeResult.code.length == 13 || result.codeResult.code.length == 8)){
        this.codigoBarr = result.codeResult.code;
        this.getCodigo.emit(this.codigoBarr);
        this.codigoBarr = "";
        Quagga.stop();
        $('#scanner-container').slideUp();
        $('#buttonRscan').show();
      }
    });
  }

  reScan():void{
    $('#buttonRscan').hide();
    $('#scanner-container').slideToggle();
    this.startScanner();
    this.scannerInit = false;
  }
}
