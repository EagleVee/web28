const renderMenu = () => {
  let dropDown = ''
  for (let i = 1; i < 5; i++) {
    let dropMenu = ''
    for (let j = 1; j < 5; j++) {
      let secondaryDropMenu = ''
      for (let k = 1; k < 5; k++) {
        secondaryDropMenu +=
          `
          <span>
             Item ${i}.${j}.${k}
          </span>
          `
      }
      dropMenu +=
        `
        <span class="secondary-drop-down">
          Item ${i}.${j}
          <nav class="secondary-drop-menu">
            ${secondaryDropMenu}
          </nav>
        </span>
        `
    }
    dropDown +=
      `
      <span class="drop-down">
        Item ${i}
        <nav class="drop-menu">
          ${dropMenu}
        </nav>
      </span>
      `
  }
  const menu = `
  <nav class="menu">
    ${dropDown}
  </nav>
  `
  return menu
}