import { Interval, DateTime } from 'luxon';

const CHARCODE_A = 'A'.charCodeAt(0);
const CHARCODE_0 = '0'.charCodeAt(0);

const FORMAT = /^[0-9A-Z]{1,}$/;

const FORMAT_ISVALID = /^[0-9A-Z]{18}[0-9]{2}$/;
const FORMAT_GENERATE = /^[0-9A-Z]{18}$/;

function mod97(value) {
  let buffer = 0;
  let charCode;

  for (let i = 0; i < value.length; i += 1) {
    charCode = value.charCodeAt(i);

    buffer = charCode
      + (charCode >= CHARCODE_A
        ? buffer * 100 - CHARCODE_A + 10
        : buffer * 10 - CHARCODE_0);

    if (buffer > 1000000) {
      buffer %= 97;
    }
  }

  return buffer % 97;
}

function stringifyInput(rawValue) {
  if (rawValue !== null && rawValue !== undefined) {
    switch (typeof rawValue) {
      case 'string':
        return rawValue.toUpperCase();
      default:
        throw new Error(
          `Expecting value of type 'string', found: '${typeof rawValue}'`,
        );
    }
  }

  throw new Error(`Expecting value of type 'string', found: '${rawValue}'`);
}

export const iso7064 = {
  /**
   * Check requirements.
   * Returns result of modulo 97 applied to the String input rawValue.
   *
   * Requirements:
   * - rawValue must be not `Null`
   * - rawValue must be of type `String`
   * - rawValue must respect format `^[0-9A-Z]{1,}$`
   *
   * @param {*} rawValue
   */
  compute(rawValue) {
    const value = stringifyInput(rawValue);

    if (!value.match(FORMAT)) {
      throw new Error(
        `Invalid data format; expecting: '${FORMAT}', found: '${value}'`,
      );
    }

    return mod97(value);
  },

  /**
   * Does NOT check requirements.
   * Returns result of modulo 97 applied to the String input rawValue.
   *
   * Requirements:
   * - rawValue must be not `Null`
   * - rawValue must be of type `String`
   * - rawValue must respect format `^[0-9A-Z]{1,}$`
   *
   * @param {*} rawValue
   */
  computeWithoutCheck(rawValue) {
    return mod97(rawValue);
  },
};

export const lei = {
  /**
   * Check requirements.
   * Returns if the LEI check digits are valid.
   *
   * Requirements:
   * - rawValue must be not `Null`
   * - rawValue must be of type `String`
   * - rawValue must respect format `^[0-9A-Z]{20}$`
   *
   * @param {*} rawValue
   */
  isValid(rawValue) {
    const value = stringifyInput(rawValue);

    if (!value.match(FORMAT_ISVALID)) {
      throw new Error(
        `Exception value of format '${FORMAT_ISVALID}', found: '${value}'`,
      );
    }

    return iso7064.computeWithoutCheck(value) === 1;
  },

  /**
   * Check requirements.
   * Returns the LEI check digit appended to the value.
   *
   * Requirements:
   * - rawValue must be not `Null`
   * - rawValue must be of type `String`
   * - rawValue must respest format `^[0-9A-Z]{18}$`
   *
   * @param {*} rawValue
   */
  generate(rawValue) {
    const value = stringifyInput(rawValue);

    if (!value.match(FORMAT_GENERATE)) {
      throw new Error(
        `Exception value of format '${FORMAT_GENERATE}', found: '${value}'`,
      );
    }

    return (
      value + `0${98 - iso7064.computeWithoutCheck(`${value}00`)}`.slice(-2)
    );
  },
};

export const organisationsnummerIsValid = (nr) => {
  if (nr.length === 0) {
    return true;
  }
  let valid = false;
  const match = nr.match(/^(\d{1})(\d{5})-?(\d{4})$/);
  if (!match) {
    return false;
  }

  const group = match[1];
  const controldigits = match[3];
  if (typeof group === 'undefined' || typeof controldigits === 'undefined') {
    return false;
  }
  const alldigits = group + match[2] + controldigits;
  if (alldigits.substring(2, 3) < 2) {
    return false;
  }
  let nn = '';
  for (let n = 0; n < alldigits.length; n += 1) {
    nn += (((n + 1) % 2) + 1) * alldigits.substring(n, n + 1);
  }
  let checksum = 0;
  for (let n = 0; n < nn.length; n += 1) {
    checksum += nn.substring(n, n + 1) * 1;
  }
  valid = checksum % 10 === 0;

  return valid;
};

export const emailValidation = (email) =>
  email.match(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  );

export const personnummerValidation = (rawInput) => {
  let input = rawInput;
  if (!input) {
    return false;
  }

  if (input.indexOf('-') === -1) {
    if (input.length === 10) {
      input = `${input.slice(0, 6)}-${input.slice(6)}`;
    } else {
      input = `${input.slice(0, 8)}-${input.slice(8)}`;
    }
  }
  if (
    !input.match(
      /^(\d{2})(\d{2})(\d{2})-(\d{4})|(\d{4})(\d{2})(\d{2})-(\d{4})$/,
    )
  ) {
    return false;
  }

  // Clean input
  input = input.replace('-', '');
  if (input.length === 12) {
    input = input.substring(2);
  }

  // Declare variables
  const d = new Date(
    RegExp.$1 ? RegExp.$1 : RegExp.$5,
    (RegExp.$2 ? RegExp.$2 : RegExp.$6) - 1,
    RegExp.$3 ? RegExp.$3 : RegExp.$7,
  );

  let sum = 0;

  const numdigits = input.length;

  const parity = numdigits % 2;

  let i;

  let digit;

  // Check valid date
  if (
    Object.prototype.toString.call(d) !== '[object Date]'
    || Number.isNaN(d.getTime())
  ) return false;

  // Check luhn algorithm
  for (i = 0; i < numdigits; i += 1) {
    digit = parseInt(input.charAt(i), 10);
    if (i % 2 === parity) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

export const ageIsValid = (date) =>
  Interval.fromDateTimes(DateTime.fromISO(date), DateTime.local()).length(
    'years',
  ) > 10;
