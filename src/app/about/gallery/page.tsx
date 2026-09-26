import { GalleryWall, type Photo } from "@/components/motion";
import { Btn, Chip, Eyebrow, PageHero, SectionHeading } from "@/components/ui";
import { getGallery } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Our Gallery — Life at the Centre",
  description:
    "Photographic archive of the Centre for Gender, Conflict and Development Studies: 16 Days of Activism, international conferences, Girl Child and Women's Day commemorations, community service and campus life.",
};

export default async function GalleryPage() {
  const rows = await getGallery();
  const photos: Photo[] = rows.map((r) => ({
    id: r.id,
    album: r.album,
    title: r.title,
    url: r.url,
    credit: r.credit,
  }));

  const albums = Array.from(new Set(photos.map((p) => p.album)));

  return (
    <>
      <PageHero
        eyebrow="Our Gallery"
        title="Life at the Centre, in pictures"
        lead="Advocacy, conferences, commemorations, fieldwork and campus life — the Centre's photographic archive. Select any frame to open it full size, then use the arrow keys to move through the album."
        trail={[
          { label: "Home", href: "/" },
          { label: "About Us", href: "/about" },
          { label: "Our Gallery" },
        ]}
        image="https://images.pexels.com/photos/15325468/pexels-photo-15325468.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1500"
      >
        <div className="rounded-3xl border border-white/14 bg-white/7 p-6 backdrop-blur-xl">
          <span className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-uniport-bright">
            Archive
          </span>
          <p className="mt-2 font-display text-[2.4rem] leading-none font-semibold">
            {photos.length}
          </p>
          <p className="mt-1.5 text-[0.8rem] text-[#a9cde2]">
            frames across {albums.length} albums
          </p>
        </div>
      </PageHero>

      <section className="relative overflow-hidden bg-paper py-16 md:py-24">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Browse the archive"
              title="Filter by album"
              lead="16 Days of Activism, the International Conference series, Girl Child and Women's Day commemorations, campus life and community service fieldwork."
            />
            <div className="flex flex-wrap gap-2">
              {albums.map((a) => (
                <Chip key={a}>{a}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <GalleryWall photos={photos} />
          </div>

          <div className="mt-12 grid gap-6 rounded-3xl border border-slate-200 bg-mist p-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:p-10">
            <div>
              <Eyebrow>Contributing to the archive</Eyebrow>
              <p className="mt-4 max-w-2xl text-[0.95rem] leading-[1.85] text-slate-600">
                The Centre documents every lecture, conference, commemoration and field visit.
                If you attended a CGCDS event and hold photographs you would like added to the
                archive, write to{" "}
                <a href="mailto:info@cgcds.com.ng" className="ulink font-semibold text-uniport-deep">
                  info@cgcds.com.ng
                </a>{" "}
                with the event name and date.
              </p>
              <p className="mt-4 text-[0.76rem] text-slate-400">
                Illustrative photography on this page is credited to its Pexels contributors
                alongside each frame.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Btn href="/news" variant="outline" arrow={false}>
                News archive
              </Btn>
              <Btn href="/contact" size="md">
                Contact the Centre
              </Btn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
