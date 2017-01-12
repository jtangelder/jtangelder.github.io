function parseValue(value) {
  try {
    return JSON.parse(value);
  } catch(err) {
    return value;
  }
}

export function parseXMLString(xmlString) {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, "text/xml");
}

function nodeChildrenToJSON(node) {
  return Array.from(node.children).reduce((acc, childNode) =>
    Object.assign(acc, { [childNode.nodeName]: nodeToJSON(childNode) })
  , {});
}

function nodeAttributesToJSON(node) {
  return Array.from(node.attributes).reduce((acc, attribute) =>
    Object.assign(acc, { [attribute.name]: parseValue(attribute.value) })
  , {});
}

export function nodeToJSON(node) {
  if (node.children.length) {
    return nodeChildrenToJSON(node);
  }
  if (node.hasAttributes()) {
    return Object.assign(
      { value: node.textContent },
      nodeAttributesToJSON(node)
    );
  }
  return parseValue(node.textContent)
}