(() => {
  const isBlockClassName = (className) => /^[a-zA-Z]+$/.test(className);

  let blockClassList = new Set();

  Array.from(document.querySelectorAll("*")).forEach((e) => {
    Array.from(e.classList.values())
      .filter(isBlockClassName)
      .forEach((className) => {
        blockClassList.add(className);
      });
  });

  const testWrapper = document.createElement("div");
  document.body.appendChild(testWrapper);

  let isOk = true;
  console.log(blockClassList);

  blockClassList.forEach((blockClassName) => {
    const testElement = document.createElement("div");
    testElement.setAttribute("class", blockClassName);
    testWrapper.appendChild(testElement);

    // marginのチェック
    const margin = getComputedStyle(testElement).margin;
    if (margin !== "0px") {
      alert(
        `\n🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n\nBlock要素のセレクタ (.${blockClassName}) にmargin (${margin}) が付いています！！\n\n🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨`
      );
      isOk = false;
    }

    // TODO: positionのチェック

    // TODO: その他のチェック
  });

  testWrapper.remove();

  if (isOk) {
    alert("OK!");
  }
})();
