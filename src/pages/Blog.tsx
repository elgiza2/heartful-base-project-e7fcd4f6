import { ExternalLink } from "lucide-react";
import PageLayout, { PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const POSTS = [
  {
    date: "July 2026",
    tag: "Announcement",
    title: "Why we built one workspace instead of ten tools",
    excerpt:
      "Subscription fatigue is not a pricing problem, it is a workflow problem. Ten logins mean ten contexts, ten bills and ten places for work to get lost. Here is the reasoning behind consolidating chat, research, imaging, video and code into a single screen.",
  },
  {
    date: "July 2026",
    tag: "Launch",
    title: "Megsy AI is live",
    excerpt:
      "Our unified digital workspace launched publicly and reached roughly a hundred users in the first day. A short note on what shipped, what we cut before launch, and what the first week of feedback changed.",
    href: "https://www.openpr.com/news/4579272/megsy-ai-launches-unified-digital-workspace-to-cure",
  },
  {
    date: "2026",
    tag: "Engineering",
    title: "Fast on an average phone: our performance bar",
    excerpt:
      "Optimised storage routing, edge functions and a small client bundle. The target is not a benchmark score — it is a mid-range Android device on a mobile connection in Cairo.",
  },
  {
    date: "2026",
    tag: "Research",
    title: "Arabic dialect is still an open problem",
    excerpt:
      "Egyptian Arabic carries nuance that most global models flatten. What we test for, where current models fail, and why an Arabic-first tokenizer matters more than another benchmark point.",
  },
  {
    date: "2026",
    tag: "Company",
    title: "One CEO, one line of accountability",
    excerpt:
      "How a very small team makes decisions: short roadmaps, direct ownership, and support handled by the engineers who wrote the code.",
  },
];

export default function BlogPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Blog"
        title="Announcements, engineering notes and company thinking."
        lead="Short, specific posts about what we are building and why. No growth-hacking filler."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-2">
          {POSTS.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.06}>
              <article className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]">
                <p className="text-xs uppercase tracking-[0.16em] text-primary">
                  {post.date} · {post.tag}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">{post.title}</h2>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                {post.href && (
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                  >
                    Read the release <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Want these in your inbox?"
        lead="We do not run a newsletter machine. Email us and we will add you to the short announcement list."
      >
        <a
          href={`mailto:${COMPANY.email}?subject=Add me to announcements`}
          className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          {COMPANY.email}
        </a>
      </Section>
    </PageLayout>
  );
}
