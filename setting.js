async function load_setting() {
  const loadedSetting = await chrome.storage.local.get("excludeClass");
  return loadedSetting?.excludeClass ?? [];
}

async function save_setting(excludeClass) {
  return await chrome.storage.local.set({
    excludeClass,
  });
}
