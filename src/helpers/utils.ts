import dayjs from 'dayjs';

/**
 * Capitalize a string
 * @param str 
 * @returns string
 */
export function capitalize(str: string) {
  return (typeof str !== 'string')
    ? str
    : str.charAt(0).toUpperCase() + str.slice(1);
}

export function capitalizeAndSpace(str: string) {

  if (!str || typeof (str) !== 'string') {
    console.log('can not capitalize', str)
    return str;
  }
  const words = capitalize(str)?.split('');
  const reg = /^[A-Z]+$/;

  for (let i = 1; i < words.length; i++) {
    if (reg.test(words[i])) {
      words[i] = ' ' + words[i];
    }
  }

  return words.join('');
}

/**
 * Check a variable if null or undefined
 * @param v 
 * @returns boolean
 */
export function isNullOrUndefined(v: any) {
  return v === undefined || v === null;
}

/**
 * Convert to string
 * @param value 
 * @returns 
 */



export const uniqueObjectArray = (arr: any[], uniqueField: string) => {
  return arr.filter((v, i, a) => a.findIndex(v2 => (v2[uniqueField] === v[uniqueField])) === i);
}

export const uniqueStrArray = (arr: string[],) => {
  return arr.filter((v, i, a) => a.findIndex(v2 => (v2 === v)) === i);
}

export const isSuccess = (obj: any) => {
  if (obj === true) return true;
  if (typeof obj === 'object' && obj?.success === true) {
    return true;
  }
  return false;
};

export const getError = (res: any) => (
  res?.error || res?.message || 'Unknown error.'
);

export const successRes = () => ({ success: true });
export const failureRes = () => ({ success: false });

export const apiRes = (obj: any, skipSuccssCheck: boolean = false) => {
  const res: any = {
    success: skipSuccssCheck || isSuccess(obj),
  };

  if (res.success !== true) {
    res.error = getError(obj);
  }
  return res;
};

export const degToRad = (angle: number) => angle / 180 * Math.PI;

export async function fetchGet({
  url,
  params,
  signal
}: {
  url: string,
  signal?: AbortSignal,
  params?: any
}): Promise<any> {
  try {
    const token = localStorage.getItem('authToken');
    const res = await fetch(`${url}${params ? '?' + new URLSearchParams(params).toString() : ''}`,
      {
        signal,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { token } : {}),
        },
      });
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('fetchGet Error:', error?.toString());
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}

export async function fetchPost(
  {
    url,
    json,
    signal,
    params,
  }: {
    url: string,
    json: Record<string, any>,
    signal?: AbortSignal,
    params?: any
  }
): Promise<any> {
  const token = localStorage.getItem('authToken');
  try {
    const res = await fetch(`${url}${params ? '?' + new URLSearchParams(params).toString() : ''}`,
      {
        signal,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { token } : {}),
        },
        body: JSON.stringify(json),
      });
    // check if status is 200 fetch will not
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error('fetchPost Error:', error?.toString());
    // return {
    //   success: false,
    //   message: error instanceof Error ? error.message : String(error),
    // };
    throw new Error(error instanceof Error ? error.message : String(error));
  }
}


export const formatDateStr = (dStr: string) => {
  return dayjs(dStr).format('YYYY-MM-DD');
}


export const copyToClipboard = async (str: string): Promise<void> => {
  if (typeof navigator?.clipboard?.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(str);
      console.log('Copied to clipboard using navigator.clipboard!');
    } catch (error) {
      console.error('Failed to copy using navigator.clipboard:', error);
      fallbackCopyToClipboard(str);
    }
  } else {
    fallbackCopyToClipboard(str);
  }
};

const fallbackCopyToClipboard = (str: string): void => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  try {
    const successful = document.execCommand('copy');
    if (successful) {
      console.log('Copied to clipboard using execCommand!');
    } else {
      console.error('Failed to copy using execCommand!');
    }
  } catch (error) {
    console.error('Error during execCommand copy:', error);
  }
  document.body.removeChild(el);
};


export const clickDownload = async (url: string, filename?: string) => {
  try {
    const response = await fetch(url);
    console.log(url)
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename || 'document';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  } catch (error) {
    console.error('Download failed:', error);
  }
}




