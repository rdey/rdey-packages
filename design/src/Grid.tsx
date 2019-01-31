import { PureComponent } from "react";


/* (p/l)(s/m/l)(device) = (portrait/landscape)(small/medium/large)(handset/tablet/computer) */
type pshandset = 0;
type pmhandset = 360;
type plhandset = 400;
type lshandset = 480;
type pstablet = 600;
type pltablet = 720;
type llhandset = 840;
type lstablet = 960;
type lltablet = 1024;
type scomputer = 1280;
type lcomputer = 1360;

type px =
  | pshandset
  | pmhandset
  | plhandset
  | lshandset
  | pstablet
  | pltablet
  | llhandset
  | lstablet
  | lltablet
  | scomputer
  | lcomputer;

export const pshandset: pshandset = 0;
export const pmhandset: pmhandset = 360;
export const plhandset: plhandset = 400;
export const lshandset: lshandset = 480;
export const pstablet: pstablet = 600;
export const pltablet: pltablet = 720;
export const llhandset: llhandset = 840;
export const lstablet: lstablet = 960;
export const lltablet: lltablet = 1024;
export const scomputer: scomputer = 1280;
export const lcomputer: lcomputer = 1360;


class Grid extends PureComponent {
  public render() {
    return (
      null
    );
  }
}

export default Grid
