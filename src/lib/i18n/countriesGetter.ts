export async function getCountries(locale: string) {
  const res = await fetch(`/i18n/countries/${locale}.json`);
  if (res.ok) return res.json();
  return fetch("/i18n/countries/cs.json").then((r) => r.json());
}
