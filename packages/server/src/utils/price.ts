import { Cents } from '@package/common';

export const toPriceFormat = (price: Cents): Cents => {
  return +price.toFixed(0);
};

export const toGrossPrice = (price: Cents, taxRate: number): Cents => {
  const taxMultiplier = taxRate / 100 + 1;
  return toPriceFormat(price * taxMultiplier);
};

export const toNetPrice = (price: Cents, taxRate: number): Cents => {
  const taxMultiplier = taxRate / 100 + 1;
  return toPriceFormat(price / taxMultiplier);
};
