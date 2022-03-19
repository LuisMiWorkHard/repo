import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class UtilidadService {

  CODAPLI: string = '039';
  
  constructor(
    private httpCliente: HttpClient
  ) { }
  /**
   * Devuelve una cadena,Default ''
   * @param {Object} value 
   * @return {String} 
   */
   public getString(value: any): string {
    if (!value)
      return '';
    if (typeof value == typeof null) {
      return '';
    }
    return ("" + value).trim();
  }
  /**
   * Returns `true `if the passed value is a string.
   * @param {Object} value The value to test.
   * @return {Boolean} 
   */
  public isString(value: any): boolean {
    return typeof value === 'string';
  }

  /**
   * Returns `true` if the passed value is a boolean.
   *
   * @param {Object} value The value to test.
   * @return {Boolean} 
   */
  public isBoolean(value: any): boolean {
    return typeof value === 'boolean';
  }

  /**
   * Returns `true` if the passed value is a JavaScript Date object, `false` otherwise.
   * @param {String} string dd/mm/yyyy The object to test.
   * @return {Boolean} 
   */
  public isDateString(value: string): boolean {
    return moment(value, "DD/MM/YYYY", true).isValid();
  }

  /**
   * Returns `true` if the passed value is a number. Returns `false` for non-finite numbers.
   * @param {Object} value The value to test.
   * @return {Boolean} 
   */
  public isNumber(value: any): boolean {
    return typeof value === 'number' && isFinite(value);
  }
  /**
   * Retorna `true` si es celular
   * @param {Object} value 
   * @return {Boolean} 
   */
  public isCelular(value: any): boolean {
    var regexCelular = /^[9][0-9]{8}$/;
    return regexCelular.test(value);
  }
  public isFijo(code: string, value: any): boolean {
    var regexFijo01 = /^[0-9]{6}$/;
    var regexFijo02 = /^[0-9]{7}$/;
    if (code.trim().length == 2) {
      return regexFijo02.test(value);
    }
    if (code.trim().length == 3) {
      return regexFijo01.test(value);
    }
    return false;
  }
  /**
   * Retorna `true` si es correo
   * @param {Object} value 
   * @return {Boolean} 
   */
  public isCorreo(value: any): boolean {
    var regexEmail = /^(")?(?:[^\."])(?:(?:[\.])?(?:[\w\-!#$%&'*+\/=?\^_`{|}~]))*\1@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/;
    return regexEmail.test(value);
  }
  /**
   * Retorna `true` si es un número de dni
   * @param {Object} value 
   * @return {Boolean} 
   */
  public isDNI(value: any): boolean {
    var regexDNI = /^[0-9]{8}$/;
    return regexDNI.test(value);
  }
  /**
   * Retorna true si es un teclado numérico
   * @param event 
   * @returns 
   */
  public keyNumber(event: any) {
    var charCode = (event.which) ? event.which : event.keyCode;
    // Only Numbers 0-9
    if ((charCode < 48 || charCode > 57)) {
      event.preventDefault();
      return false;
    } else {
      return true;
    }
  }
  /**
   * Strictly parses the given value and returns the value as a number or `null` if
   * the value is not a number or contains non-numeric pieces.
   * @param {String} value 
   * @return {Number} 
   */
  public parseFloat(value: any): number {
    let floatRe: RegExp = /^[-+]?(?:\d+|\d*\.\d*)(?:[Ee][+-]?\d+)?$/;
    if (value === undefined) {
      value = null;
    }
    if (value !== null && typeof value !== 'number') {
      value = String(value);
      value = floatRe.test(value) ? +value : null;
      if (isNaN(value)) {
        value = null;
      }
    }
    return value;
  }

  /**
   * Strictly parses the given value and returns the value as a number or `null` if
   * the value is not an integer number or contains non-integer pieces.
   * @param {String} value 
   * @return {Number} 
   */
  public parseInt(value: any): number {
    let intRe: RegExp = /^[-+]?\d+(?:[Ee]\+?\d+)?$/;
    if (value === undefined) {
      value = null;
    }
    if (typeof value === 'number') {
      value = Math.floor(value);
    }
    else if (value !== null) {
      value = String(value);
      value = intRe.test(value) ? +value : null;
    }
    return value;
  }

  public getIPAddress() {
    return this.httpCliente.get("https://api.ipify.org/?format=json");
  }
  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        });
    });
  }
}
