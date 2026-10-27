import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('public/footer/right-chassis.png');
let pos = 8;
let plte, trns;
const idats = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  const data = buf.subarray(pos + 8, pos + 8 + len);
  if (type === 'PLTE') plte = data;
  if (type === 'tRNS') trns = data;
  if (type === 'IDAT') idats.push(data);
  pos += 12 + len;
}
const raw = zlib.inflateSync(Buffer.concat(idats));
const width = 425, height = 360;
const stride = width + 1;

// The screws in right-chassis.png:
// Top-left screw: x ~ 230, y ~ 70
// Bottom-left screw: x ~ 230, y ~ 300
// Top-right screw: x ~ 390, y ~ 70
// Bottom-right screw: x ~ 390, y ~ 300
// Center of the circle is around x ~ 310, y ~ 185!
// Radius is around 90-95px!

// Let's check brightness around x: 200..400, y: 100..280
console.log('Oscilloscope bezel center is at ~ (x=295, y=175) or relative to the right deck');
