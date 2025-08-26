export async function getCities(locale: string) {
  const res = await fetch(
    `https://jaunpaul.github.io/Rozvazej.Registration/i18n/cities/${locale}.json`
  );
  if (res.ok) return res.json();
  return fetch(
    "https://jaunpaul.github.io/Rozvazej.Registration/i18n/cities/cs.json"
  ).then((r) => r.json());
}
