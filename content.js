(async () => {
  "use strict";

  // スタイルに関するチェックリスト
  const styleCheckList = {
    block: {
      margin: "0px",
      position: "static",
      "max-width": "none",
      "max-height": "none",
    },
    element: {}, // 特になし
    modifier: {}, // 特になし
  };

  const excludeClassList = await load_setting();

  // BEMの命名パターン
  const blockClassPattern = /^(?<block>[a-zA-Z]+)$/;
  const elementClassPattern = /^(?<block>[a-zA-Z]+)__(?<element>[a-zA-Z]+)$/;
  const modifierClassPattern =
    /^(?<base>[a-zA-Z]+(__[a-zA-Z]+)?)--(?<modifier>[a-zA-Z]+)$/;

  // BEMのどの種類か判定するための処理
  const isBlockClassName = (className) => blockClassPattern.test(className);
  const isElementClassName = (className) => elementClassPattern.test(className);
  const isModifierClassName = (className) =>
    modifierClassPattern.test(className);

  let blockClassList = new Set();
  let elementClassList = new Set();
  let modifierClassList = new Set();

  let isOk = true;

  const messages = [];

  const styleCheck = (className, type) => {
    const testElement = document.createElement("div");
    testElement.setAttribute("class", className);
    testWrapper.appendChild(testElement);

    const computedStyle = getComputedStyle(testElement);

    Object.entries(styleCheckList[type]).forEach(([property, defaultValue]) => {
      const computedValue = computedStyle.getPropertyValue(property);
      if (computedValue !== defaultValue) {
        messages.push(
          `${type}要素のセレクタ (.${className}) に${property} (${computedValue}) が付いています！！`
        );
        isOk = false;
      }
    });
  };

  const hasParentBlockRecursive = (e, blockClassName) => {
    const parent = e.parentNode;

    if (parent.tagName === "HTML") {
      return false;
    }
    if (parent.classList.contains(blockClassName)) {
      return true;
    }
    return hasParentBlockRecursive(parent, blockClassName);
  };

  const checkParentBlock = (e, className) => {
    const matches = elementClassPattern.exec(className);

    // classの形式が合っていなければOKとする
    // 同じpatternを使っているので基本は有り得ないはず
    if (!matches) {
      return true;
    }

    const blockClassName = matches.groups.block;
    return hasParentBlockRecursive(e, blockClassName);
  };

  const checkMultiClass = (e, className) => {
    const matches = modifierClassPattern.exec(className);

    // classの形式が合っていなければOKとする
    // 同じpatternを使っているので基本は有り得ないはず
    if (!matches) {
      return true;
    }

    const baseClassName = matches.groups.base;
    return e.classList.contains(baseClassName);
  };

  document.querySelectorAll("*").forEach((e) => {
    Array.from(e.classList.values()).forEach((className) => {
      if (!isOk) {
        return;
      }

      // 除外対象のclassはスキップ
      if (excludeClassList.includes(className)) {
        return;
      }

      // Block要素
      if (isBlockClassName(className)) {
        blockClassList.add(className);
      }

      // Element要素
      else if (isElementClassName(className)) {
        elementClassList.add(className);

        // Block要素の子要素として存在しているかチェック
        const hasParentBlock = checkParentBlock(e, className);
        if (!hasParentBlock) {
          messages.push(
            `element要素 (${className}) の親にblock要素がありません！！`
          );
          isOk = false;
        }
      }

      // Modifier要素
      else if (isModifierClassName(className)) {
        modifierClassList.add(className);

        const isMultiClass = checkMultiClass(e, className);
        if (!isMultiClass) {
          messages.push(
            `modifier要素 (${className}) がマルチクラスになっていません！！`
          );
          isOk = false;
        }
      } else {
        // どれでもない場合
        messages.push(`class名 ${className} がBEMの命名に沿っていません！`);
      }
    });
  });

  const testWrapper = document.createElement("div");
  document.body.appendChild(testWrapper);

  // スタイルチェック
  blockClassList.forEach((className) => styleCheck(className, "block"));
  elementClassList.forEach((className) => styleCheck(className, "element"));
  modifierClassList.forEach((className) => styleCheck(className, "modifier"));

  // 後片付け
  testWrapper.remove();

  if (isOk) {
    messages.push("OK!");
  }
  alert(messages.join("\n"));
})();
