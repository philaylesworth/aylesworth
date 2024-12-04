"use strict";

let kcc = JSON.parse(localStorage.getItem('kcc'));
if (!kcc?.units) {
  kcc = {
    units: 30,
    size: 1000,
    cost: 330,
    land: 1000000,
    parking: 1,
    common: 4000,
  }
}

const unitsEl = document.getElementById('units');
const sizeEl = document.getElementById('size');
const costEl = document.getElementById('cost');
const landEl = document.getElementById('land');
const parkingEl = document.getElementById('parking');
const commonEl = document.getElementById('common');

unitsEl.value = kcc.units;
sizeEl.value = kcc.size;
costEl.value = kcc.cost;
landEl.value = kcc.land;
parkingEl.value = kcc.parking;
commonEl.value = kcc.common;

function getValue(id) {
  const cell = document.getElementById(id);
  return parseInt(cell.textContent.replace(/\,/g, ''));
}

function setValue(id, value) {
  const cell = document.getElementById(id);
  cell.textContent = new Intl.NumberFormat().format(Math.round(value));
}

function update(event) {
  if (event) {
    kcc[event?.target?.id] = event.target.value;
  }

  setValue('units2', kcc.units);
  setValue('sqft2', kcc.size);

  setValue('landf1', kcc.land);
  setValue('landt1', kcc.land);
  const landSub = +kcc.land + getValue('landt2');
  setValue('landSub', landSub)

  setValue('units1', kcc.units);
  setValue('sqft1', kcc.size);
  setValue('buildb3', kcc.units * kcc.size);
  setValue('buildm3', kcc.cost);
  setValue('buildt3', kcc.units * kcc.size * kcc.cost);
  setValue('buildb4', kcc.common);
  setValue('buildm4', kcc.cost);
  setValue('buildt4', kcc.common * kcc.cost);
  setValue('buildb5', (getValue('buildb3') + getValue('buildb4')) * 0.2);
  setValue('buildm5', kcc.cost);
  setValue('buildt5', getValue('buildb5') * kcc.cost);
  const buildSub = getValue('buildt3') + getValue('buildt4') + getValue('buildt5') + getValue('buildt6');
  setValue('buildSub', buildSub);

  const cars = Math.round(kcc.units * kcc.parking);
  setValue('sitecars', cars);
  setValue('siteb2', cars * 250);
  setValue('sitet2', cars * 250 * 5);
  const siteSub = getValue('sitet1') + getValue('sitet2') + getValue('sitet3');
  setValue('sitesub', siteSub);

  setValue('softb1', buildSub);
  setValue('softt1', buildSub * 0.1);
  const softSub = buildSub * 0.1 + getValue('softf2');
  setValue('softsub', softSub);

  const subtotal = landSub + buildSub + siteSub + softSub;
  setValue('contb1', subtotal);
  const contSub = subtotal * 0.1
  setValue('contt1', contSub);
  setValue('contsub', contSub);

  setValue('total', subtotal + contSub);

  setValue('avecost', subtotal * 1.1 / kcc.units);

  localStorage.setItem('kcc', JSON.stringify(kcc));
}

// input or change?
unitsEl.addEventListener('input', update);
sizeEl.addEventListener('input', update);
costEl.addEventListener('input', update);
landEl.addEventListener('input', update);
parkingEl.addEventListener('input', update);
commonEl.addEventListener('input', update);
update();