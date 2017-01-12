import { reduce } from './utils';

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
  return reduce((acc, childNode) =>
    Object.assign(acc, { [childNode.nodeName]: nodeToJSON(childNode) })
  , {}, node.children);
}

function nodeAttributesToJSON(node) {
  return reduce((acc, attribute) =>
    Object.assign(acc, { [attribute.name]: parseValue(attribute.value) })
  , {}, node.attributes)
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