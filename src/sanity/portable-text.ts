import type { PortableTextBlock } from "@portabletext/react";
import type { BodyNode } from "@/content/cms-fallback";

let counter = 0;
const key = () => `k${(counter++).toString(36)}`;

function block(
  text: string,
  style: string,
  list?: { listItem: "bullet"; level: number },
): PortableTextBlock {
  return {
    _type: "block",
    _key: key(),
    style,
    markDefs: [],
    children: [{ _type: "span", _key: key(), text, marks: [] }],
    ...list,
  };
}

/** Converts the simple sample-content format into Sanity's Portable Text. */
export function toPortableText(nodes: BodyNode[]): PortableTextBlock[] {
  return nodes.flatMap((node) => {
    if (node.type === "ul") {
      return node.items.map((item) =>
        block(item, "normal", { listItem: "bullet", level: 1 }),
      );
    }
    return [block(node.text, node.type === "h2" ? "h2" : "normal")];
  });
}
