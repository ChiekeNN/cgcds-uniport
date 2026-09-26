import { getArticles, getEvents, getGallery, getJournals, getStaff } from "@/lib/data";

async function main() {
  const [articles, staff, journals, gallery, events] = await Promise.all([
    getArticles(),
    getStaff(),
    getJournals(),
    getGallery(),
    getEvents(),
  ]);
  console.log("articles:", articles.length);
  console.log("staff:", staff.length);
  console.log("journals:", journals.length);
  console.log("gallery:", gallery.length);
  console.log("events:", events.length);
  console.log("sample publishedAt type:", typeof articles[0]?.publishedAt, articles[0]?.publishedAt instanceof Date ? "(Date ✓)" : "(NOT a Date ✗)");
}

main().catch((e) => {
  console.error("BOOTSTRAP FAILED:", e);
  process.exit(1);
});
