import { unescape } from "html-escaper";

export default function unescapeText(text) {
  if (!text) {
    return "";
  }

  const unescapedText = unescape(text);
  unescapedText.replace("&#47;", "");
  return unescapedText;
}
