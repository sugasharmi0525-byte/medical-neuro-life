/**
 * On phones, `.table-base` rows are shown as cards and each cell is labelled with its column
 * name (see index.css). This copies the header text onto every body cell as `data-label`, for
 * every table on the page and any rendered later, so tables need no per-cell markup.
 */
function labelTable(table: HTMLTableElement) {
  const headers = Array.from(table.tHead?.rows[0]?.cells ?? []).map((th) => th.textContent?.trim() ?? "");
  if (!headers.length) return;
  for (const body of Array.from(table.tBodies)) {
    for (const row of Array.from(body.rows)) {
      let column = 0;
      for (const cell of Array.from(row.cells)) {
        const label = headers[column] ?? "";
        if (cell.colSpan === 1 && cell.getAttribute("data-label") !== label) cell.setAttribute("data-label", label);
        column += cell.colSpan;
      }
    }
  }
}

function labelAll() {
  document.querySelectorAll<HTMLTableElement>("table.table-base").forEach(labelTable);
}

export function startTableLabels(): () => void {
  labelAll();
  let queued = false;
  const observer = new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      labelAll();
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
  return () => observer.disconnect();
}

export { labelTable };
