window.addEventListener("load", () => {
  const input = document.getElementById("excludeClassListInput");
  const saveButton = document.getElementById("saveButton");

  const init = async () => {
    const excludeClassList = await load_setting();
    input.textContent = excludeClassList?.join("\n") ?? "";
  };
  init();

  // set save event
  saveButton.addEventListener("click", async () => {
    await save_setting(input.value.trim().split("\n"));
    alert("保存しました");
  });
});
