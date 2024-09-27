/**
 * Very very very simple function.
 * Takes either name (Name Surname) or email (name.surname@example.com)
 * @param data 
 */
export default function(data: string) {
  if (data.includes('@') && data.includes('.')) {
    const [ name, domain ] = data.split('@');

    return name[0] + new Array(name.length - 2).join('*') + name[name.length - 1] + '@' + domain[0] + new Array(domain.length - 2).join('*') + domain[domain.length - 1];
  } else if (data.includes(' ')) {
    const parts = data.split(' ');

    return parts.map(part => part[0] + new Array(part.length - 2).join('*') + part[part.length - 1]).join(' ');
  }

  return data[0] + new Array(data.length - 2).join('*') + data[data.length - 1];
}
