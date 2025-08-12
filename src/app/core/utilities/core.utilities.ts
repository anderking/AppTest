import { CurrentUserModel } from "@models/auth/current-user.model";
import { decrypted } from "@root/core/utilities/crypto-utils";

export function getCurrentUserDecrypt(): CurrentUserModel {
  try {
    const getCookieEncrypt = localStorage.getItem("currentUser");
    const currentUserDecript = decrypted(getCookieEncrypt);
    if (currentUserDecript) {
      return JSON.parse(currentUserDecript);
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export function orderBy(items: any[], field: string): any[] {
  function compare(attr: string, obj1: any, obj2: any) {
    return obj1[attr].localeCompare(obj2[attr]);
  }

  function generaComparador(attr: string) {
    return (a: any, b: any) => compare(attr, a, b);
  }

  return items.sort(generaComparador(field));
}

export function groupBy(inputArray: any[], key: any, removeKey = false): any[] {
  let levelOne: any = [];
  try {
    const outputType = {};
    inputArray.reduce(
      (previous, current) => {
        const { [key]: keyValue } = current;

        if (removeKey && keyValue) {
          delete current[key];
        }

        const { [keyValue]: reducedValue = [] } = previous;

        return Object.assign(previous, {
          [keyValue]: reducedValue.concat(current),
        });
      },

      outputType
    );

    for (const id in outputType) {
      if (outputType.hasOwnProperty(id)) {
        const element = outputType[id];
        levelOne.push({
          id: getUniqueId(5),
          name: id,
          values: element,
        });
      }
    }
  } catch {
    levelOne = [];
  }

  return levelOne;
}

export function groupByMult(items: any[], groups: any[]): any[] {
  const outputType = {};
  let levelOne: any = [];
  try {
    items.forEach((a) => {
      groups
        .reduce((o, g, i) => {
          o[a[g]] = o[a[g]] || (i + 1 === groups.length ? [] : {});
          return o[a[g]];
        }, outputType)
        .push(a);
    });

    for (const key in outputType) {
      if (outputType.hasOwnProperty(key)) {
        const element = outputType[key];
        levelOne.push({
          id: getUniqueId(5),
          name: key,
          values: element,
        });
      }
    }

    levelOne.forEach((item) => {
      const levelTwo: any = [];
      for (const key in item.values) {
        if (item.values.hasOwnProperty(key)) {
          const element = item.values[key];
          levelTwo.push({
            id: getUniqueId(5),
            name: key,
            values: element,
          });
        }
      }
      item.values = orderBy(levelTwo, "name");
    });
  } catch (error) {
    console.error(error);
  }
  levelOne = orderBy(levelOne, "name");
  return levelOne;
}

export function clearLocalStorage(): void {
  localStorage.clear();
}

/**
 * generate groups of 4 random characters
 * @example getUniqueId(1) : 607f
 * @example getUniqueId(2) : 95ca-361a-f8a1-1e73
 */
export function getUniqueId(parts: number): string {
  const stringArr = [];
  for (let i = 0; i < parts; i++) {
    // tslint:disable-next-line:no-bitwise
    const S4 = (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    stringArr.push(S4);
  }
  return stringArr.join("-");
}

export function buildCreateDate(): {
  createDate: string;
  createDateFB: object;
} {
  const currentDate = new Date();
  const currentDateLocal = new Date(
    currentDate.getTime() - currentDate.getTimezoneOffset() * 60000
  );
  const currentDateLocalISO = currentDateLocal.toISOString();
  const createDate = currentDateLocalISO.split("T")[0];
  const hoursISO = currentDateLocalISO.split("T")[1];
  const hours = hoursISO.split(".")[0];
  const newDate = createDate + "T" + hours;
  const date = new Date(newDate);
  return { createDate: newDate, createDateFB: date };
}
