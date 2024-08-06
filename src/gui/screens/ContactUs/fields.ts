function trim(value: string): string {
  return value.trim();
}

function supertrim(value: string): string {
  return value.trim().replace(/\s\s+/g, ' ');
}

const name: Field = {
  format: (value) => supertrim(value).slice(0, 255),
  assert: (value) => value.length >= 2,
};

const phone: Field = {
  format: (value) =>
    supertrim(value)
      .replace(/\+ |\( | \)|- | -/g, (match) => match.trim())
      .slice(0, 255),
  assert: (value) => /^(\+\d{1,3})? ?(\(\d{1,3}\))? ?\d+([- ]\d+)*$/.test(value),
};

const emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const email: Field = {
  format: (value) => trim(value).slice(0, 255),
  assert: (value) => emailRegExp.test(value),
};

const message: Field = {
  format: (value) => trim(value).slice(0, 2000),
  assert: (value) => value.length >= 10,
};

export const fields = {
  firstname: { name: 'firstname', ...name },
  lastname: { name: 'lastname', ...name },
  phone: { name: 'phone', ...phone },
  email: { name: 'email', ...email },
  message: { name: 'message', ...message },
} as const;
