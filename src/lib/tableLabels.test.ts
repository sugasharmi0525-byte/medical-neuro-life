import { describe, expect, it } from "vitest";

import { labelTable } from "@/lib/tableLabels";

describe("labelTable", () => {
  it("copies each column header onto its body cells, honouring colspan", () => {
    document.body.innerHTML = `
      <table class="table-base">
        <thead><tr><th>Customer</th><th>Status</th><th></th></tr></thead>
        <tbody>
          <tr><td>Ann</td><td>New</td><td>View</td></tr>
          <tr><td colspan="2">Loading</td><td>x</td></tr>
        </tbody>
      </table>`;
    labelTable(document.querySelector("table")!);
    const cells = Array.from(document.querySelectorAll("tbody td"));
    expect(cells.map((c) => c.getAttribute("data-label"))).toEqual(["Customer", "Status", "", null, ""]);
  });
});
