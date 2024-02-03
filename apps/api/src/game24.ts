const ar: number[] = [];
const order: number[] = [0, 1, 2];
const op: number[] = [];
const val: number[] = [];
const NOVAL = 9999;
const oper = "+-*/";
let out: string;
let ans: string[] = [];

function rnd(n: number): number {
  return Math.floor(Math.random() * n);
}

function getvalue(x: number, dir: number): number {
  let r = NOVAL;
  if (dir > 0) ++x;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (val[x] !== NOVAL) {
      r = val[x];
      val[x] = NOVAL;
      break;
    }
    x += dir;
  }
  return r;
}

function calc(): number {
  let c = 0,
    l,
    r,
    x;
  val.splice(0, val.length, ...ar.map(String).join("/").split("/").map(Number));
  while (c < 3) {
    x = order[c];
    l = getvalue(x, -1);
    r = getvalue(x, 1);
    switch (op[x]) {
      case 0:
        val[x] = l + r;
        break;
      case 1:
        val[x] = l - r;
        break;
      case 2:
        val[x] = l * r;
        break;
      case 3:
        if (!r || l % r) return 0;
        val[x] = l / r;
    }
    ++c;
  }
  return getvalue(-1, 1);
}

function shuffle(s: string, n: number): void {
  let x = n;
  const p: number[] = eval(s);
  let r, t;
  while (x--) {
    r = rnd(n);
    t = p[x];
    p[x] = p[r];
    p[r] = t;
  }
}

function parenth(n: number): void {
  while (n > 0) {
    --n;
    out += "(";
  }
  while (n < 0) {
    ++n;
    out += ")";
  }
}

function getpriority(x: number): number {
  for (let z = 3; z--; ) if (order[z] == x) return 3 - z;
  return 0;
}

function showsolution(): void {
  let x = 0,
    p = 0,
    lp = 0,
    v = 0;
  while (x < 4) {
    if (x < 3) {
      lp = p;
      p = getpriority(x);
      v = p - lp;
      if (v > 0) parenth(v);
    }
    out += ar[x];
    if (x < 3) {
      if (v < 0) parenth(v);
      out += oper.charAt(op[x]);
    }
    ++x;
  }
  parenth(-p);
  ans.push(out);
  out = "";
}

export default function solve24(s: string): string[] {
  ans = [];
  for (let z = 0; z < 4; z++) ar[z] = parseInt(s[z], 10);
  out = "";
  for (let z = 100000; z--; ) {
    const r = rnd(256);
    op[0] = r & 3;
    op[1] = (r >> 2) & 3;
    op[2] = (r >> 4) & 3;
    shuffle("ar", 4);
    shuffle("order", 3);
    if (calc() === 24) {
      showsolution();
    }
  }
  return [...new Set(ans)];
}
