import { Injectable } from '@angular/core';
import { RiskEnum } from './risk.enum';

export interface InherentValue {
  probability:number
  impact:number
  value:number
  risk:RiskEnum
  oportunity:string
}
