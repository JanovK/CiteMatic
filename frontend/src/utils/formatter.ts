export function formatCitationHTML({
  author,
  date,
  title,
  url,
}: {
  author: string;
  date: string;
  title: string;
  url: string;
}): string {
  return `
<p style="
  margin:0;
  padding-left:36pt;
  text-indent:-36pt;
  font-family:'Times New Roman', Times, serif;
  font-size:12pt;
  line-height:1.4;
">
  ${author}. (${date}). <i>${title}</i> [Video]. YouTube.
  <span style="word-break:break-all;">${url}</span>
</p>
`.trim();
}