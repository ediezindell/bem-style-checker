(() => {
  const checkList = {
    margin: "0px",
    position: "static",
  };

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

    const computedStyle = getComputedStyle(testElement);
    Object.entries(checkList).forEach(([property, defaultValue]) => {
      const computedValue = computedStyle.getPropertyValue(property);
      if (computedValue !== defaultValue) {
        alert(
          `\n🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨\n\nBlock要素のセレクタ (.${blockClassName}) に${property} (${computedValue}) が付いています！！\n\n🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨`
        );
        isOk = false;
      }
    });

    // TODO: その他のチェック
  });

  testWrapper.remove();

  if (isOk) {
    alert("OK!");
  }
})();
