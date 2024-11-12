import type { MetaFunction } from '@remix-run/cloudflare';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { JOB_EXPERIENCE, SKILLS } from '@/constants/indes';
import ExperienceCard from '@/components/experience/ExperienceCard';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { type MutableRefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/navbar/navbar';
import { useNavigate } from '@remix-run/react';
import ContactForm from '@/components/forms/ContactForm';
import { Separator } from '@/components/ui/separator';
import { Github, Linkedin } from 'lucide-react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Sviatoslav Chyzh | Full Stack Software Engineer' },
    {
      name: 'description',
      content:
        'Portfolio of Sviatoslav Chyzh, a full stack software engineer specializing in TypeScript and React. Explore my projects and experience.',
    },
  ];
};

export default function Index() {
  const [elementInView, setElementInView] = useState<string | null>(null);
  const navigate = useNavigate();

  const sections: Record<string, MutableRefObject<null>> = {
    intro: useRef(null),
    experience: useRef(null),
    contact: useRef(null),
  } as const;

  useEffect(() => {
    const observers = Object.keys(sections).map((key: string) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setElementInView(key);
            }
          });
        },
        { threshold: 0.3 },
      );

      if (sections[key]?.current) {
        observer.observe(sections[key].current as Element);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [sections]);

  useEffect(() => {
    if (elementInView) {
      navigate('/', { preventScrollReset: true, state: { hash: `#${elementInView}` } });
      window.history.replaceState(null, '', `/#${elementInView}`);
    }
  }, [elementInView, navigate]);

  return (
    <>
      <Navbar />
      <header className="header" id="intro" ref={sections.intro}>
        <div className="responsive-card">
          <Card className="bg-transparent">
            <CardHeader className="text-nowrap text-3xl">
              <CardTitle className="flex items-center gap-6">
                <Avatar className="h-20 w-20">
                  <AvatarImage src="/avatar.png" alt="SC" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <span className="font-mono font-thin text-accent">I am,</span> Sviatoslav Chyzh
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center text-xl text-muted-foreground">
              a software engineer with a passion for building web applications, based in Germany. I
              have experience working with React, TypeScript, and Tailwind CSS. I am always looking
              to learn new technologies and improve my skills
            </CardContent>
          </Card>
          <Card className="bg-transparent">
            <CardHeader className="text-3xl">
              <CardTitle className="flex items-center gap-6">Skills</CardTitle>
            </CardHeader>
            <CardContent>
              {SKILLS.map((skill) => (
                <Badge
                  key={skill}
                  className="m-1 p-3 text-muted-foreground transition-all hover:scale-110 hover:cursor-pointer"
                  variant="secondary"
                >
                  {skill}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </div>
        <img className="header-image" src="/city-at-night.jpg" alt="header-image" />
      </header>
      <main className="min-h-screen">
        <div className="scroll-watcher"></div>
        <section className="section" id="experience" ref={sections.experience}>
          <div className="grid w-[65vw] justify-items-center gap-4">
            <h2 className="text-3xl">Experience</h2>
            <div className="flex w-1/2 flex-col gap-4">
              {JOB_EXPERIENCE.map((job) => (
                <ExperienceCard key={job.id} job={job} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="section bg-accent" id="contact" ref={sections.contact}>
        <div className="responsive-card">
          <Card className="bg-transparent text-white">
            <CardHeader className="text-nowrap text-3xl">
              <CardTitle className="flex items-center gap-6">Get in touch</CardTitle>
              <CardDescription>
                I am available on social media and email. Feel free to reach out to me
                <Separator />
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex w-full justify-center gap-4">
                <a
                  href="https://www.linkedin.com/in/sviatoslav-chyzh-852113176/"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border-2 border-primary p-2 hover:border-accent-foreground hover:bg-accent"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/SviatoslavChyzh"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border-2 border-primary p-2 hover:border-accent-foreground hover:bg-accent"
                >
                  <Github />
                </a>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-transparent text-white">
            <CardHeader className="text-nowrap text-3xl">
              <CardTitle className="flex items-center gap-6">Contact me</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </footer>
    </>
  );
}
